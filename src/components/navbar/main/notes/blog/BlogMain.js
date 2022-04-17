import React from "react";
import {Route, Routes, Link, Navigate} from "react-router-dom";
import FullPostComment from "../postAndComment/FullPostComment";
import About from "../../About";
import PostUtil from "../post/post.util";
//import AuthService from "../../../services/auth.service";

const response = [
    {
        id:1,
        header: "test header ---",
        content: "test content would recommend using Date.now() (with compatibility shim). It's slightly better because it's shorter & doesn't create a new Date object. However, if you don't want a shim & maximum compatibility, you could use the \"old\" method to get the timestamp in milliseconds",
        createdTimestamp: "2017-01-26"
    },
    {
        id:12,
        header: "test header ---",
        content: "test content would recommend using Date.now() (with compatibility shim). It's slightly better because it's shorter & doesn't create a new Date object. However, if you don't want a shim & maximum compatibility, you could use the \"old\" method to get the timestamp in milliseconds",
        createdTimestamp: "2017-01-26"
    },
    {
        id:3,
        header: "test header ---",
        content: "test content would recommend using Date.now() (with compatibility shim). It's slightly better because it's shorter & doesn't create a new Date object. However, if you don't want a shim & maximum compatibility, you could use the \"old\" method to get the timestamp in milliseconds",
        createdTimestamp: "2017-01-26"
    },
    {
        id:16,
        header: "test header ---",
        content: "test content would recommend using Date.now() (with compatibility shim). It's slightly better because it's shorter & doesn't create a new Date object. However, if you don't want a shim & maximum compatibility, you could use the \"old\" method to get the timestamp in milliseconds",
        createdTimestamp: "2017-01-26"
    }];

function Mapper (props){
    return (
        <div className="container">
            {props.response.map(PostUtil.PostForBlog)}
        </div>
    );
}

const BlogMain = () => {
    return (<Mapper response={response}/>);
};

export default BlogMain;