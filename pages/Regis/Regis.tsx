import React, { useState } from "react";
import s from "./Regis.module.scss";
import MyInput from "@/components/MyInput/MyInput";
import MyBtn from "@/components/MyBtn/MyBtn";
import { Checkbox } from "antd";
import Link from "next/link";

interface User {
  name: string;
  LastName: string;
  email: string;
  password: string;
  repeatPassword: string;
  role: string;
}

const Regis = () => {
  // const [role , setRole] = useState("");

  const [user, setUser] = useState<User>({
    name: "",
    LastName: "",
    email: "",
    password: "",
    repeatPassword: "",
    role: "",
  });

  return (
    <section className={s.regis_section}>
      <div className={s.regis_section__block}>
        <h1>Регистрация</h1>
        <div className={s.regis_section__block_inputs}>
          <div>
            <p>Имя</p>
            <MyInput
            // value={user.name}
            // onChange={(e) => setUser({...user , name: e.target.value})}
            />
          </div>
          <div>
            <p>Фамилия</p>
            <MyInput
            // value={user.LastName}
            // onChange={handleInputChange}
            />
          </div>
          <div>
            <p>Email</p>
            <MyInput
            // value={user.email}
            // onChange={handleInputChange}
            />
          </div>
          <div>
            <p>Пароль</p>
            <MyInput
              type="password"
              // value={user.password}
              // onChange={handleInputChange}
            />
          </div>
          <div>
            <p>Повторить Пароль</p>
            <MyInput type={"password"} />
          </div>
          <div>
            <p>Выберите Роль</p>
            <Checkbox
              checked={user.role === "student"}
              onChange={() => setUser({ ...user, role: "student" })}
            >
              Ученик
            </Checkbox>
            <Checkbox
              checked={user.role === "teacher"}
              onChange={() => setUser({ ...user, role: "teacher" })}
            >
              Учитель
            </Checkbox>
          </div>
        </div>
        <MyBtn style={{ background: "#465EFD", color: "#FFFFFF" }}>
          Зарегистрироваться
        </MyBtn>
        <Link href='../Login/Login' as='/login'>
          <MyBtn style={{ marginTop: "15px" }}>Уже есть аккаунт</MyBtn>
        </Link>
      </div>
    </section>
  );
};

export default Regis; 
