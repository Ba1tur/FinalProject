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
import { useRouter } from "next/router";

interface Lesson {
  id: number;
  title: string;
  description: string;
  imageCourseUrl: string;
}

const Lessons: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    let config = {
      headers: {
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("token") as string),
      },
    };
    axios
      .get("https://localhost:7090/Course/getAllCourses", config)
      .then((res) => {
        setLessons(res.data.courses.courses);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const subscription = async (studentId: number, courseId: number) => {
    try {
      let config = {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("token") as string),
        },
      };
      const response = await axios.post(
        "https://localhost:7090/Subscribtion/addSubscribtion",
        { studentId, courseId },
        config
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const router = useRouter();

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
          {lessons.length === 0 ? (
            <h1>Нету уроков</h1>
          ) : (
            lessons.map((item) => {
              return (
                <Card
                  onClick={() => router.push(`/videoPage/${item.id}`)}
                  key={item.id}
                  className={s.main_section__block__box}
                >
                  <img
                    className={s.main_section__block__img}
                    src={item.imageCourseUrl}
                    alt="course_image"
                  />
                  <Image
                    className={s.main_section__block__play_btn}
                    src={playBtn}
                    alt="play_btn"
                  />
                  <p>{item.title}</p>
                  <p>{item.description}</p>
                  <Button onClick={() => subscription(user.id, item.id)}>
                    Подписаться
                  </Button>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
};

export default Lessons;