import PostUtil from "../post/post.util";
import Separator from "../../Separator";
import {Navigate, useParams} from "react-router-dom";
import CommentUtil from "../comment/comment.util";
import NewComment from "./NewComment";
import React, {useEffect, useState} from "react";
import NoteService from "../../../../../services/note.service";
import ErrorPattern from "../../../../ErrorPattern";
import CommentService from "../../../../../services/comment.service";

const FullPostComment = () => {
    const params = useParams();
    const id = params.id;

    const [post, setPost] = useState([]);
    const [comments, setComments] = useState([]);

    const [isErrP, setIsErrP] = useState(false);
    const [isErrC, setIsErrC] = useState(false);

    useEffect(() => {
        NoteService.getPostById(id).then(
            (response) => {
                setPost([response.data]);
            }).catch(
            (error) => {
                setIsErrP(true);
                localStorage.setItem("error", JSON.stringify(error.message));
            });
    }, []);

    useEffect(() => {
        CommentService.getCommentsByPostId(id).then(
            (response) => {
                setComments(response.data);
            }).catch(
            () => {
                setIsErrC(true);
            });
    }, []);

    localStorage.setItem("locationPost", JSON.stringify(window.location.pathname));

     if (isErrP === false && isErrC === false){
        return (
        <div className="container">
            <Separator.Separator1/>
            {post.map(PostUtil.PostForPostComments)}
            {comments.map(CommentUtil.Comment)}
            <Separator.Separator1/>
            <NewComment/>
            <Separator.Separator4/>
        </div>
    );
    }
    else if (isErrP === false)
        return (
            <div className="container">
                <Separator.Separator1/>
                {[post].map(PostUtil.PostForPostComments)}
                <Separator.Separator1/>
                <ErrorPattern message={"Comments are not available now"}/>
                <Separator.Separator2/>
            </div>
        );
    else
        return <Navigate to="/error" />
};

export default FullPostComment;