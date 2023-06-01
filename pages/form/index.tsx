import React, { useState } from "react";
import s from "./Form.module.scss";
import MyInput from "@/components/MyInput/MyInput";
import MyBtn from "@/components/MyBtn/MyBtn";
import Link from "next/link";
import Image from "next/image";
import Earth from "@/components/Earth/Earth";
import { useForm } from "react-hook-form";
import axios from "axios";

const Form = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [render, setRender] = useState(true);
  const [postRegisUser, setpostRegisUser] = useState({
    userName: "",
    email: "",
    passwordHash: "",
    jobTitle: "",
    experience: "",
    education: "",
  });

  const [postLoginUser, setpostLoginUser] = useState({
    userName: "",
    passwordHash: "",
  });

  const [postRegStudent, setpostRegStudent] = useState({
    userName: "",
    email: "",
    passwordHash: "",
  });
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

  const submit = (data: any) => {
    const { confirm, ...other } = data;
  };

  const BASE_URL = "https://localhost:7090/Account/";

  const regUser = async () => {
    await axios
      .post(BASE_URL + "register", postRegisUser)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.jwtToken));
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loginUser = async () => {
    await axios
      .post(BASE_URL + "authorize", postLoginUser)
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.jwtToken));
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const postRegisUsers = async () => {
    if (render === true) {
      await axios
        .post(BASE_URL + "register", postRegisUser)
        .then((res) => {
          localStorage.setItem("token", JSON.stringify(res.data.jwtToken));
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await axios
        .post("https://localhost:7090/StudentAccount/register/" , postRegStudent)
        .then((res) => {
          localStorage.setItem("token", JSON.stringify(res.data.jwtToken));
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <section className={s.login_section}>
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
            <div>
              <button
                className={render ? s.container__form__btn_active : s.container__form__btn}
                onClick={() => setRender(true)}
              >
                Я ученик
              </button>
              <button
                className={render ? s.container__form__btn : s.container__form__btn_active}
                onClick={() => setRender(false)}
              >
                Я учетиль
              </button>
            </div>
            {render ? (
              // Учетиль форм
              <>
                <div style={{ width: "360px" }}>
                  <p>Name</p>
                  <MyInput
                    value={postRegisUser.userName}
                    onChange={(e: KeyboardEvent) => {
                      setpostRegisUser({
                        ...postRegisUser,
                        userName: e.target.value,
                      });
                    }}
                  />
                  <span>{errors.name && errors.name.message}</span>
                </div>
                <div style={{ width: "360px", marginTop: "15px" }}>
                  <p>Email</p>
                  <MyInput
                    value={postRegisUser.email}
                    onChange={(e: KeyboardEvent) => {
                      setpostRegisUser({
                        ...postRegisUser,
                        email: e.target.value,
                      });
                    }}
                  />
                  <span>{errors.email && errors.email.message}</span>
                </div>
                <div style={{ width: "360px", marginTop: "15px" }}>
                  <p>Password</p>
                  <MyInput
                    type="password"
                    value={postRegisUser.passwordHash}
                    onChange={(e: KeyboardEvent) => {
                      setpostRegisUser({
                        ...postRegisUser,
                        passwordHash: e.target.value,
                      });
                    }}
                  />
                  <span>{errors.email && errors.email.message}</span>
                </div>
                <div style={{ width: "360px", marginTop: "15px" }}>
                  <p>JobTitle</p>
                  <MyInput
                    value={postRegisUser.jobTitle}
                    onChange={(e: KeyboardEvent) => {
                      setpostRegisUser({
                        ...postRegisUser,
                        jobTitle: e.target.value,
                      });
                    }}
                  />
                  <span>{errors.name && errors.name.message}</span>
                </div>
                <div style={{ width: "360px", marginTop: "15px" }}>
                  <p>experience</p>
                  <MyInput
                    value={postRegisUser.experience}
                    onChange={(e: KeyboardEvent) => {
                      setpostRegisUser({
                        ...postRegisUser,
                        experience: e.target.value,
                      });
                    }}
                  />
                  <span>{errors.name && errors.name.message}</span>
                </div>
                <div style={{ width: "360px", marginTop: "15px" }}>
                  <p>education</p>
                  <MyInput
                    value={postRegisUser.education}
                    onChange={(e: KeyboardEvent) => {
                      setpostRegisUser({
                        ...postRegisUser,
                        education: e.target.value,
                      });
                    }}
                  />
                  <span>{errors.name && errors.name.message}</span>
                </div>
              </>
            ) : (
              // Ученик форм
              <>
                <div style={{ width: "360px", marginTop: "15px" }}>
                  <p>Name</p>
                  <MyInput
                    value={postRegStudent.userName}
                    onChange={(e: KeyboardEvent) => {
                      setpostRegStudent({
                        ...postRegStudent,
                        userName: e.target.value,
                      });
                    }}
                  />
                  <span>{errors.name && errors.name.message}</span>
                </div>
                <div style={{ width: "360px", marginTop: "15px" }}>
                  <p>Email</p>
                  <MyInput
                    value={postRegStudent.email}
                    onChange={(e: KeyboardEvent) => {
                      setpostRegStudent({
                        ...postRegStudent,
                        email: e.target.value,
                      });
                    }}
                  />
                  <span>{errors.name && errors.name.message}</span>
                </div>
                <div style={{ width: "360px", marginTop: "15px" }}>
                  <p>Password</p>
                  <MyInput
                    value={postRegStudent.passwordHash}
                    type="password"
                    onChange={(e: KeyboardEvent) => {
                      setpostRegStudent({
                        ...postRegStudent,
                        passwordHash: e.target.value,
                      });
                    }}
                  />
                  <span>{errors.name && errors.name.message}</span>
                </div>
              </>
            )}
            <button className={s.btn} onClick={() => postRegisUsers()}>
              Зарегистрироваться
            </button>
          </form>
        </div>
        <div className={`${s.container__form} ${s["container--signin"]}`}>
          <form
            action="#"
            className={s.form}
            id="form2"
            onSubmit={handleFormSubmit}
          >
            <h2 className={s.form__title}>Войти</h2>
            <div style={{ width: "330px" }}>
              <p>Name</p>
              <MyInput
                value={postLoginUser.userName}
                onChange={(e: KeyboardEvent) => {
                  setpostLoginUser({
                    ...postLoginUser,
                    userName: e.target.value,
                  });
                }}
              />
              <span></span>
            </div>
            <div style={{ width: "330px", marginTop: "15px" }}>
              <p>Password</p>
              <MyInput
                type="password"
                value={postLoginUser.passwordHash}
                onChange={(e: KeyboardEvent) => {
                  setpostLoginUser({
                    ...postLoginUser,
                    passwordHash: e.target.value,
                  });
                }}
              />
              <span></span>
            </div>
            <a href="#" className={s.link}>
              Forgot your password?
            </a>
            <button onClick={() => loginUser()} className={s.btn}>
              Войти
            </button>
          </form>
        </div>
        <div className={s.container__overlay}>
          <div className={s.overlay}>
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
