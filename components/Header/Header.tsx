import React from "react";
import s from "./Header.module.scss";
import logo from "../../public/logo.png";
import language from '../../public/language.svg'
import Image from "next/image";
import { Button } from "antd";
import MyBtn from "../MyBtn/MyBtn";

const Header = () => {
  return (
    <header className={s.header}>
      <nav className={s.header__nav}>
        <div className={s.header__nav__logo_block}>
          <Image className={s.header__nav_logo} src={logo} alt="logo_img" />
          <h1>It-Academy</h1>
        </div>
        <div className={s.header__nav__block}>
			 <Image className={s.header__nav_language} src={language} alt="language_icon"/>
          <Button type="primary" style={{ width: "200px", height: "100%" }}>
            Вход и регистрация
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
