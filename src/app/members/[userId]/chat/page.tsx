import CardInnerWrapper from "@/app/components/CardInnerWrapper";
import React from "react";
import ChatForm from "./ChatForm";
import { getMessagesThread } from "@/actions/messageActions";

export default async function ChatPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = await params
  const messages = await getMessagesThread(userId);

  const body = (
    <div>
      {Array.isArray(messages) && messages.length === 0 ? (
        "No messages to display"
      ) : (
        <div>
          {messages.map((message) => (
            <p key={message.id}>{message.text}</p>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <CardInnerWrapper
      header="Chat"
      body={body}
      footer={<ChatForm />}
    />
  );
}
