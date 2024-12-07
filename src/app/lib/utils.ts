import { differenceInYears } from "date-fns";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { ZodIssue } from "zod";

export function caculateAge(birthDate: Date) {
  return differenceInYears(new Date(), birthDate);
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
