import React, { useState } from "react";
import s from "./Form.module.scss";
import MyInput from "@/components/MyInput/MyInput";
import MyBtn from "@/components/MyBtn/MyBtn";
import Link from "next/link";
import Image from "next/image";
import Earth from "@/components/Earth/Earth";
import { useForm } from "react-hook-form";

const Form = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignInClick = () => {
    setIsSignUp(false);
    setshowEarth((prev) => !prev);
  };

  const {
    register,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const submit = (data) => {
    const {confirm, ...other} = data
}

  const handleSignUpClick = () => {
    setIsSignUp(true);
    setshowEarth((prev) => !prev);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const [showEarth, setshowEarth] = useState(true);

  const changeShowEarth = () => {
    setshowEarth((prev) => !prev);
  };

  return (
    <section className={s.login_section}>
      {/* <div className={s.login_section__block}>
        <h1>Авторизация</h1>
        <div className={s.login_section__block__inputs}>
          <div>
            <p>Email</p>
            <MyInput />
          </div>
          <div>
            <p>Пароль</p>
            <MyInput type="password" />
          </div>
        </div>
        <h3>Восстановить пароль</h3>
        <MyBtn style={{ background: "#465EFD", color: "#FFFFFF" }}>Войти</MyBtn>
        <Link href='/regis' as='/regis'>
          <MyBtn style={{ marginTop: "15px" }}>Зарегистрироваться</MyBtn>
        </Link>
      </div> */}
      <div
        className={`${s.container} ${isSignUp ? s["right-panel-active"] : ""}`}
      >
        {/* Sign Up */}
        <div className={`${s.container__form} ${s["container--signup"]}`}>
          <form
            action="#"
            className={s.form}
            id="form1"
            noValidate
            onSubmit={handleSubmit(submit)}
          >
            <h2 className={s.form__title}>Зарегистрироваться</h2>
            <div style={{ width: "360px" }}>
              <p>FirstName</p>
              <MyInput 
                  {...register("name", {
                    required: {
                      message: "Заполните поле",
                      value: true,
                    },
                  })}
              />
              <span>{errors.name && errors.name.message}</span>
            </div>
            <div style={{ width: "360px", marginTop: "15px" }}>
              <p>LastName</p>
              <MyInput
                {...register("name", {
                  required: {
                    message: "Заполните поле",
                    value: true,
                  },
                })}
              />
              <span>{errors.name && errors.name.message}</span>
            </div>
            <div style={{ width: "360px", marginTop: "15px" }}>
              <p>Email</p>
              <MyInput
                {...register("email", {
                  required: {
                    message: "Email обязателен",
                    value: true,
                  },
                  minLength: {
                    message: "Минимальная длина = 8",
                    value: 8,
                  },
                  pattern: {
                    message: "Не провильно введен пароль",
                    value: /^[^]+@[^ ]+\.[a-z]{2,5}$/,
                  },
                })}
              />
              <span>{errors.email && errors.email.message}</span>
            </div>
            <div style={{ width: "360px", marginTop: "15px" }}>
              <p>Password</p>
              <MyInput
                type="password"
                {...register("password", {
                  required: {
                    message: "Пароль обязателен",
                    value: true,
                  },
                  pattern: {
                    value:
                      /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g,
                    message: "Слишком легкий пароль",
                  },
                })}
              />
              <span>{errors.email && errors.email.message}</span>
            </div>
            <div style={{ width: "360px", marginTop: "15px" }}>
              <p>Confirm Password</p>
              <MyInput
                type='password'
                {...register("confirm", {
                  required: {
                    message: "Подтвердите пароль",
                    value: true,
                  },
                  validate: (v) => {
                    if (getValues("password") !== v) {
                      return "Пароль не совпадает";
                    }
                  },
                })}
              />
              <span>{errors.email && errors.email.message}</span>
            </div>
            <button className={s.btn}>Зарегистрироваться</button>
          </form>
        </div>

        {/* Sign In */}
        <div className={`${s.container__form} ${s["container--signin"]}`}>
          <form
            action="#"
            className={s.form}
            id="form2"
            onSubmit={handleFormSubmit}
          >
            <h2 className={s.form__title}>Войти</h2>
            <div style={{ width: "330px" }}>
              <p>Email</p>
              <MyInput />
              <span></span>
            </div>
            <div style={{ width: "330px", marginTop: "15px" }}>
              <p>Password</p>
              <MyInput />
              <span></span>
            </div>
            <a href="#" className={s.link}>
              Forgot your password?
            </a>
            <button className={s.btn}>Войти</button>
          </form>
        </div>
        <div className={s.container__overlay}>
          <div className={s.overlay}>
            {/* <Earth/> */}
            <div className={`${s.overlay__panel} ${s["overlay--left"]}`}>
              {showEarth ? " " : <Earth />}
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
