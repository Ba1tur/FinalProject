import React from "react";
import s from "./admin.module.scss";
import { Avatar, List } from "antd";
import { useSelector } from "react-redux";

const data = [
  {
    title: "Alex",
    email: "example@gmail.com",
    jobTitle: "Ментор",
    experience: "3 года",
    education: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
  },
  {
    title: "Alex",
    email: "example@gmail.com",
    jobTitle: "Ментор",
    experience: "3 года",
    education: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
  },
  {
    title: "Alex",
    email: "example@gmail.com",
    jobTitle: "Ментор",
    experience: "3 года",
    education: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
  },
  {
    title: "Alex",
    email: "example@gmail.com",
    jobTitle: "Ментор",
    experience: "3 года",
    education: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
  },
];

const studentData = [
  {
    userName: 'Akyl',
    email: 'example@gmail.com',
  },
  {
    userName: 'Akyl',
    email: 'example@gmail.com',
  },
  {
    userName: 'Akyl',
    email: 'example@gmail.com',
  },
  {
    userName: 'Akyl',
    email: 'example@gmail.com',
  },
]

const index: React.FC = () => {
  const mentors = useSelector((state) => console.log(state));

  return (
    <section className={s.admin_section}>
      <div className={s.admin_section_mentors}>
        <h3>Все менторы</h3>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
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
                      <h5>{item.title}</h5>
                    </div>
                    <div className={s.list_block}>
                      <h6>Email : </h6>
                      <h5>{item.email}</h5>
                    </div>
                    <div className={s.list_block}>
                      <h6>Работа : </h6>
                      <h5>{item.jobTitle}</h5>
                    </div>
                    <div className={s.list_block}>
                      <h6>Опыт : </h6>
                      <h5>{item.experience}</h5>
                    </div>
                    <div className={s.list_block}>
                      <h6>Образование:</h6>
                      <h5>{item.education}</h5>
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
      <div className={s.admin_section_students}>
        <h3>Все Студенты</h3>
        <List
          itemLayout="horizontal"
          dataSource={studentData}
          renderItem={(item, index) => (
            <List.Item>
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
                      <h5>{item.userName}</h5>
                    </div>
                    <div className={s.list_block}>
                      <h6>Email : </h6>
                      <h5>{item.email}</h5>
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </section>
  );
};

export default index;
