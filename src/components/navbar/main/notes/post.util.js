import {Link} from "react-router-dom";
import AuthService from "../../../../services/auth.service";
import Separator from "../Separator";
import {createContext, useContext} from "react";

const user = AuthService.getCurrentUser();

const PostParams = createContext(null);

const Bar = () =>{
    const data = useContext(PostParams);
    return (
        <nav className=" navbar navbar-expand navbar-light">
            {/*<div className="navbar-nav">*/}

                <div className="navbar-nav">
                    <Link to={`/note/${data.id}`} className="nav-link" >
                        Комментарии
                    </Link>
                </div>
                <div className="navbar-nav ml-auto">
                    <Link to={`/note/edit/${data.id}`} className="nav-link" >
                        Редактировать
                    </Link>
                    <Link to={`/note/edit/${data.id}`} className="nav-link" >
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

const PostAndBar = () => {
    const data = useContext(PostParams);
    return (
        <article className="blog-post">
                <h2 className="blog-post-title">{data.header}</h2>
                <p className="blog-post-meta">{data.createdTimestamp}</p>
                <hr/>
                <p>{data.content}</p>
                <hr/>
                <Bar/>
        </article>
    );
}

const PostWithoutBar = () => {
    const data = useContext(PostParams);
    return (
        <article className="blog-post">
            <div className="jumbotron">
                <h2 className="blog-post-title">{data.header}</h2>
                <p className="blog-post-meta">{data.createdTimestamp}</p>
                <hr/>
                <p>{data.content}</p>
                <hr/>
            </div>
        </article>
    );
}

const PostWithBar = (props) => {
    return (
        <PostParams.Provider value={props}>
            <PostAndBar/>
            <Separator.SeparatorWide/>
        </PostParams.Provider>
    );
}

const Post = (props) => {
    return (
        <PostParams.Provider value={props}>
            <PostWithoutBar/>
        </PostParams.Provider>
    );
}

const PostUtil = {
    Post,
    PostWithBar
}

export default PostUtil;
