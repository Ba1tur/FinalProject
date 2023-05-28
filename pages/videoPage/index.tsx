import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import s from "./videoPage.module.scss";

const videoPage = () => {
  return (
    <section className={s.video_page_section}>
      <video autoPlay={false} controls>
        <source src="/Feerix - Space Drift.mp4" />
        <source src="/path/to/video.webm" type="video/webm" />
      </video>

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
