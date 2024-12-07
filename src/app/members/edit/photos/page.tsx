import { getAuthUserId } from "@/actions/likeActions";
import { getMemberPhotosByUserId } from "@/actions/memberActions";
import DeleteButton from "@/app/components/DeleteButton";
import ImageUploadButton from "@/app/components/ImageUploadButton";
import StartButton from "@/app/components/StartButton";
import { getDefaultImageSrc } from "@/app/lib/utils";
import { CardHeader, Divider, CardBody, Image } from "@nextui-org/react";
import React from "react";

export default async function PhotosPage() {
  const userId = await getAuthUserId();

  const photos = await getMemberPhotosByUserId(userId);

  return (
    <>
      <CardHeader className="text-2xl font-semibold text-primary">
        Edit Profile
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="pt-5 pl-5">
          <ImageUploadButton />
        </div>
        <div className="grid grid-cols-5 gap-3 p-5">
          {photos &&
            photos.map((photo) => (
              <div key={photo.id} className="relative">
                <Image
                  width={220}
                  height={220}
                  src={photo.url}
                  alt={getDefaultImageSrc()}
                  className="w-full h-full"
                />
                <div className="absolute top-3 left-3 z-50">
                  <StartButton selected={false} loading={false} />
                </div>
                <div className="absolute top-3 right-3 z-50">
                  <DeleteButton loading={false} />
                </div>
              </div>
            ))}
        </div>
      </CardBody>
    </>
  );
}
