import React from "react";
import {Link} from "react-router-dom";
import Separator from "../../Separator";

const BlogHead = () => {
    return (
        <div className="p-4 p-md-5 mb-4 text-black rounded ">
            {/*<div className="col-md-6 px-0">*/}
            <h1 className="display-4 fst-italic text-center">Some notes</h1>
            <p/>
            <nav className="navbar navbar-expand navbar-light justify-content-center">
                <div className="navbar-nav ">
                <Link to={`/note/post/new`} className="nav-link">
                   <em>Новый пост</em>
                </Link>
                </div>
            </nav>
            {/*</div>*/}
        </div>
    );
};

export default BlogHead;