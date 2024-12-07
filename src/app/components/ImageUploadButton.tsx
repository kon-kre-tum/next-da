"use client";
import { CldUploadButton } from "next-cloudinary";
import React from "react";
import { HiPhoto } from "react-icons/hi2";

export default function ImageUploadButton() {
  return (
    <CldUploadButton
      options={{ maxFiles: 1 }}
      onSuccess={(res) => console.log(res)}
      signatureEndpoint="/api/sign-image"
      uploadPreset="next-match-demo"
      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/70"
    >
      <HiPhoto size={28} /> Upload new image
    </CldUploadButton>
  );
}
