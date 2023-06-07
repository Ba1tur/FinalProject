import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import s from "./Mentor.module.scss";
import MyInput from "@/components/MyInput/MyInput";
import { Button, Input, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

interface CourseData {
  categoryId: number;
  title: string;
  description: string;
  mentorId: number;
  formFile: File | null | string;
}

const Mentor: React.FC = () => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const [courseData, setCourseData] = useState<CourseData>({
    categoryId: 2,
    title: "",
    description: "",
    mentorId: 0,
    formFile: null,
  });

  const [messageApi, contextHolder] = message.useMessage();

  const showMessage = (type: any, content: string) => {
    messageApi.open({
      type: type,
      content: content,
      duration: 10,
    });
  };

  useEffect(() => {
    setCourseData((prevData) => ({
      ...prevData,
      mentorId: user?.id,
    }));
  }, [user]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target;

    if (name === "formFile" && files && files.length > 0) {
      const file = files[0];
      setCourseData((prevData) => ({
        ...prevData,
        formFile: URL.createObjectURL(file),
      }));
    } else {
      setCourseData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCreateCourse = async () => {
    try {
      const formData = new FormData();
      formData.append("categoryId", courseData.categoryId.toString());
      formData.append("title", courseData.title);
      formData.append("description", courseData.description);
      formData.append("mentorId", courseData.mentorId.toString());
      if (typeof courseData.formFile === "string") {
        // Convert URL back to a file object if it is a string
        const response = await fetch(courseData.formFile);
        const blob = await response.blob();
        const file = new File([blob], "filename.jpg", { type: "image/jpeg" });
        formData.append("formFile", file);
      } else if (courseData.formFile) {
        formData.append("formFile", courseData.formFile);
      }

      const config = {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("token") as string),
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(
        "https://localhost:7090/Course/Create",
        formData,
        config
      );

      const { data } = response;
      showMessage("success", "Course created successfully!");

      // Handle the response data as needed
      console.log(data);
    } catch (error) {
      showMessage("error", "Failed to create course");
      console.error(error);
    }
  };

  return (
    <div className={s.mentor_section}>
      <div className={s.mentor_section__create_block}>
        <h1>Создать курс</h1>
        <h2>Выбор фотографии для курса</h2>
        <input
          type="file"
          name="formFile"
          accept="image/png, image/jpeg"
          onChange={handleInputChange}
        />
        {typeof courseData.formFile === "string" && (
          <img src={courseData.formFile} alt="Selected file" />
        )}
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
        <Button onClick={handleCreateCourse}>Создать</Button>
      </div>
    </div>
  );
};

export default Mentor;
