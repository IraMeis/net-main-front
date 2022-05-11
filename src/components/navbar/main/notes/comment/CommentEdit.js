import {Navigate, useParams} from "react-router-dom";
import CommentUtil from "./comment.util";
import {useEffect, useState} from "react";
import CommentService from "../../../../../services/comment.service";

const CommentEdit = () => {
    const id = useParams().id;
    const [comment, setComment] = useState([]);
    const [isErr, setIsErr] = useState(false);

    useEffect(() => {
        CommentService.getCommentByCommentId(id).then(
            (response) => {
                setComment([response.data]);
            }).catch(
            (error) => {
                setIsErr(true);
                localStorage.setItem("error", JSON.stringify(error.message));
            });
    }, []);

    if(isErr===true)
        return <Navigate to="/error" />

    return (
        <div className="container">
            {comment.map(CommentUtil.CommentForUpdate)}
        </div>
    );
}

export default CommentEdit;