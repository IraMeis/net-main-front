import AuthService from "../../../../../services/auth.service";
import React, {createContext, useContext, useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import Separator from "../../Separator";
import CommentService from "../../../../../services/comment.service";

const user = AuthService.getCurrentUser();

const CommentParams = createContext(null);

const CommentView = () => {
    const data = useContext(CommentParams);
    const [isErr, setIsErr] = useState(false);
    let navigate = useNavigate();
    function handleDelete () {
        console.log(data.id)
        CommentService.deleteComment(data.id)
            .then(
                () => {
                    navigate(window.location.pathname);
                    window.location.reload();
                })
            .catch(
                (error) => {
                    setIsErr(true);
                    localStorage.setItem("error", JSON.stringify(error.message));
                });
    };

    if(isErr===true)
        return <Navigate to="/error" />
    return (
        <div className="row g-5">
            <div className="col-md-1"/>

            <div className="jumbotron col-md-3 text-center">
                <h5><dt>{data.author.label}</dt></h5>
                <hr/>

                <nav className="navbar navbar-text navbar-light center-block">
                    <div className="navbar-nav">
                        <small>
                            <Link to={`/note/comment/edit/${data.id}`} className="nav-link" props ={data}>
                                Редактировать
                            </Link>
                            <Link to={window.location.pathname} className="nav-link"
                                  onClick ={() => handleDelete()}>
                                Удалить
                            </Link>
                        </small>
                    </div>
                </nav>

            </div>

            <div className="jumbotron bg-light col-md-7">
                <div>{data.createdTimestamp}</div>
                <hr/>
                <div>{data.content}</div>
                <div className="col d-flex justify-content-end">
                    {data.isModified &&(<em>Изменено {data.modifiedTimestamp} </em>)}
                </div>
                {data.isDeleted &&
                (<div className="col d-flex justify-content-end">
                    {data.isModified &&(<em>Данный комментарий был удален </em>)}
                </div>)}
            </div>
        </div>
    );
}

const UpdatableComment = () => {
    const data = useContext(CommentParams);

    const [isErr, setIsErr] = useState(false);
    const [content, setContent] = useState(data.content);
    const onChangeContent = (e) => {
        const content = e.target.value;
        setContent(content);
    };

    let navigate = useNavigate();
    let locationPost = JSON.parse(localStorage.getItem("locationPost"));
   // localStorage.removeItem("locationPost");

    const handleChanges = () => {
        CommentService.update({id:data.id, content})
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
    };

    const handleNoChanges = () => {
        navigate(locationPost);
    }

    if(isErr===true)
        return <Navigate to="/error" />
    return (
        <div className="jumbotron bg-light">

            <div className="input-large">
                <textarea className="md-textarea md-textarea-auto form-control"
                          placeholder="Текст"
                          rows="4"
                          onChange={onChangeContent}>
                    {content}
                </textarea>
            </div>

            <Separator.Separator2/>

            <div>
                <button type="button" className="btn btn-outline-secondary float-left "
                onClick={handleNoChanges}>Отмена</button>
                <button type="button" className="btn btn-outline-info float-right "
                onClick={handleChanges}>Готово</button>
            </div>

        </div>
    );
}

const Comment = (props) => {
    return (
        <CommentParams.Provider value={props}>
            <CommentView/>
        </CommentParams.Provider>
    );
}

const CommentForUpdate = (props) => {
    return (
        <CommentParams.Provider value={props}>
            <UpdatableComment/>
        </CommentParams.Provider>
    );
}

const CommentUtil ={
    Comment,
    CommentForUpdate
}

export default CommentUtil;