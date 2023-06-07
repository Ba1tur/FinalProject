import React, { useEffect, useState } from "react";
import s from "./NavBar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

const NavBar = () => {
  const { pathname } = useRouter();
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  return (
    <>
      <div style={{ display: "flex" }}>
        <Link href="/lessons">
          <h2 className={pathname === "/lessons" ? s.link_active : s.link}>
            Все уроки
          </h2>
        </Link>
        {user && user.roleId !== 2 && (
          <Link href="/subscriptions">
            <h3
              className={
                pathname === "/subscriptions" ? s.link_active : s.link
              }
            >
              Мои подписки
            </h3>
          </Link>
        )}
        {user && user.roleId === 2 && (
          <Link href="/mentor">
            <h3 className={pathname === "/mentor" ? s.link_active : s.link}>
              Создать урок
            </h3>
          </Link>
        )}
        {user && user.roleId === 1 && (
          <Link href="/admin">
            <h3 className={pathname === "/admin" ? s.link_active : s.link}>
              Админская панель
            </h3>
          </Link>
        )}
      </div>
    </>
  );
};

export default NavBar;