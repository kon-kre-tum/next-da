import { getMemberByUserId } from "@/actions/memberActions";
import CardInnerWrapper from "@/app/components/CardInnerWrapper";
import { notFound } from "next/navigation";
import React from "react";

export default async function MemberDetailPage({
  params,
}: {
  params: { userId: string };
}) {
  // Ensure params is awaited before using its properties
  const { userId } = await params;
  const member = await getMemberByUserId(userId);

  if (!member) return notFound();

  return (
    <CardInnerWrapper
      header="Profile"
      body={<div> {member.description}</div>}
    />
  );
}
