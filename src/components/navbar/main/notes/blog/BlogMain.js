import React, {useEffect, useState} from "react";
import PostUtil from "../post/post.util";
import NoteService from "../../../../../services/note.service";
import {Navigate} from "react-router-dom";

function Mapper (props){
    return (
        <div className="container">
            {props.response.map(PostUtil.PostForBlog)}
        </div>
    );
}

const BlogMain = () => {
    const [content, setContent] = useState([]);
    const [isErr, setIsErr] = useState(false);

    useEffect(() => {
      NoteService.getListBasedOnCurrentScope().then(
        (response) => {
          setContent(response.data);
        }).catch(
          (error) => {
          setIsErr(true);
          localStorage.setItem("error", JSON.stringify(error.message));
      });
    }, []);

    if (isErr === false)
        return (<Mapper response={content}/>);
    else
        return <Navigate to="/error" />
};

export default BlogMain;