import React, { CSSProperties, useEffect, useState } from "react";
import s from "./Header.module.scss";
import logo from "../../public/logo.png";
import language from "../../public/language.svg";
import Image from "next/image";
import { Button, Dropdown, MenuProps, Modal, Tooltip } from "antd";
import MyBtn from "../MyBtn/MyBtn";
import Link from "next/link";
import { useRouter } from "next/router";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import NavBar from "../NavBar/NavBar";
import MyInput from "../MyInput/MyInput";
import TeacherResetPassword from "../TeacherResetPassword/TeacherResetPassword";
import StudentResetPassword from "../StudentResetPassword/StudentResetPassword";
import TeacherUpdate from "../StudentUpdate/TeacherUpdate";

interface headerDowns {
  position: string;
  top: number;
  left: number;
  right: number;
  zIndex: number;
  transition: string;
  transform: any;
}

const Header = () => {
  const router = useRouter();

  const [theme, setTheme] = useState<string>("");
  const [item, setItem] = useState(false);
  const [user, setUser] = useState<any>();

  const toggleTheme = () => {
    const newTheme = theme === "theme1" ? "theme2" : "theme1";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      setItem(true);
    }
  }, [item]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "theme1") {
      setTheme("theme1");
    } else if (theme === "theme2") {
      setTheme("theme2");
    }
  }, []);

  useEffect(() => {
    const backgroundColor = `var(--background-color-${theme})`;
    const fontColor = `var(--font-color-${theme})`;
    const background = `var(--background-${theme})`;
    const border1pxSolid = `var(--border-1px-solid-${theme})`;

    document.body.style.setProperty("--background-color", backgroundColor);
    document.body.style.setProperty("--font-color", fontColor);
    document.body.style.setProperty("--background", background);
    document.body.style.setProperty("--border-1px-solid", border1pxSolid);

    localStorage.setItem("theme", theme);
  }, [theme]);

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [modal2Open, setModal2Open] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      setPrevScrollPos(currentScrollPos);
      if (pageYOffset > 150) {
        if (isScrollingUp) {
          setIsHeaderVisible(true);
        } else {
          setIsHeaderVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "user") {
        const token = localStorage.getItem("user");
        if (token) {
          setItem(true);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const headerDown: CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    transition: "transform 0.3s ease-out",
    transform: isHeaderVisible ? "translateY(0)" : "translateY(-100%)",
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/");
    setTimeout(() => {
      location.reload();
    }, 1000);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className={s.user_block}>
          {user && user.userName && (
            <h4 className={s.profile_name}>Имя: {user.userName}</h4>
          )}
          {user && user.roleId === 2 ? (
            <>
              <TeacherResetPassword />
              <TeacherUpdate />
            </>
          ) : (
            <StudentResetPassword />
          )}

          <Button
            onClick={handleLogout}
            style={{ width: "130px", marginTop: "10px" }}
            icon={<LogoutOutlined />}
          >
            Выйти
          </Button>
        </div>
      ),
    },
  ];

  return (
    <header style={headerDown} className={s.header}>
      <nav className={s.header__nav}>
        <div className={s.header__nav__logo_block}>
          <Link href="/">
            <Image className={s.header__nav_logo} src={logo} alt="logo_img" />
            <h1>It-Academy</h1>
          </Link>
          {item ? <NavBar /> : ""}
        </div>
        <div className={s.header__nav__block}>
          <input
            type="checkbox"
            onClick={toggleTheme}
            checked={theme === "theme2"}
            className={s.header__nav__block_theme_btn}
          />
          {item ? (
            <Dropdown menu={{ items }} placement="bottom">
              <UserOutlined
                style={{ color: "black", fontSize: "30px", cursor: "pointer" }}
              />
            </Dropdown>
          ) : (
            <Link href="/form">
              <Button type="primary" style={{ width: "200px", height: "45px" }}>
                Вход и регистрация
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
