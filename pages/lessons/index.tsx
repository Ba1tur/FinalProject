import React from "react";
import s from "./Lessons.module.scss";
import Image from "next/image";
import mainImg from "../../public/Hero.png";
import LessonSlide from "@/components/LessonSlide/LessonSlide";
import { lessons } from "@/constants/lessons";

const Lessons = () => {
  return (
    <main className={s.main_section}>
      <div className={s.main_section__block}>
        <h1>Все Курсы</h1>
        <div className={s.main_section__block__about}>
          <LessonSlide lessons={lessons} />
        </div>
      </div>
    </main>
  );
};

export default Lessons;
