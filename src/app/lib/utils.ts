import { differenceInYears, format } from "date-fns";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { ZodIssue } from "zod";

export function caculateAge(birthDate: Date) {
  return differenceInYears(new Date(), birthDate);
}

export function formatShortDateTime(date: Date) {
  return format(date, "dd MMM yy h:mm:a");
}

export function getDefaultImageSrc() {
  return "/images/user.png";
}

export function handleFormServerError<TFieldValues extends FieldValues>(
  errorResponse: { error: string | ZodIssue[] },
  setError: UseFormSetError<TFieldValues>
) {
  if (Array.isArray(errorResponse.error)) {
    errorResponse.error.forEach((error) => {
      const fieldName = error.path.join(".") as Path<TFieldValues>;
      setError(fieldName, { message: error.message });
    });
  } else {
    setError("root.serverError", { message: errorResponse.error });
  }
}

/**
 * Transforms a given Cloudinary image URL to include specific transformations.
 * If the URL does not belong to Cloudinary, it returns the original URL.
 * If the URL is null or undefined, it returns null.
 *
 * @param imageUrl - The original image URL.
 * @returns The transformed image URL with Cloudinary transformations applied, or the original URL if not a Cloudinary URL, or null if the input is null or undefined.
 */
export function transformImageUrl(imageUrl?: string | null) {
  if (!imageUrl) return null;

  if (!imageUrl.includes("cloudinary")) {
    return imageUrl;
  }
  const uploadIndex = imageUrl.indexOf("/upload/") + "/upload/".length;
  const transformation = "c_fill,w_300,h_300,g_faces/";
  console.log(
    `${imageUrl.slice(0, uploadIndex)}${transformation}${imageUrl.slice(
      uploadIndex
    )}`
  );

  return `${imageUrl.slice(0, uploadIndex)}${transformation}${imageUrl.slice(
    uploadIndex
  )}`;
}

export function truncateString(text?: string | null, length = 50) {
  if (!text) return null;

  return text.length > length ? `${text.slice(0, length)}...` : text;
}

export function createChatId(a: string, b: string) {
  return a > b ? `${a}-${b}` : `${b}-${a}`;
}