"use client";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import React from "react";
import { HiPhoto } from "react-icons/hi2";

type Props = {
  onUploadImage: (result: CloudinaryUploadWidgetResults) => void;
};

export default function ImageUploadButton({ onUploadImage }: Props) {
  return (
    <CldUploadButton
      options={{ maxFiles: 1 }}
      onSuccess={onUploadImage}
      signatureEndpoint="/api/sign-image"
      uploadPreset="next-match-demo"
      className={`flex items-center gap-2 border-2 bordered-primary text-primary 
       px-4 py-2 rounded-lg hover:bg-primary/10`}
    >
      <HiPhoto size={28} /> Upload new image
    </CldUploadButton>
  );
}
