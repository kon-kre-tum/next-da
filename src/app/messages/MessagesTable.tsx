"use client";
import { MessageDto } from "@/types";
import {
  Avatar,
  Card,
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Key, useCallback } from "react";
import { getDefaultImageSrc } from "../lib/utils";

type Props = {
  messages: MessageDto[];
};
export default function MessagesTable({ messages }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isOutbox = searchParams.get("container") === "outbox";

  const columns = [
    {
      key: isOutbox ? "recipientName" : "senderName",
      label: isOutbox ? "Recipient" : "Sender",
    },
    {
      key: "text",
      label: "Message",
    },
    {
      key: "created",
      label: isOutbox ? "Date sent" : "Date received",
    },
    {
      key: "actions",
      label: "Actions",
    },
  ];

  const handleRowSelection = (key: Key) => {
    const message = messages.find((m) => m.id === key);
    const url = isOutbox
      ? `/members/${message?.recipientId}/chat`
      : `/members/${message?.senderId}/chat`;
    router.push(url);
  };

  const renderCell = useCallback(
    (item: MessageDto, columnKey: keyof MessageDto) => {
      const cellValue = item[columnKey];

      switch (columnKey) {
        case "recipientName":
        case "senderName":
          return (
            <div className={`flex items-center gap-2 cursor-pointer ${item.dateRead && !isOutbox ? "" : "font-semibold"}`}>
              <Avatar
                alt="Member Image"
                src={
                  (isOutbox ? item.recipientImage : item.senderImage) ||
                  getDefaultImageSrc()
                }
              />
              <span>{cellValue}</span>
            </div>
          );
          break;

        default:
          break;
      }
    },
    []
  );

  return (
    <Card className="flex flex-col gap-3 h-[80vh] overflow-auto">
      <Table
        aria-label="Messages table"
        selectionMode="single"
        onRowAction={(key) => handleRowSelection(key as Key)}
        shadow="none"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={messages}
          emptyContent="No messages for this container"
        >
          {(item) => (
            <TableRow key={item.id} className="cursor-pointer">
              {(columnKey) => (
                <TableCell>
                  <div
                    className={`${
                      !item.dateRead && !isOutbox ? "font-semibold" : ""
                    }`}
                  >
                    {getKeyValue(item, columnKey)}
                  </div>
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
