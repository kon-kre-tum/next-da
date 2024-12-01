"use server";

import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";

export async function toggleLikeMember(targetUserId: string, isLiked: boolean) {
  try {
    const userId = await getAuthUserId();

    if (isLiked) {
      // delete the like
      await prisma.like.delete({
        where: {
          sourceUserId_targetUserId: {
            sourceUserId: userId,
            targetUserId: targetUserId,
          },
        },
      });
    } else {
      // save the like
      await prisma.like.create({
        data: {
          sourceUserId: userId,
          targetUserId: targetUserId,
        },
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchCurrentUserLikeIds() {
  try {
    const userId = await getAuthUserId();

    const likes = await prisma.like.findMany({
      where: {
        sourceUserId: userId,
      },
      select: {
        targetUserId: true,
      }
    });

    return likes.map((like) => like.targetUserId);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAuthUserId() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("Unauthorized");
  return userId;
}
