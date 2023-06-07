import { Button, Modal, message } from "antd";
import React, { useState } from "react";
import s from "./TeacherResetPassword.module.scss";
import MyInput from "../MyInput/MyInput";
import { useForm } from "react-hook-form";
import axios from "axios";

const TeacherResetPassword = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      let config = {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("token") as string),
        },
      };
      setIsSubmitting(true);
      await axios.put(
        "https://localhost:7090/Account/changePassword",
        data,
        config
      );
      message.success("Пароль успешно изменен.");
      setModal2Open(false);
      reset();
    } catch (error) {
      message.error("Не удалось сменить пароль. Пожалуйста, попробуйте снова.");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Button
        type="primary"
        style={{ width: "170px", marginTop: "10px" }}
        onClick={() => setModal2Open(true)}
      >
        Изменить пароль
      </Button>
      <Modal
        centered
        visible={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        footer={null}
      >
        <form className={s.user_modal} onSubmit={handleSubmit(onSubmit)}>
          <h2>Изменить пароль</h2>
          <MyInput
            placeholder="Email"
            {...register("email", {
               required: "Требуется электронная почта",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p className={s.error}>{String(errors.email.message)}</p>}
          <MyInput
            placeholder="Старый пароль"
            type="password"
            {...register("oldPassword", {
					required: "Требуется старый пароль",
            })}
          />
          {errors.oldPassword && <p className={s.error}>{String(errors.oldPassword.message)}</p>}
          <MyInput
            placeholder="Новый пароль"
            type="password"
            {...register("newPassword", {
					required: "Требуется новый пароль",
            })}
          />
          {errors.newPassword && <p className={s.error}>{String(errors.newPassword.message)}</p>}
          <MyInput
            placeholder="Подтверждение пароля"
            type="password"
            {...register("confirmPassword", {
					required: "Требуется подтвердить пароль",
              validate: (value) =>
                value === watch("newPassword") || "Пароли не совпадают",
            })}
          />
          {errors.confirmPassword && <p className={s.error}>{String(errors.confirmPassword.message)}</p>}
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Изменить пароль
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default TeacherResetPassword;
