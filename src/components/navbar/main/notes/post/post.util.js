import {Link} from "react-router-dom";
import AuthService from "../../../../../services/auth.service";
import Separator from "../../Separator";
import React, {createContext, useContext, useState} from "react";

const user = AuthService.getCurrentUser();

const PostParams = createContext(null);

const BarNoComment = () =>{
    const data = useContext(PostParams);
    return (
        <nav className=" navbar navbar-expand navbar-light">
                <div className="navbar-nav ml-auto">
                    <Link to={`/note/post/edit/${data.id}`} className="nav-link" >
                        Редактировать
                    </Link>
                    <Link to={`/#`} className="nav-link" >
                        Удалить
                    </Link>
                </div>
        </nav>)
}

const BarLinkComment = () =>{
    const data = useContext(PostParams);
    return (
        <nav className=" navbar navbar-expand navbar-light">
            {/*<div className="navbar-nav">*/}

            <div className="navbar-nav">
                <Link to={`/note/post/${data.id}`} className="nav-link" >
                    Комментарии
                </Link>
            </div>
            <div className="navbar-nav ml-auto">
                <Link to={`/note/post/edit/${data.id}`} className="nav-link" >
                    Редактировать
                </Link>
                <Link to={`/#`} className="nav-link" >
                    Удалить
                </Link>
            </div>
            {/*{user.roles.some(role =>["system","post_modifier"].includes(role)) &&*/}
            {/*(<Link to={`/note/${props.id}`} className="nav-link" >*/}
            {/*    Редактировать*/}
            {/*</Link>)*/}
            {/*}*/}

            {/*</div>*/}
        </nav>)
}

const PostAndBarLinkComment = () => {
    const data = useContext(PostParams);
    return (
        <article className="blog-post">
                <h2 className="blog-post-title">{data.header}</h2>
                <p className="blog-post-meta">{data.createdTimestamp}</p>
                <hr/>
                <p>{data.content}</p>
                <hr/>
                <BarLinkComment/>
        </article>
    );
}

const PostAndBarNoComment = () => {
    const data = useContext(PostParams);
    return (
        <article className="blog-post">
            <div className="jumbotron">
                <h2 className="blog-post-title">{data.header}</h2>
                <p className="blog-post-meta">{data.createdTimestamp}</p>
                <hr/>
                <p>{data.content}</p>
                <hr/>
                <BarNoComment/>
            </div>
        </article>
    );
}

const UpdatablePost = () => {
    const data = useContext(PostParams);

    const [header, setHeader] = useState(data.header);
    const onChangeHeader = (e) => {
        const h = e.target.value;
        setHeader(h);
    }

    return (
        <div className="jumbotron bg-light">

            <h5 className="float-right"><em>Дата создания {data.createdTimestamp}</em></h5>
            <p/>

            <div className="form-group">
                {/*<h5 className="text-center">Заголовок</h5>*/}
                <input type="text"
                       value={header}
                       className="form-control form-control-lg"
                       onChange={onChangeHeader}/>
            </div>
            <div className="input-large">
                {/*<h5 className="text-center">Текст</h5>*/}
                <textarea className="md-textarea md-textarea-auto form-control" placeholder="Текст" rows="8">
                    {data.content}</textarea>
            </div>

            <div className="form-group">
                <label htmlFor="exampleFormControlSelect">Область видимости</label>
                <select className="form-control w-25">
                    <option>1 - private</option>
                    <option>2 - trusted</option>
                    <option>3 - viewers</option>
                    <option>4 - public</option>
                </select>
            </div>

            <Separator.Separator1/>

            <div>
                <button type="button" className="btn btn-outline-secondary float-left ">Отмена</button>
                <button type="button" className="btn btn-outline-info float-right ">Готово</button>
            </div>

        </div>
    );
}

const CreatablePost = () => {

    const [header, setHeader] = useState("");
    const onChangeHeader = (e) => {
        const h = e.target.value;
        setHeader(h);
    }

    return (
        <div className="jumbotron bg-light">

            <div className="form-group">
                {/*<h5 className="text-center">Заголовок</h5>*/}
                <input type="text"
                       value={header}
                       className="form-control form-control-lg"
                       placeholder="Заголовок"
                       onChange={onChangeHeader}/>
            </div>
            <div className="input-large">
                {/*<h5 className="text-center">Текст</h5>*/}
                <textarea className="md-textarea md-textarea-auto form-control" placeholder="Текст" rows="8">
                </textarea>
            </div>

            <div className="form-group">
                <label htmlFor="exampleFormControlSelect">Область видимости</label>
                <select className="form-control w-25">
                    <option>1 - private</option>
                    <option>2 - trusted</option>
                    <option>3 - viewers</option>
                    <option>4 - public</option>
                </select>
            </div>

            <Separator.Separator1/>

            <div>
                <button type="button" className="btn btn-outline-secondary float-left ">Отмена</button>
                <button type="button" className="btn btn-outline-info float-right ">Готово</button>
            </div>

        </div>
    );
}

const PostForBlog = (props) => {
    return (
        <PostParams.Provider value={props}>
            <PostAndBarLinkComment/>
            <Separator.Separator4/>
        </PostParams.Provider>
    );
}

const PostForPostComments = (props) => {
    return (
        <PostParams.Provider value={props}>
            <PostAndBarNoComment/>
        </PostParams.Provider>
    );
}

const PostForUpdate = (props) => {
    return (
        <PostParams.Provider value={props}>
            <UpdatablePost/>
        </PostParams.Provider>
    );
}

const PostForCreate = () => {
    return (<CreatablePost/>);
}

const PostUtil = {
    PostForPostComments,
    PostForBlog,
    PostForUpdate,
    PostForCreate
}

export default PostUtil;
