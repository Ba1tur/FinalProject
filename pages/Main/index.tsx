import React from "react";
import s from "./Main.module.scss";
import Hero from "../../public/Hero.png";
import Image from "next/image";
import { motion } from "framer-motion";
import Teachers from "@/components/Teachers/Teachers";
import Statistics from "@/components/Statistics/Statistics";

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

export const textVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Main = () => {
  const variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className={s.main_section}>
      <div className={s.main_section__main}>
        <div className={s.main_section__block}>
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.span variants={textVariants}>Станьте</motion.span>
            <motion.span variants={textVariants}>частью</motion.span> <br />
            <motion.span variants={textVariants}>онлайн</motion.span> <br />
            <motion.span variants={textVariants}>образования</motion.span>
            <motion.span variants={textVariants}>и</motion.span> <br />
            <motion.span variants={textVariants}>достигните</motion.span> <br />
            <motion.span variants={textVariants}>новых</motion.span>
            <motion.span variants={textVariants}>высот!</motion.span> <br />
          </motion.h1>
          <motion.h4 initial="hidden" animate="visible" variants={variants}>
            Онлайн обучения - ключ к бесконечным знаниям, росту и саморазвитию в
            инновационной среде
          </motion.h4>
          <motion.button initial="hidden" animate="visible" variants={variants}>
            Зарегистрироваться
          </motion.button>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={imageVariants}
          transition={{ duration: 1.5 }}
          className={s.main_section__img}
        >
          <Image src={Hero} alt="hero_img" />
        </motion.div>
      </div>
      <div>
        <Teachers />
      </div>
      <div>
        <Statistics/>
      </div>
    </section>
  );
};

export default Main;
