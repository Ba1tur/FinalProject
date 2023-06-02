import React, { useEffect, useState } from "react";
import s from "./Lessons.module.scss";
import Image from "next/image";
import mainImg from "../../public/Hero.png";
import LessonSlide from "@/components/LessonSlide/LessonSlide";
import { lessons } from "@/constants/lessons";
import { motion } from "framer-motion";
import { subscriptions } from "@/constants/subscriptions";
import { Button, Card } from "antd";
import playBtn from "../../public/play.svg";
import axios from "axios";

const Lessons = () => {

  const [lessons , setLessons] = useState([])

  useEffect(() => {
    axios
      .get("https://localhost:7090/Course/getAllCourses")
      .then((res) => {
        setLessons(res.data.courses.courses)
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(lessons);
  

  return (
    <main className={s.main_section}>
      <div className={s.main_section__block}>
        <motion.h1
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
          className={s.heading}
        >
          Все Курсы
        </motion.h1>
        <div className={s.main_section__block__about}>
          {lessons.map((item) => {
            return (
              <Card
                // onClick={() => router.push("/videoPage")}
                key={item.id}
                className={s.main_section__block__box}
              >
                <Image
                  className={s.main_section__block__img}
                  width={320}
                  height={150}
                  src='/reactpng.png'
                  alt="react_logo"
                />
                <Image
                  className={s.main_section__block__play_btn}
                  src={playBtn}
                  alt="play_btn"
                />
                <p>{item.title}</p>
                <p>{item.description}</p>
                <Button danger>Отписаться</Button>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Lessons;
