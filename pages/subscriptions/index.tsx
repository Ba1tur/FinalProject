import React from "react";
import s from "./Subscriptions.module.scss";
import { Button, Card } from "antd";
import Image from "next/image";
import reactLogo from "../../public/reactpng.png";
import { subscriptions } from "@/constants/subscriptions";
import playBtn from "../../public/play.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
interface subscriptions {
  id: number;
  img: string;
  title: string;
}

const Subscriptions = () => {
  const router = useRouter();

  return (
    <section className={s.subscriptions_section}>
      <motion.h1
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
      >
        Все подписки
      </motion.h1>
      <div className={s.subscriptions_section__block}>
        {subscriptions.map((card) => {
          return (
            <Card
              onClick={() => router.push("/videoPage")}
              key={card.id}
              className={s.subscriptions_section__block__box}
            >
              <Image
                className={s.subscriptions_section__block__img}
                width={320}
                height={150}
                src={card.img}
                alt="react_logo"
              />
              <Image
                className={s.subscriptions_section__block__play_btn}
                src={playBtn}
                alt="play_btn"
              />
              <p>{card.tilte}</p>
              <Button danger>Отписаться</Button>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default Subscriptions;
