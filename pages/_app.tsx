import Layouts from "@/components/Layouts/Layouts";
import "@/styles/globals.css";
import "@/styles/LessonSlide.css"
import "@/styles/theme.css"
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layouts>
      <Component {...pageProps} />
    </Layouts>
  );
}
