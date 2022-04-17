import AuthService from "../../../../../services/auth.service";
import React, {createContext, useContext, useState} from "react";
import {Link} from "react-router-dom";
import Separator from "../../Separator";

const user = AuthService.getCurrentUser();

const CommentParams = createContext(null);

const CommentView = () => {

    const data = useContext(CommentParams);

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
                            <Link to={`/#`} className="nav-link" >
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
                <div className="col d-flex justify-content-end">{data.isModified &&(<em>Изменено {data.modifiedTimestamp} </em>)}</div>
            </div>
            {/*<dl className="col-md-9">*/}
            {/*    <div className="row">*/}
            {/*        <dl className="col">at {data.createdTimestamp}</dl>*/}
            {/*        <dl className="col d-flex justify-content-end">{data.isModified &&(<em>Изменено {data.modifiedTimestamp} </em>)}</dl>*/}
            {/*    </div>*/}
            {/*    <hr/>*/}
            {/*    <dd>{data.content}</dd>*/}
            {/*</dl>*/}
        </div>
    );
}

const UpdatableComment = () =>{
    const data = useContext(CommentParams);

    return (
        <div className="jumbotron bg-light">

            <div className="input-large">
                {/*<h5 className="text-center">Текст</h5>*/}
                <textarea className="md-textarea md-textarea-auto form-control" placeholder="Текст" rows="4">
                    {data.content}
                </textarea>
            </div>

            <Separator.Separator2/>

            <div>
                <button type="button" className="btn btn-outline-secondary float-left ">Отмена</button>
                <button type="button" className="btn btn-outline-info float-right ">Готово</button>
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