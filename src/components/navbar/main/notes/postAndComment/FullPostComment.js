//import React, { useState, useEffect } from "react";

//import UserService from "../services/user.service";
import PostUtil from "../post.util";
import Separator from "../../Separator";
import {useParams} from "react-router-dom";
import Comment from "../comment.util";
import NewComment from "./NewComment";

let responsePost =
    {
        id:1,
        header: "test header ---",
        content: "test content would recommend using Date.now() (with compatibility shim). It's slightly better because it's shorter & doesn't create a new Date object. However, if you don't want a shim & maximum compatibility, you could use the \"old\" method to get the timestamp in milliseconds",
        createdTimestamp: "2017-01-26"
    }

let responseComments =[{
    id:1,
    createdTimestamp:"2017-01-26",
    modifiedTimestamp :"2018-01-26",
    isDeleted: false,

    author:{value:1, label:"username"},
    postId:1,
    isModified: false,
    content:"eeedhfvjnfwpwoq"
},{
    id:1,
    createdTimestamp:"2017-01-26",
    modifiedTimestamp :"2018-01-26",
    isDeleted: false,

    author:{value:1, label:"username"},
    postId:1,
    isModified: true,
    content:"eeedhfvjnfwpwoq"
},{
    id:1,
    createdTimestamp:"2017-01-26",
    modifiedTimestamp :"2018-01-26",
    isDeleted: false,

    author:{value:1, label:"username"},
    postId:1,
    isModified: true,
    content:"eeedhfvjnfwpwoq"
}]

const FullPostComment = () => {
    const {id} = useParams();

    return (
        <div className="container">
            <Separator.SeparatorNarrow/>
            {/*{id}*/}
            {[responsePost].map(PostUtil.PostForPostComments)}
            <Separator.SeparatorNarrow/>
            {responseComments.map(Comment)}
            <Separator.SeparatorNarrow/>
            <NewComment/>
            <Separator.SeparatorWide/>
        </div>
    );
};

export default FullPostComment;