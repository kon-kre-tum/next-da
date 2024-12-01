import { Card, Image, CardFooter } from "@nextui-org/react";
import { Member } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { caculateAge } from "../lib/utils";

type Props = {
  member: Member;
};

export default function MemberCard({ member }: Props) {
  return (
    <Card fullWidth as={Link} href={`/members/${member.userId}`} isPressable>
      <Image
        isZoomed
        width={300}
        src={member.image || "/images/user/png"}
        alt={member.name}
        className="aspect-square object-cover"
      />
      <CardFooter className="flex justify-start bg-black overflow-hidden absolute bottom-0 z-10 bg-dark-gradient">
        <div className="flex flex-col text-white">
          <h4>{member.name} {caculateAge(member.dateOfBirth)}</h4>
          <p>{member.city}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
