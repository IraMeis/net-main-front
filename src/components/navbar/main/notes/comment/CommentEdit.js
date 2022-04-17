import {useParams} from "react-router-dom";
import CommentUtil from "./comment.util";

let responseComment ={
    id:1,
    createdTimestamp:"2017-01-26",
    modifiedTimestamp :"2018-01-26",
    isDeleted: false,

    author:{value:1, label:"username"},
    postId:1,
    isModified: false,
    content:"eeedhfvjnfwpwoq"
}

const CommentEdit = () => {
    const {id} = useParams();

    return (
        <div className="container">
            {/*<Separator.SeparatorNarrow/>*/}
            {/*{id}*/}
            {[responseComment].map(CommentUtil.CommentForUpdate)}
            {/*<Separator.SeparatorNarrow/>*/}

        </div>
    );
}

export default CommentEdit;