import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

type Props = {
  children: React.ReactNode;
};

const Layouts = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layouts;
