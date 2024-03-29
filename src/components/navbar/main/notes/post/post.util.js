import {Link, Navigate, useNavigate} from "react-router-dom";
import AuthService from "../../../../../services/auth.service";
import scopes from "../../../../../util/scopes.json"
import Separator from "../../Separator";
import React, {createContext, useContext, useState} from "react";
import NoteService from "../../../../../services/note.service";
import roles from "../../../../../util/roles.json";

const canEditPost = AuthService.getCurrentUser() &&
    AuthService.getCurrentUser()
    .roles.some(role => [
    roles.system.name,
    roles.post_modifier.name]
    .includes(role));

const PostParams = createContext(null);
const SearchPost = createContext(null);

const BarNoComment = () => {
    const data = useContext(PostParams);
    const [isErr, setIsErr] = useState(false);
    let navigate = useNavigate();
    localStorage.setItem("locationBack", JSON.stringify(window.location.pathname));
    function handleDelete () {
        NoteService.deletePost(data.id)
            .then(
                () => {
                    navigate(`/note`);
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
    if(canEditPost)
        return (
        <nav className=" navbar navbar-expand navbar-light" >
                <div className="navbar-nav ml-auto">
                    <Link to={`/note/post/edit/${data.id}`} className="nav-link">
                        Редактировать
                    </Link>
                    <Link to={`/#`} className="nav-link"
                          onClick ={() => handleDelete()}>
                        Удалить
                    </Link>
                </div>
        </nav>)
    else
        return <div/>;
}

const BarLinkComment = () => {
    const data = useContext(PostParams);
    const [isErr, setIsErr] = useState(false);
    let navigate = useNavigate();
    localStorage.setItem("locationBack", JSON.stringify(window.location.pathname));
    function handleDelete () {
        NoteService.deletePost(data.id)
            .then(
                () => {
                    navigate(`/note`);
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
        <nav className=" navbar navbar-expand navbar-light">

            <div className="navbar-nav">
                <Link to={`/note/post/${data.id}`} className="nav-link" >
                    Комментарии
                </Link>
            </div>
            {canEditPost && (<div className="navbar-nav ml-auto">
                <Link to={`/note/post/edit/${data.id}`} className="nav-link">
                    Редактировать
                </Link>
                <Link to={`/#`} className="nav-link"
                      onClick ={() => handleDelete()}>
                    Удалить
                </Link>
            </div>)}

        </nav>)
}

// const CommonBar=(props)=>{
//     const data = useContext(PostParams);
//     const [isErr, setIsErr] = useState(false);
//     let navigate = useNavigate();
//     function handleDelete () {
//         NoteService.deletePost(data.id)
//             .then(
//                 () => {
//                     navigate(`/note`);
//                     window.location.reload();
//                 })
//             .catch(
//                 (error) => {
//                     setIsErr(true);
//                     localStorage.setItem("error", JSON.stringify(error.message));
//                 });
//     };
//
//     if(isErr===true)
//         return <Navigate to="/error" />
//     else if (props.needComment===true)
//         return <BarLinkComment iid ="1" del={handleDelete()}/>
//     else return <BarNoComment iid ="2" del={handleDelete()}/>
// }

const BarSearch = () =>{
    const data = useContext(PostParams);
    const updateFunc = useContext(SearchPost).f;
    const updateResp = useContext(SearchPost).resp;

    function onDelChange(resp, id) {
        let copy = resp.slice();
        for(let i = 0; i < copy.length; i++) {
            if(resp[i].id===id) {
                resp[i].isDeleted = !resp[i].isDeleted;
                break;
            }
        }
        return copy;
    }

    let navigate = useNavigate();
    const [isErr, setIsErr] = useState(false);
    function handleDelete () {
        if (data && data.isDeleted) {
            NoteService.undeletePost(data.id)
                .then(
                    () => {
                        updateFunc(onDelChange(updateResp, data.id));
                    })
                .catch(
                    (error) => {
                        setIsErr(true);
                        localStorage.setItem("error", JSON.stringify(error.message));
                    });
        }
        else if (data && !data.isDeleted){
            NoteService.deletePost(data.id)
                .then(
                    () => {
                        updateFunc(onDelChange(updateResp, data.id));
                    })
                .catch(
                    (error) => {
                        setIsErr(true);
                        localStorage.setItem("error", JSON.stringify(error.message));
                    });
        }
    };

    const handleEdit = () => {
        navigate(`/note/post/edit/${data.id}`);
        window.location.reload();
    }

    const handleView = () => {
        navigate(`/note/post/${data.id}`);
        window.location.reload();
    }

    if(isErr===true)
        return <Navigate to="/error" />

    return (
        <div>
            <button type="button"
                    className="btn btn-outline-info float-left "
                    onClick ={handleView}
            >
                Перейти к просмотру статьи</button>
            <div className={"float-right"}>
                <button type="button"
                        className="btn btn-outline-secondary"
                        onClick ={handleEdit}
                >
                    Редактировать</button>
                <button type="button" className="btn btn-outline-dark border-0" disabled> </button>
                <button type="button"
                        className="btn btn-outline-secondary"
                        onClick ={() => handleDelete()}
                >
                    {data.isDeleted ? "Восстановить" : "Удалить"}</button>
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
            {/*<CommonBar needComment={true}/>*/}
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
                {/*<CommonBar needComment={true}/>*/}
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

const ButtonsPattern = (props) => {
  return (
      <div>
          <button type="button" className="btn btn-outline-secondary float-left "
          onClick={props.nch}>Отмена</button>
          <button type="button" className="btn btn-outline-info float-right "
          onClick={props.ch}>Готово</button>
      </div>
  );
}

const ScopesPattern = (props) => {
    return (
      <div className="form-group">
          <label htmlFor="exampleFormControlSelect">Область видимости</label>
          <select className="form-control w-25"
                  onChange={props.change}
                  value={props.scope}>
              <option value={scopes.p1.code}>{scopes.p1.visual}</option>
              <option value={scopes.p2.code}>{scopes.p2.visual}</option>
              <option value={scopes.p3.code}>{scopes.p3.visual}</option>
              <option value={scopes.p4.code}>{scopes.p4.visual}</option>
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

    const [content, setContent] = useState(data.content);
    const onChangeContent = (e) => {
        const content = e.target.value;
        setContent(content);
    };

    const [scope, setScope] = useState(data.scope.value);
    const onChangeScope = (e) => {
        const sc = e.target.value;
        setScope(sc);
    }

    const [isErr, setIsErr] = useState(false);

    let navigate = useNavigate();
    let locationBack=JSON.parse(localStorage.getItem("locationBack"));

    const handleChanges = () => {
        localStorage.removeItem("locationBack");
        NoteService.update({id:data.id, content, header, scope:{value:scope}})
            .then(
            () => {
                navigate(locationBack);
                window.location.reload();
            })
            .catch(
            (error) => {
                setIsErr(true);
                localStorage.setItem("error", JSON.stringify(error.message));
            });

    };

    const handleNoChanges = () => {
        navigate(locationBack);
    }

    if(isErr===true)
        return <Navigate to="/error" />

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
                <textarea className="md-textarea md-textarea-auto form-control"
                          placeholder="Текст"
                          rows="8"
                          onChange={onChangeContent}>
                    {content}
                </textarea>
            </div>

            <ScopesPattern scope={scope}
                           change={onChangeScope}/>

            <Separator.Separator1/>

            <ButtonsPattern ch={handleChanges}
                            nch={handleNoChanges}/>
        </div>
    );
}

const CreatablePost = () => {

    const [header, setHeader] = useState("");
    const onChangeHeader = (e) => {
        const h = e.target.value;
        setHeader(h);
    }

    const [content, setContent] = useState("");
    const onChangeContent = (e) => {
        const content = e.target.value;
        setContent(content);
    };

    const [scope, setScope] = useState(1);
    const onChangeScope = (e) => {
        const sc = e.target.value;
        setScope(sc);
    }

    const [isErr, setIsErr] = useState(false);
    let navigate = useNavigate();

    const handleChanges = () => {
        NoteService.create({content, header, scope:{value:scope}})
            .then(
                () => {
                    navigate("/note");
                    window.location.reload();
                })
            .catch(
                (error) => {
                    setIsErr(true);
                    localStorage.setItem("error", JSON.stringify(error.message));
                });
    };

    const handleNoChanges = () => {
        navigate("/note");
    }

    if(isErr===true)
        return <Navigate to="/error" />

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
                <textarea className="md-textarea md-textarea-auto form-control"
                          placeholder="Текст"
                          rows="8"
                          onChange={onChangeContent}>
                    {content}
                </textarea>
            </div>

            <ScopesPattern scope={scope}
                           change={onChangeScope}/>

            <Separator.Separator1/>

            <ButtonsPattern ch={handleChanges}
                            nch={handleNoChanges}/>
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

const GetSearchPostWithParams = (props) => {
    return (
        <SearchPost.Provider value={props}>
                <Separator.Separator4/>
                <div className={"jumbotron bg-light"}>
                    <h4 className={"text-center"}>Search result</h4>
                    {props.resp.length === 0 ?
                        <p className={"text-center"}>No content with current search parameters found</p> :
                        props.resp.map(PostForSearch)}
                </div>
        </SearchPost.Provider>);
}

const PostUtil = {
    PostForPostComments,
    PostForBlog,
    PostForUpdate,
    PostForCreate,
    PostForSearch,
    GetSearchPostWithParams
}

export default PostUtil;
