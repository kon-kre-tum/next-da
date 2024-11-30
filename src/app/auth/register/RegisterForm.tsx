"use client";
import { registerUser } from "@/actions/authAction";
import {
  RegisterSchema,
  registerSchema,
} from "@/app/lib/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardBody, Button, Input } from "@nextui-org/react";
import React from "react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting},
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });
  const onSubmit = async (data: RegisterSchema) => {
    console.log(data);
    const result = await registerUser(data);
    console.log(result);
    if (result.status === "success") {
      console.log("User registered successfully");
    } else {
      if (Array.isArray(result.error)) {
        result.error.forEach((error) => {
          const fieldName = error.path.join(".") as
            | "name"
            | "email"
            | "password";
          setError(fieldName, { message: error.message });
        });
      } else {
        setError("root.serverError", { message: result.error });
      }
    }
  };

  return (
    <Card className="w-2/5 mx-auto ">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-primary">
          <div className="flex flex-row items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">Register</h1>
          </div>
          <p className="text-neutral-500">
            Sign up to meet people around you...
          </p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              defaultValue=""
              label="Name"
              variant="bordered"
              {...register("name")}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
            />
            <Input
              defaultValue=""
              label="Email"
              variant="bordered"
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <Input
              defaultValue=""
              type="password"
              label="Password"
              variant="bordered"
              {...register("password")}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
            />

            {errors.root?.serverError && (
              <p className="text-danger text-sm">{errors.root.serverError.message}</p>
            )}

            <Button
              isLoading={isSubmitting}
              isDisabled={!isValid}
              fullWidth
              color="primary"
              type="submit"
            >
              Register
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
