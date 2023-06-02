import React, { useEffect, useRef, useState } from "react";
import s from "./Statistics.module.scss";

const Statistics = () => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { innerHeight, pageYOffset } = window;

      if (
        ref.current &&
        ref.current.offsetTop <= innerHeight + pageYOffset - 50
      ) {
        setInView(true);
      } else {
        setInView(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ref]);

  return (
    <section className={s.statistics_section} ref={ref}>
      <h1>Статистика за последний год</h1>
      {inView && (
        <div className={s.statistics_section__main}>
          <div className={s.statistics_section__main__block}>
            <div className={s.statistics_section__main__block_num}>
              <p className={`${s.num} ${s.num1}`}> </p>
              <p>%</p>
            </div>
            <h3>Учеников после обучение устраиваются на работу</h3>
          </div>
          <div className={s.statistics_section__main__block}>
            <div className={s.statistics_section__main__block_num}>
              <p className={`${s.num} ${s.num2}`}> </p>
              <p>%</p>
            </div>
            <h3>Положительных отзывов после курсов</h3>
          </div>
          <div className={s.statistics_section__main__block}>
            <div className={s.statistics_section__main__block_num}>
              <p className={`${s.num} ${s.num3}`}></p>
              <p>%</p>
            </div>
            <h3>
              Студентов, занимающихся онлайн, находятся в возрасте от 18 до 34
              лет.
            </h3>
          </div>
        </div>
      )}
    </section>
  );
};

export default Statistics;
