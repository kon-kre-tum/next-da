"use client";
import { deleteImage, setMainImage } from "@/actions/userActions";
import { Photo } from "@prisma/client";
import React, { useState } from "react";
import MemberImage from "./MemberImage";
import StartButton from "./StartButton";

import DeleteButton from "./DeleteButton";
import { useRouter } from "next/navigation";

type Props = {
  photos: Photo[] | null;
  editing?: boolean;
  mainImageUrl?: string | null;
};

export default function MemberPhotos({ photos, editing, mainImageUrl }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState({
    type: "",
    isLoading: false,
    id: "",
  });

  const onSetMainPhoto = async (photo: Photo) => {
    if (photo.url === mainImageUrl) return;
    setLoading({ isLoading: true, id: photo.id, type: "main" });
    await setMainImage(photo);
    router.refresh();
    setLoading({ isLoading: false, id: "", type: "" });
  };

  const onDeletePhoto = async (photo: Photo) => {
    if (photo.url === mainImageUrl) return;
    setLoading({ isLoading: true, id: photo.id, type: "delete" });
    await deleteImage(photo);
    router.refresh();
  };
  return (
    <div className="grid grid-cols-5 gap-3 p-5">
      {photos &&
        photos.map((photo) => (
          <div key={photo.id} className="relative">
            <MemberImage photo={photo} />
            {editing && (
              <>
                <div
                  onClick={() => onSetMainPhoto(photo)}
                  className="absolute top-3 left-3 z-50"
                >
                  <StartButton
                    selected={photo.url === mainImageUrl}
                    loading={
                      loading.isLoading &&
                      loading.type === "main" &&
                      loading.id === photo.id
                    }
                  />
                </div>
                <div
                  onClick={() => onDeletePhoto(photo)}
                  className="absolute top-3 right-3 z-50"
                >
                  <DeleteButton
                    loading={
                      loading.isLoading &&
                      loading.type === "delete" &&
                      loading.id === photo.id
                    }
                  />
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
}
