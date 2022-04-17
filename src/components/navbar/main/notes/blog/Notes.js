import React, { useState, useEffect } from "react";

import UserService from "../../../../../services/user.service";
import EventBus from "../../../../../common/EventBus";
import BlogMain from "./BlogMain";
import BlogHead from "./BlogHead";
import Separator from "../../Separator";

const Notes = () => {
  // const [content, setContent] = useState("");
  //
  // useEffect(() => {
  //   UserService.getPublicContent().then(
  //     (response) => {
  //       setContent(response.data);
  //     },
  //     (error) => {
  //       const _content =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();
  //
  //       setContent(_content);
  //
  //       if (error.response && error.response.status === 401) {
  //         EventBus.dispatch("logout");
  //       }
  //     }
  //   );
  // }, []);

  return (
      <div>
          <Separator.Separator1/>
          <div className="jumbotron">
              <BlogHead/>
              <Separator.Separator2/>
              <BlogMain/>
          </div>
      </div>
  );
};

export default Notes;
