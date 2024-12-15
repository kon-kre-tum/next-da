// discrimated union type for API response

import { Prisma } from "@prisma/client";

// type can be one of two possible shapes success or error with different properties.
type ActionResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string | ZodIssue[] };

type MessageDetails = Prisma.MessageGetPayload<{
  select: {
    id: true,
    text: true,
    created: true,
    dateRead: true,
    sender: {
      select: { id; name; image };
    };
    recipient: {
      select: { id; name; image };
    };
  };
}>;

type MessageDto = {
  id: string;
  text: string;
  created: string;
  dateRead: string | null;
  senderId: string;
  senderImage?: string | null;
  recipientId: string;
  recipientName: string;
  recipientImage?: string | null;
};
