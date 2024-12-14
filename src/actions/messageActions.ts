"use server";

import { prisma } from "@/app/lib/prisma";
import { MessageSchema, messageSchema } from "@/app/lib/schemas/messageSchema";
import { getAuthUserId } from "./likeActions";
import { Message } from "@prisma/client";

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
    console.log(userId, recipientId, text);
    const message = await prisma.message.create({
      data: {
        text,
        recipientId: recipientId,
        senderId: userId,
        recipientDeleted: false,
        senderDeleted: false,
      }
    });

    console.log(message);

    return { status: 'success', data: message};
    
  } catch (error) {
    console.log(error);
    console.log("no error??");
    return {
      status: "error",
      error: "An error occurred while creating the message.",
    };
  }
}
