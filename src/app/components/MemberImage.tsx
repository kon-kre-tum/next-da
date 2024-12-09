"use client";
import { Photo } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import { Image } from "@nextui-org/react";
import React from "react";
import { getDefaultImageSrc } from "../lib/utils";

type Props = {
  photo: Photo | null;
};

export default function MemberImage({ photo }: Props) {
  return (
    <div>
      {photo?.publicId ? (
        <CldImage
          alt="Image of member"
          src={photo.publicId}
          width={300}
          height={300}
          crop="fill"
          gravity="faces"
          className="rounded-2xl"
        />
      ) : (
        <Image
          width={220}
          height={220}
          src={photo?.url || getDefaultImageSrc()}
          alt="Image of member"
          className="object-cover aspect-square"
        />
      )}
    </div>
  );
}
