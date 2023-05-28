import React from "react";
import s from "./Teachers.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";

const mogData = [
  {
    id: 1,
    profileImg: "/man.png",
    fullname: "Дмитрий Иванов",
    spec: "Учитель по JavaScipt.",
	 year: '6 лет'
  },
  {
    id: 2,
    profileImg: "/man.png",
    fullname: "Дмитрий Иванов",
    spec: "Учитель по C#.",
	 year: '2 лет'
  },
  {
    id: 3,
    profileImg: "/man.png",
    fullname: "Дмитрий Иванов",
    spec: "Учитель по Python.",
	 year: '3 лет'
  },
  {
    id: 4,
    profileImg: "/man.png",
    fullname: "Дмитрий Иванов",
    spec: "Учитель по Java.",
	 year: '5 лет'
  },
];

const Teachers = () => {
  const variants = {
    init: { scale: 0 },
    inView: { scale: 1, transition: { duration: 0.5 } },
  };
  return (
    <section id="teachers" className={s.team_lead}>
      <div className={s.container}>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 1 } }}
          className={s.heading}
        >
          <h2>Наши лучшие учителя</h2>
        </motion.div>
        <div className={s.users_cards}>
          {mogData.map(({ spec, profileImg, id, fullname , year }) => (
            <div key={id} className={s.user_card}>
              <motion.div
                initial={{ rotate: 200, scale: 0.5 }}
                whileInView={{
                  rotate: 0,
                  scale: 1,
                  transition: { duration: 0.8 },
                }}
                whileHover={{ scale: 1.1 }}
              >
                <Image
                  src={profileImg}
                  width={190}
                  height={190}
                  alt="profile"
                  style={{ borderRadius: "50%" }}
                />
              </motion.div>
              <motion.h6
                variants={variants}
                whileInView="inView"
                initial="init"
                className={s.username}
              >
                {fullname}
              </motion.h6>
              <motion.span
                variants={variants}
                whileInView="inView"
                initial="init"
                className={s.spec}
              >
                {spec}
              </motion.span>
              <motion.span
                variants={variants}
                whileInView="inView"
                initial="init"
					 className={s.spec}
              >Опыт работы: {year}</motion.span>
              <a href="https://www.linkedin.com/in/ilgiz-arykbaev-107016206/">
                <motion.button
                  className={s.btn}
                  whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                >
                  Биография
                </motion.button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teachers;
