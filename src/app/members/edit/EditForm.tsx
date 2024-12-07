"use client";
import { updateMemberProfile } from "@/actions/userActions";
import {
  MemberEditSchema,
  memberEditSchema,
} from "@/app/lib/schemas/memberEditSchema";
import { handleFormServerError } from "@/app/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Member } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Props = {
  member: Member;
};
export default function EditForm({ member }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { isValid, isDirty, isSubmitting, errors, isLoading },
  } = useForm<MemberEditSchema>({
    resolver: zodResolver(memberEditSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: MemberEditSchema) => {
    const result = await updateMemberProfile(data);

    if (result.status === "success") {
      toast.success("Member profile updated successfully");
      router.refresh();
      reset({ ...data });
    } else {
      // utils method to handle server errors
      handleFormServerError(result, setError);
    }
  };

  useEffect(() => {
    if (member) {
      reset({
        name: member.name,
        description: member.description,
        city: member.city,
        country: member.country,
      });
    }
  }, [member, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
      <Input
        label="Name"
        variant="bordered"
        {...register("name")}
        defaultValue={member.name}
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
      />
      <Textarea
        label="Description"
        variant="bordered"
        {...register("description")}
        defaultValue={member.description}
        isInvalid={!!errors.description}
        errorMessage={errors.description?.message}
      />
      <div className="flex flex-row gap-3">
        <Input
          label="City"
          variant="bordered"
          {...register("city")}
          defaultValue={member.city}
          isInvalid={!!errors.city}
          errorMessage={errors.city?.message}
        />
        <Input
          label="Country"
          variant="bordered"
          {...register("country")}
          defaultValue={member.country}
          isInvalid={!!errors.country}
          errorMessage={errors.country?.message}
        />
      </div>

      {errors.root?.serverError && (
        <p className="text-danger text-sm">{errors.root.serverError.message}</p>
      )}

      <Button
        type="submit"
        className="flex self-end"
        variant="solid"
        color="primary"
        isLoading={isLoading}
        disabled={!isValid || !isDirty || isSubmitting}
      >
        Update profile
      </Button>
    </form>
  );
}
