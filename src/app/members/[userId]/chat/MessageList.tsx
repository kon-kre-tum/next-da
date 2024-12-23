"use client";
import { MessageDto } from "@/types";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { pusherClient } from "@/app/lib/pusher";
import { formatShortDateTime } from "@/app/lib/utils";
import { Channel } from "pusher-js";

type Props = {
  initialMessages: MessageDto[];
  currentUserId: string;
  chatId: string;
};

export default function MessageList({
  initialMessages,
  currentUserId,
  chatId,
}: Props) {
  const [messages, setMessages] = useState<MessageDto[]>(initialMessages);
  const channelRef = useRef<Channel | null>(null);

  const handleNewMessage = useCallback((message: MessageDto) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  }, []);

  const handleReadMessages = useCallback((messageIds: string[]) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        messageIds.includes(message.id)
          ? { ...message, dateRead: formatShortDateTime(new Date()) }
          : message
      )
    );
  }, []);

  useEffect(() => {
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe(chatId);

      channelRef.current.bind("message:new", handleNewMessage);
      channelRef.current.bind("messages:read", handleReadMessages);
    }

    // unbind event listener to avoid maintaining subscriptions
    return () => {
      if (channelRef.current && channelRef.current.subscribed) {
        channelRef.current.unsubscribe();
        channelRef.current.unbind("message:new");
        channelRef.current.unbind("messages:read");
      }
    };
  }, [chatId, handleNewMessage, handleReadMessages]);

  return (
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
}
