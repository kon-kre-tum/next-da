"use client";
import { Card, Image, CardFooter } from "@nextui-org/react";
import { Member } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { caculateAge } from "../lib/utils";
import LikeButton from "../components/LikeButton";

type Props = {
  member: Member;
  likedIds: string[];
};

export default function MemberCard({ member, likedIds }: Props) {
  const hasLiked = likedIds.includes(member.userId);

  const preventLinkAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Card fullWidth as={Link} href={`/members/${member.userId}`} isPressable>
      <Image
        isZoomed
        width={300}
        src={member.image || "/images/user.png"}
        alt={member.name}
        className="aspect-square object-cover"
      />
      <div onClick={preventLinkAction}>
        <div className="absolute top-3 right-3 z-50">
          <LikeButton targetId={member.userId} hasLiked={hasLiked} />
        </div>
      </div>
      <CardFooter className="flex justify-start bg-black overflow-hidden absolute bottom-0 z-10 bg-dark-gradient">
        <div className="flex flex-col text-white">
          <h4>
            {member.name} {caculateAge(member.dateOfBirth)}
          </h4>
          <p>{member.city}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
