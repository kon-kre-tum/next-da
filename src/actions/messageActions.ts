"use server";

import { prisma } from "@/app/lib/prisma";
import { MessageSchema, messageSchema } from "@/app/lib/schemas/messageSchema";
import { getAuthUserId } from "./likeActions";
import { Message } from "@prisma/client";
import { ActionResult } from "@/types";
import { mapMessageToMessageDto } from "@/app/lib/mappings";
import { console } from "inspector";

export async function createMessage(
  recipientId: string,
  data: MessageSchema
): Promise<ActionResult<Message>> {
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
    });
    return { status: "success", data: message };
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
          },
          {
            senderId: recipientId,
            recipientId: userId,
          },
        ],
      },
      orderBy: {
        created: "asc",
      },
      select: {
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
      },
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

export async function getMessagesByContainer(container: string) {
  try {
    const userId = await getAuthUserId();

    const selector = container === "outbox" ? "senderId" : "recipientId";

    const messages = await prisma.message.findMany({
      where: {
        [selector]: userId,
      },
      orderBy: {
        created: "desc",
      },
      select: {
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
      },
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
