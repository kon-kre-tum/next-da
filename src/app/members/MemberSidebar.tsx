"use client"
import {
  Card,
  Image,
  CardFooter,
  CardBody,
  Divider,
  Button,
} from "@nextui-org/react";
import { Member } from "@prisma/client";
import React from "react";
import { caculateAge, getDefaultImageSrc } from "../lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  member: Member;
  navLinks: { name: string; href: string }[];
};

export default function MemberSidebar({ member, navLinks }: Props) {
  const pathName = usePathname();

  return (
    <Card className="w-full mt-10 items-center h-[80vh]">
      <Image
        height={200}
        width={200}
        src={member.image || getDefaultImageSrc()}
        alt="User profile image"
        className="rounded-full mt-6 aspect-square object-cover"
      />
      <CardBody>
        <div className="flex flex-col items-center">
          <div className="text-2xl">
            {member.name}, {caculateAge(member.dateOfBirth)}
          </div>
          <div className="text-sm text-neutral-500">
            {member.city}, {member.country}
          </div>
        </div>
        <Divider className="my-3" />
        <nav className="flex flex-col p-4 ml-4 text-2xl gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block rounded ${
                pathName === link.href
                  ? "text-primary"
                  : "hover:text-primary-50"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </CardBody>
      <CardFooter>
        <Button
          as={Link}
          href="/members"
          fullWidth
          color="default"
          variant="bordered"
        >
          Go back
        </Button>
      </CardFooter>
    </Card>
  );
}
