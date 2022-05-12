import PostUtil from "../post/post.util";
import Separator from "../../Separator";

const NewPost = () => {
    return (
        <div className="container">
            <Separator.Separator1/>
            {PostUtil.PostForCreate()}
        </div>
    );
};

export default NewPost;