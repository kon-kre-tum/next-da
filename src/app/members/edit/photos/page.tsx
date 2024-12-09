import { getAuthUserId } from "@/actions/likeActions";
import {
  getMemberByUserId,
  getMemberPhotosByUserId,
} from "@/actions/memberActions";

import { CardHeader, Divider, CardBody } from "@nextui-org/react";
import React from "react";
import MemberPhotoUpload from "./MemberPhotoUpload";
import MemberPhotos from "@/app/components/MemberPhotos";

export default async function PhotosPage() {
  const userId = await getAuthUserId();
  const member = await getMemberByUserId(userId);
  const photos = await getMemberPhotosByUserId(userId);

  return (
    <>
      <CardHeader className="flex flex-row justify-between items-center">
        <div className="text-2xl font-semibold text-primary">Edit Profile</div>
        <MemberPhotoUpload />
      </CardHeader>
      <Divider />
      <CardBody>
        <MemberPhotos
          photos={photos ?? null}
          editing={true}
          mainImageUrl={member?.image}
        />
      </CardBody>
    </>
  );
}
