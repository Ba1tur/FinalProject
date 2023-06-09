import React, { useEffect, useState } from "react";
import s from "./Subscriptions.module.scss";
import { Button, Card } from "antd";
import Image from "next/image";
import reactLogo from "../../public/reactpng.png";
import { subscriptions } from "@/constants/subscriptions";
import playBtn from "../../public/play.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptions } from "@/redux/reducers/subscriptions";
import axios from "axios";

interface Subscription {
  id: number;
  img: string;
  title: string;
}

const Subscriptions = () => {
  const [user, setUser] = useState<any>();
  const [subs, setSubs] = useState<any>([]);

  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      getSubs();
    }
  }, [user]);

  const getSubs = () => {
    try {
      let config = {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("token") as string),
        },
      };
      axios
        .get(
          `https://localhost:7090/Subscribtion/getSubscriptionList/${user.id}`,
          config
        )
        .then((res) => {
          setSubs(res.data.subscriptions);
          console.log(res);
        });
    } catch (err) {
      console.log(err);
    }
  };

  // const unsubscribe = async (studentId: number, courseId: number) => {
  //   try {
  //     let config = {
  //       headers: {
  //         Authorization:
  //           "Bearer " + JSON.parse(localStorage.getItem("token") as string),
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     const requestBody = {
  //       studentId: studentId,
  //       courseId: courseId,
  //     };
  //     const response = await axios.delete(
  //       "https://localhost:7090/Subscribtion/unsubscribe",
  //       {
  //         ...config,
  //         data: JSON.stringify(requestBody),
  //       }
  //     );
  //     getSubs();
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const unsubscribe = async (studentId: number , courseId: number) => {
    try {
      let config = {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("token") as string),
          "Content-Type": "application/json",
        },
      };
      const requestBody = {
        studentId: studentId,
        courseId: courseId
      };
      const response = await axios.delete(
        "https://localhost:7090/Subscribtion/unsubscribe",
        {
          ...config,
          data: JSON.stringify(requestBody),
        }
      );
      console.log(response.data);
      getSubs()
    } catch (error) {
      console.error(error);
    }
  };

  console.log(subs);
  return (
    <section className={s.subscriptions_section}>
      <motion.h1
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
      >
        Все подписки
      </motion.h1>
      <div className={s.subscriptions_section__block}>
        {subs.length > 0 && 
          (function () {
            const cards: JSX.Element[] = [];
            subs.forEach((card: any) => {
              cards.push(
                <Card
                  // onClick={() => router.push("/videoPage")}
                  key={card.id}
                  className={s.subscriptions_section__block__box}
                >
                  <Image
                    className={s.subscriptions_section__block__img}
                    width={320}
                    height={150}
                    src='/jsPhoto.jpg'
                    alt="react_logo"
                  />
                  <Image
                    className={s.subscriptions_section__block__play_btn}
                    src={playBtn}
                    alt="play_btn"
                  />
                  <p>Имя ментора:{card.mentorName}</p>
                  <p>Название:{card.title}</p>
                  <p>Описание{card.description}</p>
                 
                  <Button
                    onClick={() => unsubscribe(user.id, card.id)}
                    danger
                  >
                    Отписаться
                  </Button>
                </Card>
              );
            });
            return cards;
          })()}
      </div>
    </section>
  );
};

export default Subscriptions;