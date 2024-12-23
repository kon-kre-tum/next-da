import CardInnerWrapper from "@/app/components/CardInnerWrapper";
import React from "react";
import ChatForm from "./ChatForm";
import { getMessagesThread } from "@/actions/messageActions";
import { getAuthUserId } from "@/actions/likeActions";
import MessageList from "./MessageList";
import { createChatId } from "@/app/lib/utils";

export default async function ChatPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = await params;
  const messages = await getMessagesThread(userId);
  const currentUserId = await getAuthUserId();
  const chatId = createChatId(currentUserId, userId);
  return (
    <CardInnerWrapper
      header="Chat"
      body={
        <MessageList initialMessages={messages} currentUserId={currentUserId} chatId = {chatId}/>
      }
      footer={<ChatForm />}
    />
  );
}
