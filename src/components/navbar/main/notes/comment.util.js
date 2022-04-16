import AuthService from "../../../../services/auth.service";
import {createContext, useContext} from "react";
import {Link} from "react-router-dom";

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
                            <Link to={`/note/${data.id}`} className="nav-link" >
                                Редактировать
                            </Link>
                            <Link to={`/note/edit/${data.id}`} className="nav-link" >
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

const Comment = (props) => {
    return (
        <CommentParams.Provider value={props}>
            <CommentView/>
        </CommentParams.Provider>
    );
}

export default Comment;