"use server";

import { prisma } from "@/app/lib/prisma";
import { MessageSchema, messageSchema } from "@/app/lib/schemas/messageSchema";
import { getAuthUserId } from "./likeActions";
import { ActionResult, MessageDto } from "@/types";
import { mapMessageToMessageDto } from "@/app/lib/mappings";
import { pusherServer } from "@/app/lib/pusher";
import { createChatId } from "@/app/lib/utils";

export async function createMessage(
  recipientId: string,
  data: MessageSchema
): Promise<ActionResult<MessageDto>> {
  try {
    const userId = await getAuthUserId();

    const validated = messageSchema.safeParse(data);

    if (!validated.success && validated.error)
      return { status: "error", error: validated.error.errors };

    const { text } = validated.data;

    const message = await prisma.message.create({
      data: {
        text,
        recipientId: recipientId,
        senderId: userId,
        recipientDeleted: false,
        senderDeleted: false,
      },
      select: messageSelect,
    });

    const messageDto = mapMessageToMessageDto(message);

    // send pusher event
    await pusherServer.trigger(
      createChatId(userId, recipientId),
      "message:new",
      messageDto
    );

    return { status: "success", data: messageDto };
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      error: "An error occurred while creating the message.",
    };
  }
}

export async function getMessagesThread(recipientId: string) {
  try {
    const userId = await getAuthUserId();
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: userId,
            recipientId: recipientId,
            senderDeleted: false,
          },
          {
            senderId: recipientId,
            recipientId: userId,
            recipientDeleted: false,
          },
        ],
      },
      orderBy: {
        created: "asc",
      },
      select: messageSelect,
    });

    if (messages.length > 0) {
      const readMessageIds = messages
        .filter(
          (m) =>
            m.dateRead === null &&
            m.recipient?.userId === userId &&
            m.sender?.userId === recipientId
        )
        .map((m) => m.id);

      await prisma.message.updateMany({
        where: {
          id: { in: readMessageIds },
        },
        data: {
          dateRead: new Date(),
        },
      });

      await pusherServer.trigger(createChatId(recipientId, userId), "messages:read", readMessageIds);
    }

    return messages.map((message) => mapMessageToMessageDto(message));
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      error: "An error occurred while fetching the messages.",
    };
  }
}

export async function getMessagesByContainer(container: string) {
  try {
    const userId = await getAuthUserId();

    const conditions = {
      [container === "outbox" ? "senderId" : "recipientId"]: userId,
      ...(container === "outbox"
        ? { senderDeleted: false }
        : { recipientDeleted: false }),
    };

    const messages = await prisma.message.findMany({
      where: conditions,
      orderBy: {
        created: "desc",
      },
      select: messageSelect,
    });

    return messages.map((message) => mapMessageToMessageDto(message));
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      error: "An error occurred while fetching the messages.",
    };
  }
}

export async function deleteMessage(messageId: string, isOutbox: boolean) {
  const selector = isOutbox ? "senderDeleted" : "recipientDeleted";

  try {
    const userId = await getAuthUserId();

    await prisma.message.update({
      where: { id: messageId },
      data: {
        [selector]: true,
      },
    });

    const messagesToDelete = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId, senderDeleted: true, recipientDeleted: true },
          { recipientId: userId, senderDeleted: true, recipientDeleted: true },
        ],
      },
    });

    if (messagesToDelete.length > 0) {
      await prisma.message.deleteMany({
        where: {
          OR: messagesToDelete.map((m) => ({ id: m.id })),
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const messageSelect = {
  id: true,
  text: true,
  created: true,
  dateRead: true,
  sender: {
    select: {
      userId: true,
      name: true,
      image: true,
    },
  },
  recipient: {
    select: {
      userId: true,
      name: true,
      image: true,
    },
  },
};
