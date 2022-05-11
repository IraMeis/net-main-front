import PostUtil from "../post/post.util";
import Separator from "../../Separator";
import NoteService from "../../../../../services/note.service";
import {Navigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const PostEdit = () => {
    const id = useParams().id;
    const [post, setPost] = useState([]);
    const [isErr, setIsErr] = useState(false);

    useEffect(() => {
        NoteService.getPostById(id).then(
            (response) => {
                setPost([response.data]);
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
            <Separator.Separator1/>
            {post.map(PostUtil.PostForUpdate)}
        </div>
    );
};

export default PostEdit;