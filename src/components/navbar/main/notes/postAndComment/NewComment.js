import AuthService from "../../../../../services/auth.service";
import React, {useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import CommentService from "../../../../../services/comment.service";

//const user = AuthService.getCurrentUser();

const NewComment = (props) => {

    const [isErr, setIsErr] = useState(false);
    const [content, setContent] = useState("");
    const onChangeContent = (e) => {
        const content = e.target.value;
        setContent(content);
    };

    let navigate = useNavigate();
    let locationPost = JSON.parse(localStorage.getItem("locationPost"));

    function handleChanges () {
        if(content !== "") {
            CommentService.create({postId: props.postId, content})
                .then(
                    () => {
                        navigate(locationPost);
                        window.location.reload();
                    })
                .catch(
                    (error) => {
                        setIsErr(true);
                        localStorage.setItem("error", JSON.stringify(error.message));
                    });
        }
    };

    if(isErr === true)
        return <Navigate to="/error" />
    return (
        <div className="input-large">
            <textarea className="form-control"
                      placeholder="Текст комментария"
                      rows="4"
                      onChange={onChangeContent}>
                {content}
            </textarea>
            <p/>
            <button type="button"
                    className="btn btn-outline-info float-right"
                    onClick={ () => handleChanges()}>
                Комментировать
            </button>
        </div>
    );
}

export default NewComment;