import { NextUIProvider } from "@nextui-org/react";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // 2. Wrap NextUIProvider at the root of your app
  return <NextUIProvider>{children}</NextUIProvider>;
}