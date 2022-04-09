//import React, { useState, useEffect } from "react";

//import UserService from "../services/user.service";

import {useParams} from "react-router-dom";

const FullPostComment = () => {
    const {id} = useParams();
    return (
        <div className="container">
            <header className="jumbotron">
                {/*<p>{props.id}</p>*/}
                <h3>{id} aaaaaaaaaaaaaaaaaaaaaaaaa</h3>
            </header>
        </div>
    );
};

export default FullPostComment;