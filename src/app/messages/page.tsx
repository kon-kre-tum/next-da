
import React from "react";
import MessageSideBar from "./MessageSideBar";
import { getMessagesByContainer } from "@/actions/messageActions";
import MessagesTable from "./MessagesTable";

export default async function page({
  searchParams,
}: {
  searchParams: { container: string };
}) {
  const {container} = await searchParams;

  const messages = await getMessagesByContainer(container);

  console.log(messages);

  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh] mt-10">
      <div className="col-span-2">
        <MessageSideBar />
      </div>
      <div className="col-span-10">
        <MessagesTable messages={messages} />
      </div>
    </div>
  );
}
