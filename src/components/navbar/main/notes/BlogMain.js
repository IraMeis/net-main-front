import React from "react";
import {Route, Routes, Link, Navigate} from "react-router-dom";
import FullPostComment from "./FullPostComment";
import About from "../About";
//import AuthService from "../../../services/auth.service";

let response = [
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

function PostPattern(props){
    return (
        <article className="blog-post">
            <h2 className="blog-post-title">{props.header}</h2>
            <p className="blog-post-meta">{props.createdTimestamp}</p>
            <hr/>
            <p>{props.content}</p>
            <hr/>
            <nav className="navbar navbar-light bg-white">
                <div className="navbar-nav">
                    <Link to={`/note/${props.id}`} className="nav-link" >
                        Комментарии
                    </Link>
                </div>
            </nav>
            <div className="p-4 p-md-5 mb-4"/>
        </article>
    );
}

function Mapper (props){
    return (
        <div className="container">
            {props.response.map(PostPattern)}
        </div>
    );
}

const BlogMain = () => {
    return (<Mapper response={response}/>);
};

export default BlogMain;