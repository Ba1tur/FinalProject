import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import s from "./StudentLogin.module.scss";
import MyInput from "../MyInput/MyInput";
import { Button, Modal, message } from "antd";
import { useRouter } from "next/router";

interface RegistrationUser {
  email: string;
  passwordHash: string;
}

interface postResetPassword {
  email: string;
}

const StudentLogin = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationUser>();

  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await axios.post(
        "https://localhost:7090/StudentAccount/authorize",
        data
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", JSON.stringify(response.data.jwtToken));
      console.log(response);
      setTimeout(() => {
        router.push("/");
        setTimeout(() => {
          location.reload()
        }, 100)
      }, 4000);
      showMessage("success", "Успешно зашли свой аккаунт");
    } catch (error) {
      console.error(error);
      showMessage("error", "Нерпавильно велли email либо пароль");
    }
  });

  const postReset = async () => {
    try {
      const { data } = await axios.post(
        "https://localhost:7090/StudentAccount/resetPassword/",
        postResetPassword
      );
      showMessage("success", "Новый пароль был отправлен на вашу почту");
      console.log(data);
    } catch (err) {
      console.log(err);
      showMessage("error", "Нерпавильно велли email");
    }
  };

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

  const showMessage = (type: any, content: string) => {
    messageApi.open({
      type: type,
      content: content,
      duration: 10,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className={s.input_block}>
        <p>Email</p>
        <MyInput
          {...register("email", {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
        />
        {errors.email && errors.email.type === "required" && (
          <span className={s.error}>Это поле является обязательным!</span>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <span className={s.error}>Неверный адрес электронной почты</span>
        )}
      </div>
      <div className={s.input_block}>
        <p>Password</p>
        <MyInput
          type="password"
          {...register("passwordHash", { required: true })}
        />
        {errors.passwordHash && (
          <span className={s.error}>Это поле является обязательным!</span>
        )}
      </div>
      <Modal open={isModalOpen} centered onCancel={handleCancel} footer={false}>
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
          <Button onClick={() => postReset()} type="primary">
            Восстановить пароль
          </Button>
        </div>
      </Modal>
      <div className={s.form_block}>
        <a href="#" className={s.link} onClick={showModal}>
          Забыли свой пароль ?
        </a>
        {contextHolder}
        <button className={s.btn} type="submit">
          Войти
        </button>
      </div>
    </form>
  );
};

export default StudentLogin;
