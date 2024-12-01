"use client"; // Error boundaries must be Client Components

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { useEffect } from "react";
import { BiSolidError } from "react-icons/bi";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center vertical-center mt-4">
      <Card className="w-2/5 mx-auto">
        <CardHeader className="flex flex-row items-center justify-center">
          <div className="flex flex-col gap-2 items-center text-danger">
            <BiSolidError size={30}>
              <h1 className="text-3xl font-semibold">Error</h1>
            </BiSolidError>
          </div>
        </CardHeader>
        <CardBody>
          <div className="flex justify-center text-danger">{error.message}</div>
        </CardBody>
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => reset()}
            color="primary"
            variant="bordered"
          > Try again</Button>
        </CardFooter>
      </Card>
      
    </div>
  );
}
