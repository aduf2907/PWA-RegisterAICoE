import * as React from "react";
import { Home } from "@/pages/Home";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <Home />
      <Toaster position="top-center" richColors />
    </>
  );
}
