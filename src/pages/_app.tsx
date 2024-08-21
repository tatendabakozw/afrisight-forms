import { AuthProvider } from "@/context/AuthContext";
import { FormProvider } from "@/context/FormContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google"

const interFont = Inter({ subsets: ["latin"] })
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <main className={cn(interFont.className, "subpixel-antialiased font-normal tracking-normal")}>
        <FormProvider>
          <Component {...pageProps} />
        </FormProvider>
      </main>
    </AuthProvider >
  );
}
