import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import s from "./TeacherForm.module.scss";
import MyInput from "../MyInput/MyInput";
import { message } from "antd";
import { useRouter } from "next/router";

interface RegistrationUser {
  userName: string;
  email: string;
  passwordHash: string;
  jobTitle: string;
  experience: string;
  education: string;
}

const TeacherForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationUser>();

  const [messageApi, contextHolder] = message.useMessage();

  const router = useRouter()

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await axios.post(
        "https://localhost:7090/Account/register",
        data
      );
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", JSON.stringify(response.data.jwtToken));
      if (response.data.isSuccess === true) {
        showMessage("success", "Подветдите свой аккаунт в почте");
      }else{
        showMessage("error", "Пользователь с таким email уже существует");
      }
      setTimeout(() => {
        router.push("/");
        setTimeout(() => {
          location.reload()
        }, 100)
      }, 4000);
    } catch (error) {
      console.error(error);
      showMessage("error", "Регистрация не прошла");
    }
  });

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
        <p>Name</p>
        <MyInput {...register("userName", { required: true })} />
        {errors.userName && (
          <span className={s.error}>Это поле является обязательным!</span>
        )}
      </div>
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
      <div className={s.input_block}>
        <p>JobTitle</p>
        <MyInput {...register("jobTitle", { required: true })} />
        {errors.jobTitle && (
          <span className={s.error}>Это поле является обязательным!</span>
        )}
      </div>
      <div className={s.input_block}>
        <p>Experience</p>
        <MyInput {...register("experience", { required: true })} />
        {errors.experience && (
          <span className={s.error}>Это поле является обязательным!</span>
        )}
      </div>
      <div className={s.input_block}>
        <p>Education</p>
        <MyInput {...register("education", { required: true })} />
        {errors.education && (
          <span className={s.error}>Это поле является обязательным!</span>
        )}
      </div>
      {contextHolder}
      <button className={s.btn} type="submit">
        Зарегистрироваться
      </button>
    </form>
  );
};

export default TeacherForm;
