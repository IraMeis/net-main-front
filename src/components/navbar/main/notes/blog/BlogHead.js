import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import AuthService from "../../../../../services/auth.service";
import roles from "../../../../../util/roles.json";

const BlogHead = () => {

    const [showNew, setShowNew] = useState(false);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setShowNew(user.roles.some(role => [
                roles.system.name,
                roles.post_modifier.name]
                .includes(role)));
        }
    });
    return (
        <div className="p-4 p-md-5 mb-4 text-black rounded ">
            <h1 className="display-4 fst-italic text-center">Some notes</h1>
            <p/>
            {showNew && (<nav className="navbar navbar-expand navbar-light justify-content-center">
                <div className="navbar-nav ">
                <Link to={`/note/post/new`} className="nav-link">
                   <em>Новый пост</em>
                </Link>
                </div>
            </nav>)}
        </div>
    );
};

export default BlogHead;