import { getMemberByUserId } from "@/actions/memberActions";
import { notFound } from "next/navigation";
import React from "react";
import MemberSidebar from "../MemberSidebar";
import { Card } from "@nextui-org/react";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userId: string };
}) {
  // no way to pass data to the layout or
  // to get the data from the layout so db calls will be duplicate
  const member = await getMemberByUserId(params.userId);
  if (!member) return notFound();

  const basePath = `/members/${member.userId}`;

  const navLinks = [
    { name: "Profile", href: `${basePath}` },
    { name: "Photos", href: `${basePath}/photos` },
    { name: "Chat", href: `${basePath}/chat` },
  ];

  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh]">
      <div className="col-span-3">
        <MemberSidebar member={member} navLinks={navLinks} />
      </div>
      <div className="col-span-9">
        <Card className="w-full mt-10 h-[80vh]">{children}</Card>
      </div>
    </div>
  );
}
