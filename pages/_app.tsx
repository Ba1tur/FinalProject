import Layouts from "@/components/Layouts/Layouts";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import "@/styles/LessonSlide.css"
import "@/styles/theme.css"
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
         <Layouts>
      <Component {...pageProps} />
    </Layouts>
    </Provider>
 
  );
}
