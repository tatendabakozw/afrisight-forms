import { AuthProvider } from "@/context/AuthContext";
import { FormProvider } from "@/context/FormContext";
import { Inter, JetBrains_Mono } from "next/font/google"
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({ variable: '--font-jetbrains-mono', subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <main className={cn(inter.className, jetbrainsMono.className, "subpixel-antialiased font-normal tracking-normal font-sans")}>
        <FormProvider>
          <Component {...pageProps} />
        </FormProvider>
      </main>
    </AuthProvider>
  );
}
