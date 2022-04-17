import {Link} from "react-router-dom";
import AuthService from "../../../../../services/auth.service";
import scopes from "../../../../../util/scopes.json"
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

const BarSearch = () =>{
    const data = useContext(PostParams);
    return (
        <div>
            <button type="button" className="btn btn-outline-info float-left ">Перейти к просмотру статьи</button>
            <div>
                <button type="button" className="btn btn-outline-secondary float-right">Редактировать</button>
                <button type="button" className="btn btn-outline-dark float-right border-0" disabled> </button>
                <button type="button" className="btn btn-outline-secondary float-right">Удалить</button>
            </div>
        </div>
    )
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

const PostSearch = () => {
    const data = useContext(PostParams);
    return (
        <div>
            <Separator.Separator4/>
            <Separator.Separator2/>
            <h5>Meta info:</h5>
            <hr/>
            <p> <strong>Id:</strong> {data.id}</p>
            <p> <strong>UUID:</strong> {data.uuid}</p>
            <p className="blog-post-meta"> <strong>Created at</strong> {data.createdTimestamp}</p>
            <p className="blog-post-meta"> <strong>Last time modified at</strong> {data.modifiedTimestamp}</p>
            <Separator.Separator1/>
            <h5>Post-editable info:</h5>
            <hr/>
            <p> <strong>Is deleted:</strong> {data.isDeleted ? "yes": "no"}</p>
            <p> <strong>Scope:</strong> {data.scope.value} ({data.scope.label})</p>
            <p className="blog-post-title"> <strong>Title:</strong> {data.header}</p>
            <p className="blog-post-meta"> <strong>Content:</strong> {data.content.substring(0, 200)}...</p>
            <hr/>
            <BarSearch/>
        </div>
    );
}

const ButtonsPattern = () => {
  return (
      <div>
          <button type="button" className="btn btn-outline-secondary float-left ">Отмена</button>
          <button type="button" className="btn btn-outline-info float-right ">Готово</button>
      </div>
  );
}

const ScopesPattern = () => {
  return (
      <div className="form-group">
          <label htmlFor="exampleFormControlSelect">Область видимости</label>
          <select className="form-control w-25">
              <option>{scopes.p1.visual}</option>
              <option>{scopes.p2.visual}</option>
              <option>{scopes.p3.visual}</option>
              <option>{scopes.p4.visual}</option>
          </select>
      </div>
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
                <input type="text"
                       value={header}
                       className="form-control form-control-lg"
                       onChange={onChangeHeader}/>
            </div>

            <div className="input-large">
                <textarea className="md-textarea md-textarea-auto form-control" placeholder="Текст" rows="8">
                    {data.content}
                </textarea>
            </div>

            <ScopesPattern/>
            <Separator.Separator1/>
            <ButtonsPattern/>
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
                <input type="text"
                       value={header}
                       className="form-control form-control-lg"
                       placeholder="Заголовок"
                       onChange={onChangeHeader}/>
            </div>

            <div className="input-large">
                <textarea className="md-textarea md-textarea-auto form-control" placeholder="Текст" rows="8">
                </textarea>
            </div>

            <ScopesPattern/>
            <Separator.Separator1/>
            <ButtonsPattern/>
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

const PostForSearch = (props) => {
    return (
        <PostParams.Provider value={props}>
            <PostSearch/>
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
    PostForCreate,
    PostForSearch
}

export default PostUtil;
