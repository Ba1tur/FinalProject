import React, { useEffect, useState } from "react";
import s from "./Form.module.scss";
import MyInput from "@/components/MyInput/MyInput";
import MyBtn from "@/components/MyBtn/MyBtn";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import Earth from "@/components/Earth/Earth";
import { Button, Checkbox, Modal } from "antd";

interface RegistrationUser {
  userName: string;
  email: string;
  passwordHash: string;
  jobTitle: string;
  experience: string;
  education: string;
}

interface regisStudents {
  email: string;
  passwordHash: string;
}

interface postResetPassword {
  email: string;
}

interface LoginUser {
  email: string;
  passwordHash: string;
}

const Form: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [render, setRender] = useState<boolean>(true);
  const [showEarth, setshowEarth] = useState<boolean>(true);
  const [postRegisUser, setPostRegisUser] = useState<RegistrationUser>({
    userName: "",
    email: "",
    passwordHash: "",
    jobTitle: "",
    experience: "",
    education: "",
  });
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [postStudent, setPostStudent] = useState<regisStudents>({
    email: "",
    passwordHash: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postResetPassword, setpostResetPassword] = useState<postResetPassword>(
    {
      email: "",
    }
  );

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [postLoginUser, setPostLoginUser] = useState<LoginUser>({
    email: "",
    passwordHash: "",
  });

  const [postRegStudent, setPostRegStudent] = useState<RegistrationUser>({
    userName: "",
    email: "",
    passwordHash: "",
    jobTitle: "",
    experience: "",
    education: "",
  });

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

  const resetPassword = async () => {
    if (isChecked === true) {
      await axios
        .post(
          "https://localhost:7090/StudentAccount/resetPassword/",
          resetPassword
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await axios
        .post("https://localhost:7090/Account/resetPassword/", resetPassword)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const loginUsers = async () => {
    if (isChecked === true) {
      await axios
        .post("https://localhost:7090/StudentAccount/authorize/", postStudent)
        .then((res) => {
          localStorage.setItem("token", JSON.stringify(res.data.jwtToken));
          router.push("/lessons");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await axios
        .post("https://localhost:7090/Account/authorize/", postLoginUser)
        .then((res) => {
          localStorage.setItem("token", JSON.stringify(res.data.jwtToken));
          router.push("/lessons");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

  const postRegisUsers = async () => {
    if (render === true) {
      await axios
        .post("https://localhost:7090/Account/register/", postRegisUser)
        .then((res) => {
          localStorage.setItem("token", JSON.stringify(res.data.jwtToken));
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await axios
        .post("https://localhost:7090/StudentAccount/register/", postRegStudent)
        .then((res) => {
          localStorage.setItem("token", JSON.stringify(res.data.jwtToken));
          router.push("/lessons");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token === "token") {
      router.push("/");
    } else {
      console.log(token);
    }
  }, []);

  return (
    <section className={s.login_section}>
      <div
        className={`${s.container} ${isSignUp ? s["right-panel-active"] : ""}`}
      >
        {/* Sign Up */}
        <div className={`${s.container__form} ${s["container--signup"]}`}>
          <form  className={s.form} id="form1" noValidate>
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
            {render ? (
              // Учетиль форм
              <>
                <div className={s.input_block}>
                  <p>Name</p>
                  <MyInput
                    value={postRegisUser.userName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPostRegisUser({
                        ...postRegisUser,
                        userName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className={s.input_block}>
                  <p>Email</p>
                  <MyInput
                    value={postRegisUser.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPostRegisUser({
                        ...postRegisUser,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className={s.input_block}>
                  <p>Password</p>
                  <MyInput
                    type="password"
                    value={postRegisUser.passwordHash}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPostRegisUser({
                        ...postRegisUser,
                        passwordHash: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className={s.input_block}>
                  <p>JobTitle</p>
                  <MyInput
                    value={postRegisUser.jobTitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPostRegisUser({
                        ...postRegisUser,
                        jobTitle: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className={s.input_block}>
                  <p>experience</p>
                  <MyInput
                    value={postRegisUser.experience}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPostRegisUser({
                        ...postRegisUser,
                        experience: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className={s.input_block}>
                  <p>education</p>
                  <MyInput
                    value={postRegisUser.education}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPostRegisUser({
                        ...postRegisUser,
                        education: e.target.value,
                      });
                    }}
                  />
                </div>
              </>
            ) : (
              // Ученик форм
              <>
                <div className={s.input_block}>
                  <p>Name</p>
                  <MyInput
                    value={postRegStudent.userName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPostRegStudent({
                        ...postRegStudent,
                        userName: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className={s.input_block}>
                  <p>Email</p>
                  <MyInput
                    value={postRegStudent.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPostRegStudent({
                        ...postRegStudent,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className={s.input_block}>
                  <p>Password</p>
                  <MyInput
                    value={postRegStudent.passwordHash}
                    type="password"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPostRegStudent({
                        ...postRegStudent,
                        passwordHash: e.target.value,
                      });
                    }}
                  />
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
            
            className={s.form}
            id="form2"
            onSubmit={handleFormSubmit}
          >
            <h2 className={s.form__title}>Войти</h2>
            {isChecked ? (
              <>
                <div className={s.input_block}>
                  <p>Email</p>
                  <MyInput
                    value={postLoginUser.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPostLoginUser({
                        ...postLoginUser,
                        email: e.target.value,
                      });
                    }}
                  />
                  <span></span>
                </div>
                <div className={s.input_block}>
                  <p>Password</p>
                  <MyInput
                    type="password"
                    value={postLoginUser.passwordHash}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPostLoginUser({
                        ...postLoginUser,
                        passwordHash: e.target.value,
                      });
                    }}
                  />
                  <span></span>
                </div>
              </>
            ) : (
              <>
                <div className={s.input_block}>
                  <p>Email</p>
                  <MyInput
                    value={postStudent.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPostStudent({
                        ...postStudent,
                        email: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className={s.input_block}>
                  <p>Password</p>
                  <MyInput
                    type="password"
                    value={postStudent.passwordHash}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setPostStudent({
                        ...postStudent,
                        passwordHash: e.target.value,
                      });
                    }}
                  />
                </div>
              </>
            )}
            <div className={s.form_checkbox}>
              <Checkbox checked={isChecked} onChange={handleCheckbox1Change} />
              <h6> Ученик</h6>
              <Checkbox checked={!isChecked} onChange={handleCheckbox2Change} />
              <h6> Учитель</h6>
            </div>
            <a href="#" className={s.link} onClick={showModal}>
              Забыли свой пароль ?
            </a>
            <Modal
              open={isModalOpen}
              centered
              onCancel={handleCancel}
              footer={false}
            >
              <div className={s.modal_content}>
                <h2>Восстановить пароль</h2>
                <MyInput
                  value={postResetPassword.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setpostResetPassword({
                      ...postResetPassword,
                      email: e.target.value,
                    });
                  }}
                  placeholder="Email"
                />
                <Button onClick={() => resetPassword()} type="primary">
                  Восстановить пароль
                </Button>
              </div>
            </Modal>
            <button onClick={() => loginUsers()} className={s.btn}>
              Войти
            </button>
          </form>
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
