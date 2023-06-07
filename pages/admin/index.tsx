import React, { useEffect, useState } from "react";
import s from "./admin.module.scss";
import { Avatar, Button, List, message } from "antd";
import axios from "axios";

interface Mentor {
  id: number;
  userName: string;
  email: string;
  jobTitle: string;
  experience: string;
  education: string;
}

interface Student {
  id: number;
  userName: string;
  email: string;
}

const Index: React.FC = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    getMentors();
    getStudents();
  }, []);

  const getMentors = async () => {
    try {
      let config = {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("token") as string),
        },
      };
      const res = await axios.get(
        "https://localhost:7090/Admin/getAllMentors",
        config
      );
      setMentors(res.data.mentors);
    } catch (err) {
      console.log(err);
    }
  };

  const getStudents = async () => {
    try {
      let config = {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("token") as string),
        },
      };
      const res = await axios.get(
        "https://localhost:7090/Admin/getAllStudents",
        config
      );
      setStudents(res.data.students);
    } catch (err) {
      console.log(err);
    }
  };

  const confirmMentor = async (mentorId: number) => {
    try {
      let config = {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("token") as string),
        },
      };
      const response = await axios.post(
        "https://localhost:7090/Admin/confirmMentor",
        { mentorId },
        config
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const promoteToAdmin = async (mentorId: number) => {
    try {
      let config = {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("token") as string),
        },
      };
      const response = await axios.post(
        "https://localhost:7090/Admin/promoteMentorToAdmin",
        { mentorId },
        config
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [messageApi, contextHolder] = message.useMessage();

  const deleteMentor = async (employeeId: number) => {
    try {
      let config = {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("token") as string),
          "Content-Type": "application/json",
        },
      };
      const requestBody = {
        employeeId: employeeId,
      };
      const response = await axios.delete(
        "https://localhost:7090/Admin/Delete-Mentor",
        {
          ...config,
          data: JSON.stringify(requestBody),
        }
      );
      getMentors();

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteStudent = async (studentId: number) => {
    try {
      let config = {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("token") as string),
          "Content-Type": "application/json",
        },
      };

      const requestBody = {
        studentId: studentId,
      };

      const response = await axios.delete(
        "https://localhost:7090/Admin/Delete-Student",
        {
          ...config,
          data: JSON.stringify(requestBody),
        }
      );
      getStudents();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // const deleteMentor = (mentorId: number) => {
  //   // Delete a mentor
  //   const updatedMentors = mentors.filter((mentor) => mentor.id !== mentorId);
  //   setMentors(updatedMentors);
  //   showMessage("success", "Успешно удалили ментора");
  //   console.log("Deleting mentor with ID:", mentorId);
  // };

  // const deleteStudent = (studentId: number) => {
  //   // Delete a student
  //   const updatedStudents = students.filter(
  //     (student) => student.id !== studentId
  //   );
  //   setStudents(updatedStudents);
  //   showMessage("success", "Успешно удалили студента");
  //   console.log("Deleting student with ID:", studentId);
  // };

  const showMessage = (type: any, content: string) => {
    messageApi.open({
      type: type,
      content: content,
      duration: 10,
    });
  };

  return (
    <section className={s.admin_section}>
      <div className={s.admin_section_mentors}>
        <h3>Все менторы</h3>
        {contextHolder}
        <List
          itemLayout="horizontal"
          dataSource={mentors}
          renderItem={(item) => {
            const { id, userName, email, jobTitle, experience, education } =
              item;
            return (
              <List.Item key={id}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      size={60}
                      src={`https://play-lh.googleusercontent.com/a/AItbvmnsjJkulsJJdEd95vyYEmMZTn7WJzmAEfc_DE0e=mo`}
                    />
                  }
                  title={
                    <div>
                      <div className={s.list_block}>
                        <h6>Имя : </h6>
                        <h5>{userName}</h5>
                      </div>
                      <div className={s.list_block}>
                        <h6>Email : </h6>
                        <h5>{email}</h5>
                      </div>
                      <div className={s.list_block}>
                        <h6>Работа : </h6>
                        <h5>{jobTitle}</h5>
                      </div>
                      <div className={s.list_block}>
                        <h6>Опыт : </h6>
                        <h5>{experience}</h5>
                      </div>
                      <div className={s.list_block}>
                        <h6>Образование:</h6>
                        <h5>{education}</h5>
                      </div>
                      <div className={s.list_block}>
                        <Button onClick={() => confirmMentor(item.id)}>
                          Подвердить ментора
                        </Button>
                        <Button onClick={() => deleteMentor(item.id)} danger>
                          Удалить ментора
                        </Button>
                      </div>
                      <div className={s.list_block}>
                        <Button danger onClick={() => promoteToAdmin(item.id)}>
                          Сделать Админом
                        </Button>
                      </div>
                    </div>
                  }
                />
              </List.Item>
            );
          }}
        />
      </div>
      <div className={s.admin_section_students}>
        <h3>Все Студенты</h3>
        <List
          itemLayout="horizontal"
          dataSource={students}
          renderItem={(item) => {
            const { id, userName, email } = item;
            return (
              <List.Item key={id}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      size={60}
                      src={`https://indico.un.org/event/1000996/registrations/8406/874232/avatar`}
                    />
                  }
                  title={
                    <div>
                      <div className={s.list_block}>
                        <h6>Имя : </h6>
                        <h5>{userName}</h5>
                      </div>
                      <div className={s.list_block}>
                        <h6>Email : </h6>
                        <h5>{email}</h5>
                      </div>
                      <div className={s.list_block}>
                        <Button onClick={() => deleteStudent(item.id)} danger>
                          Удалить студента
                        </Button>
                      </div>
                    </div>
                  }
                />
              </List.Item>
            );
          }}
        />
      </div>
    </section>
  );
};

export default Index;
