import React, { useEffect, useState } from "react";
import s from "./Form.module.scss";
import { useRouter } from "next/router";
import Earth from "@/components/Earth/Earth";
import { Button, Checkbox, Modal } from "antd";
import TeacherForm from "@/components/TeacherForm/TeacherForm";
import StudentForm from "@/components/StudentForm/StudentForm";
import StudentLogin from "@/components/StudentLogin/StudentLogin";
import TeacherLogin from "@/components/TeacherLogin/TeacherLogin";

const Form: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [render, setRender] = useState<boolean>(true);
  const [showEarth, setshowEarth] = useState<boolean>(true);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const handleCheckbox1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };
  const handleCheckbox2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!e.target.checked);
  };
  const handleSignInClick = () => {
    setIsSignUp(false);
    setshowEarth((prev) => !prev);
  };
  const router = useRouter();
  const handleSignUpClick = () => {
    setIsSignUp(true);
    setshowEarth((prev) => !prev);
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const changeShowEarth = () => {
    setshowEarth((prev) => !prev);
  };

  const [item, setItem] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      router.push('/')
    }
  }, [item]);


  return (
    <section className={s.login_section}>
      <div className={`${s.container} ${isSignUp ? s["right-panel-active"] : ""}`}>
        <div className={`${s.container__form} ${s["container--signup"]}`}>
          <div className={s.form} id="form1">
            <h2 className={s.form__title}>Зарегистрироваться</h2>
            <div>
              <button
                className={
                  render
                    ? s.container__form__btn_active
                    : s.container__form__btn
                }
                onClick={() => setRender(true)}
              >
                Я учитель
              </button>
              <button
                className={
                  render
                    ? s.container__form__btn
                    : s.container__form__btn_active
                }
                onClick={() => setRender(false)}
              >
                Я ученик
              </button>
            </div>
            {render ? <TeacherForm /> : <StudentForm />}
          </div>
        </div>
        <div className={`${s.container__form} ${s["container--signin"]}`}>
          <div className={s.form} id="form2" onSubmit={handleFormSubmit}>
            <h2 className={s.form__title}>Войти</h2>
            {isChecked ? <StudentLogin /> : <TeacherLogin />}
            <div className={s.form_checkbox}>
              <Checkbox checked={isChecked} onChange={handleCheckbox1Change} />
              <h6> Ученик</h6>
              <Checkbox checked={!isChecked} onChange={handleCheckbox2Change} />
              <h6> Учитель</h6>
            </div>
          </div>
        </div>
        <div className={s.container__overlay}>
          <div className={s.overlay}>
            <div className={`${s.overlay__panel} ${s["overlay--left"]}`}>
              {showEarth ? "" : <Earth />}
              <button className={s.btn} onClick={handleSignInClick}>
                Войти
              </button>
            </div>
            <div className={`${s.overlay__panel} ${s["overlay--right"]}`}>
              {showEarth ? <Earth /> : ""}
              <button className={s.btn} onClick={handleSignUpClick}>
                Зарегистрироваться
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
