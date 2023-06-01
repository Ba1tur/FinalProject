import React from "react";
import s from "./LessonCard.module.scss";
import Image from "next/image";
import { Card } from "antd";
import { useRouter } from "next/router";

const LessonCard = ({ subscriptions } : any) => {
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push("/videoPage")}
      key={subscriptions.id}
      className={s.subscriptions_section__block__box}
    >
      <Image
        className={s.subscriptions_section__block__img}
        width={320}
        height={150}
        src={subscriptions.img}
        alt="react_logo"
      />
      <Image
        className={s.subscriptions_section__block__play_btn}
        src={playBtn}
        alt="play_btn"
      />
      <p>{subscriptions.tilte}</p>
      <Button danger>Отписаться</Button>
    </Card>
  );
};

export default LessonCard;
