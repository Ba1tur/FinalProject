import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import s from "./videoPage.module.scss";
import VidyardPlayer from "react-player/vidyard";
import { useRouter } from "next/router";
import axios from "axios";

const videoPage = () => {
 const {query} = useRouter()
 console.log(query.id);


 const getCourseDetails = async () => {
  try {
    let config = {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("token") as string),
      },
    };
    await axios("https://localhost:7090/Admin/getAllMentors", config).then(
      (res) => {
        
      }
    );
  } catch (err) {
    console.log(err);
  }
};

  return (
    <section className={s.video_page_section}>
      {/* <video autoPlay={false} controls>
        <source src="/Feerix - Space Drift.mp4" />
        <source src="/path/to/video.webm" type="video/webm" />
      </video> */}
      {/* <VidyardPlayer
      src='/Feerix - Space Drift.mp4'
      width='720'
      height='420'
      /> */}


      {/* <ReactPlayer url='../../public/Feerix - Space Drift.mp4'></ReactPlayer> */}
      {/* <div className={s.video_page_section__block}>
        <video autoPlay={true} controls>
          <source src="/Feerix - Space Drift.mp4" />
          <source src="/path/to/video.webm" type="video/webm" />
        </video>
      </div> */}
    </section>
  );
};

export default videoPage;
