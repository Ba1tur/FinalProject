import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import s from './StudentForm.module.scss';
import MyInput from '../MyInput/MyInput';
import { message } from 'antd';
import { useRouter } from 'next/router';

interface RegistrationUser {
  userName: string;
  email: string;
  passwordHash: string;
}

const StudentForm = () => {
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
        'https://localhost:7090/StudentAccount/register',
        data
      );
      console.log(response.data);
      showMessage("success", "Подвертитие свой аккаунт в почте");
      localStorage.setItem("token", JSON.stringify(response.data.jwtToken));
      localStorage.setItem("user", JSON.stringify(response.data));
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
        <MyInput {...register('userName', { required: true })} />
        {errors.userName && <span className={s.error}>Это поле является обязательным!</span>}
      </div>
      <div className={s.input_block}>
        <p>Email</p>
        <MyInput
          {...register('email', {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
        />
        {errors.email && errors.email.type === 'required' && (
          <span className={s.error}>Это поле является обязательным!</span>
        )}
        {errors.email && errors.email.type === 'pattern' && (
          <span className={s.error}>Неверный адрес электронной почты</span>
        )}
      </div>
      <div className={s.input_block}>
        <p>Password</p>
        <MyInput
          type="password"
          {...register('passwordHash', { required: true })}
        />
        {errors.passwordHash && <span className={s.error}>Это поле является обязательным!</span>}
      </div>
      {contextHolder}
      <button className={s.btn} type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default StudentForm;
