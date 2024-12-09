"use server";

import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";
import { Photo } from "@prisma/client";

export async function getMembers() {
  const session = await auth();

  if (!session?.user) return null;

  try {
    return prisma.member.findMany({
      where: {
        NOT: {
          userId: session.user.id,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getMemberByUserId(userId: string) {
  try {
    return prisma.member.findUnique({ where: { userId } });
  } catch (error) {
    console.log(error);
  }
}

export async function getMemberPhotosByUserId(userId: string) {
  try {
    const member = await prisma.member.findUnique({
      where: { userId },
      select: { photos: true },
    });

    if(!member) return null;

    return member.photos as Photo[];

  } catch (error) {
    console.log(error);
  }
}
