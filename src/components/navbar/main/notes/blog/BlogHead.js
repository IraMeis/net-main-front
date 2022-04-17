import React from "react";
import {Link} from "react-router-dom";


const BlogHead = () => {
    return (
        <div className="p-4 p-md-5 mb-4 text-black rounded ">
            <h1 className="display-4 fst-italic text-center">Some notes</h1>
            <p/>
            <nav className="navbar navbar-expand navbar-light justify-content-center">
                <div className="navbar-nav ">
                <Link to={`/note/post/new`} className="nav-link">
                   <em>Новый пост</em>
                </Link>
                </div>
            </nav>
        </div>
    );
};

export default BlogHead;