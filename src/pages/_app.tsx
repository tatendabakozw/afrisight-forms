import { AuthProvider } from "@/context/AuthContext";
import { FormProvider } from "@/context/FormContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <FormProvider>
        <Component {...pageProps} />
      </FormProvider>
    </AuthProvider>
  );
}
