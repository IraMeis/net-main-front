import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const About = () => {
  // const [content, setContent] = useState("");
  //
  // useEffect(() => {
  //   UserService.getPublicContent().then(
  //     (response) => {
  //       setContent(response.data);
  //     },
  //     (error) => {
  //       const _content =
  //         (error.response && error.response.data) ||
  //         error.message ||
  //         error.toString();
  //
  //       setContent(_content);
  //     }
  //   );
  // }, []);
  //
  // return (
  //   <div className="container">
  //     <header className="jumbotron">
  //       <h3>{content}</h3>
  //     </header>
  //   </div>
  // );
  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Проект в процессе разработки</h3>
          <p>Когда-нибудь здесь появится описание и ссылка на api</p>
      </header>
    </div>
  );
};

export default About;
