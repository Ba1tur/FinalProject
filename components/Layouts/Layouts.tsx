import React, {  useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getMentors } from "@/redux/reducers/mentors";


type Props = {
  children: React.ReactNode;
};

const Layouts = ({ children }: Props) => {

  // const dispatch: ThunkDispatch<{}, void, any>  = useDispatch()
  

  // useEffect(() => {
    // dispatch(getMentors())
  // },[])
  
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layouts;
