import React, { useEffect, useState } from "react";
import axios from "axios";
import s from "./Mentor.module.scss";
import MyInput from "@/components/MyInput/MyInput";
import { Button, Input } from "antd";
import MyBtn from "@/components/MyBtn/MyBtn";
import { useDispatch } from "react-redux";
import { createCourse } from "@/redux/reducers/createCourse";

const { TextArea } = Input;

const Mentor = () => {
  const [user, setUser] = useState<any>();

  const dispatch = useDispatch()

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    mentorId: null,
  });

  useEffect(() => {
    setCourseData((prevData) => ({
      ...prevData,
      mentorId: user?.id,
    }));
  }, [user]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  


  return (
    <div className={s.mentor_section}>
      <div className={s.mentor_section__create_block}>
        <h1>Создать курс</h1>
        <MyInput
          placeholder="Название"
          name="title"
          value={courseData.title}
          onChange={handleInputChange}
        />
        <TextArea
          rows={5}
          placeholder="Описание"
          name="description"
          value={courseData.description}
          onChange={handleInputChange}
        />
        <Button onClick={() => postcreateCource()}>
          Создать
        </Button>
      </div>
    </div>
  );
};

export default Mentor;
