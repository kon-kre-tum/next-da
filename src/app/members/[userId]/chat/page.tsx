import CardInnerWrapper from "@/app/components/CardInnerWrapper";
import React from "react";
import ChatForm from "./ChatForm";
import { getMessagesThread } from "@/actions/messageActions";
import MessageBox from "./MessageBox";
import { getAuthUserId } from "@/actions/likeActions";

export default async function ChatPage({
  params,
}: {
  params: { userId: string };
}) {
  //const { userId } = await params; 
  const messages = await getMessagesThread(params.userId);
  const currentUserId = await getAuthUserId();

  const body = (
    <div>
      {Array.isArray(messages) && messages.length === 0 ? (
        "No messages to display"
      ) : (
        <div>
          {messages.map((message) => (
            <MessageBox
              message={message}
              currentUserId={currentUserId}
              key={message.id}
            />
          ))}
        </div>
      )}
    </div>
  );

  return <CardInnerWrapper header="Chat" body={body} footer={<ChatForm />} />;
}
