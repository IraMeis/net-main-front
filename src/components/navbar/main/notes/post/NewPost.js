import PostUtil from "../post/post.util";
import Separator from "../../Separator";
import {useParams} from "react-router-dom";

let responsePost =
    {
        id:1,
        header: "test header ---",
        content: "test content would recommend using Date.now() (with compatibility shim). It's slightly better because it's shorter & doesn't create a new Date object. However, if you don't want a shim & maximum compatibility, you could use the \"old\" method to get the timestamp in milliseconds",
        createdTimestamp: "2017-01-26",
        scope:{value:2, label:"private"}
    }

const NewPost = () => {
    const {id} = useParams();

    return (
        <div className="container">
            <Separator.Separator1/>
            {PostUtil.PostForCreate()}
        </div>
    );
};

export default NewPost;