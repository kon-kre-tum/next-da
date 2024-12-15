import { MessageDetails } from "@/types";
import { formatShortDateTime } from "./utils";

export function mapMessageToMessageDto(message: MessageDetails) {
  return {
    id: message.id,
    text: message.text,
    created: formatShortDateTime(message.created),
    dateRead: message.dateRead? formatShortDateTime(message.dateRead): null,
    senderId: message.sender?.id,
    senderName: message.sender?.name,
    senderImage: message.sender?.image,
    recipientId: message.recipient?.id,
    recipientName: message.recipient?.name,
    recipientImage: message.recipient?.image,
  };
}