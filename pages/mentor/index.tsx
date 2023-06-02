import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./Mentor.module.scss";
import MyInput from "@/components/MyInput/MyInput";
import { Button, Input } from "antd";
import { createCourse } from "@/redux/reducers/createCourse";
import MyBtn from "@/components/MyBtn/MyBtn";
// import { createCourse } from "@/store/courseSlice";

const { TextArea } = Input;

const Mentor = () => {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
	 mentorId: 1002,
  });

  const loading = useSelector((state) => state.course.loading);
  const error = useSelector((state) => state.course.error);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleCreateCourse = () => {
    dispatch(createCourse(courseData));
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
        <Button  onClick={handleCreateCourse} disabled={loading}>
          Создать
        </Button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Mentor;
