import React from "react";
import s from "./LessonSlide.module.scss";
import reactLogo from "../../public/reactpng.png";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";
import Image from "next/image";
import { Lesson } from "@/constants/lessons";
import { Button } from "antd";

type Props = {
  lessons: Lesson[];
};

const LessonSlide = ({ lessons }: Props) => {
  return (
    <div className={s.lessons_slide}>
      <Swiper
        navigation={true}
        slidesPerView={4}
        spaceBetween={70}
        modules={[Navigation]}
        className="mySwiper"
      >
        {lessons.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <div className={s.container}>
                <div className={s.card}>
                  <div className={`${s.face} ${s.front}`}>
                    <div className={s.content}>
                      <Image
                        width={300}
                        height={200}
                        src={item.img}
                        alt="react_img"
                      />
                    </div>
                  </div>
                  <div className={`${s.face} ${s.back}`}>
                    <div className={s.content}>
                      <p>{item.title}</p>
                      <Button>Перейти на урок</Button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default LessonSlide;
