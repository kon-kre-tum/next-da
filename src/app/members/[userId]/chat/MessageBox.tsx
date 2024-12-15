import { MessageDto } from "@/types";
import React from "react";
import clsx from "clsx";
import { Avatar } from "@nextui-org/react";
import { getDefaultImageSrc, transformImageUrl } from "@/app/lib/utils";

type Props = {
  message: MessageDto;
  currentUserId: string;
};
export default function MessageBox({ message, currentUserId }: Props) {
  const isCurrentUserSender = message.senderId === currentUserId;

  console.log(
    "isCurrentUserSender",
    isCurrentUserSender,
    message.senderId,
    currentUserId
  );

  const renderAvatar = () => (
    <Avatar
      name={message.senderName}
      className="self-end"
      src={transformImageUrl(message.senderImage) || getDefaultImageSrc()}
    />
  );

  // different btw curly brackets and parenthesis
  // const renderAvatar = () => {
  //   return <Avatar
  //     name={message.serderName}
  //     className="self-end"
  //     src={transformImageUrl(message.senderImage) || getDefaultImageSrc()}
  //   />
  // };

  return (
    <div className="grid grid-rows-1">
      <div
        className={clsx("flex gap-2 mb-3", {
          "justify-end text-right": isCurrentUserSender,
          "justify-start center": !isCurrentUserSender,
        })}
      >
        {!isCurrentUserSender && renderAvatar()}
        <div> Message content</div>
        {isCurrentUserSender && renderAvatar()}
      </div>
    </div>
  );
}
