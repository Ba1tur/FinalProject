import { Button, Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import s from "./TeacherUpdate.module.scss";
import MyInput from "../MyInput/MyInput";
import { useForm } from "react-hook-form";
import axios from "axios";

const TeacherUpdate = () => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const [modal2Open, setModal2Open] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      const userId = user.id;
      data.id = userId;

      let config = {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("token") as string),
        },
      };
      setIsSubmitting(true);
      await axios.put(
        "https://localhost:7090/Account/Update",
        data,
        config
      );
      message.success("Профиль успешно изменен.");
      setModal2Open(false);
      reset();
    } catch (error) {
      message.error("Не удалось изменить профиль. Пожалуйста, попробуйте снова.");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Button
        type="default"
        style={{ width: "170px", marginTop: "10px" }}
        onClick={() => setModal2Open(true)}
      >
        Изменить профиль
      </Button>
      <Modal
        centered
        visible={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
        footer={null}
      >
        <form className={s.user_modal} onSubmit={handleSubmit(onSubmit)}>
          <h2>Редактирование профиля</h2>
          <MyInput
            placeholder="JobTitle"
            {...register("jobTitle", { required: true })}
          />
          {errors.jobTitle && (
            <span className={s.error}>Это поле является обязательным!</span>
          )}
          <MyInput
            placeholder="experince"
            {...register("experience", { required: true })}
          />
          {errors.experience && (
            <span className={s.error}>Это поле является обязательным!</span>
          )}
          <MyInput
            placeholder="education"
            {...register("education", { required: true })}
          />
          {errors.education && (
            <span className={s.error}>Это поле является обязательным!</span>
          )}
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Изменить профиль
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default TeacherUpdate;
