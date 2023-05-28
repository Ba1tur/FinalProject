import React, { useEffect, useState } from "react";
import s from "./Header.module.scss";
import logo from "../../public/logo.png";
import language from "../../public/language.svg";
import Image from "next/image";
import { Button } from "antd";
import MyBtn from "../MyBtn/MyBtn";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  // const router = useRouter();

  
  // const isHomepage = router.pathname.startsWith('/')
  // const isSubscriptionsPage = router.pathname.startsWith('/subscriptions')

  const [theme, setTheme] = useState('theme1')

  const toggleTheme = () => {
    setTheme(theme === 'theme1' ? 'theme2' : 'theme1')
  }

  useEffect(() => {
    const backgroundColor = `var(--background-color-${theme})`;
    const fontColor = `var(--font-color-${theme})`;
    const background = `var(--background-${theme})`;
    const border1pxSolid = `var(--border-1px-solid-${theme})`;
  
    document.body.style.setProperty('--background-color', backgroundColor);
    document.body.style.setProperty('--font-color', fontColor);
    document.body.style.setProperty('--background', background);
    document.body.style.setProperty('--border-1px-solid', border1pxSolid);
  }, [theme]);


  const {pathname} = useRouter()
  
  return (
    <header className={s.header}>
      <nav className={s.header__nav}>
        <div className={s.header__nav__logo_block}>
          <Link href="/">
            <Image className={s.header__nav_logo} src={logo} alt="logo_img" />
            <h1>It-Academy</h1>
          </Link>
          <Link href="/lessons">
            <h2 className={pathname === '/lessons' ? s.link_active : s.link}>Все уроки</h2>
          </Link>
          <Link href="/subscriptions">
            <h3 className={pathname === '/subscriptions' ? s.link_active : s.link}>Мои подписки</h3>
          </Link>
        </div>
        <div className={s.header__nav__block}>
          {/* <Image
            className={s.header__nav_language}
            src={language}
            alt="language_icon"
          /> */}
          <input type="checkbox" onClick={toggleTheme} className={s.header__nav__block_theme_btn} />
          <Link href="/login">
            <Button type="primary" style={{ width: "200px", height: "45px"  }}>
              Вход и регистрация
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
