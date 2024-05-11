"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <NextUIProvider className="dark text-foreground bg-background">
        {children}
      </NextUIProvider>
    </ClerkProvider>
  );
}
