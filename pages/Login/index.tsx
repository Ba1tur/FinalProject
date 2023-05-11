import React from "react";
import s from "./Login.module.scss";
import MyInput from "@/components/MyInput/MyInput";
import MyBtn from "@/components/MyBtn/MyBtn";
import Link from "next/link";

const Login = () => {
  return (
    <section className={s.login_section}>
      <div className={s.login_section__block}>
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
      </div>
    </section>
  );
};

export default Login;
