import AuthService from "../../../../../services/auth.service";

const user = AuthService.getCurrentUser();

const NewComment = () => {

    return (
        <div className="input-large">
            <textarea className="form-control" placeholder="Текст комментария"/>
            <p/>
            <button type="button" className="btn btn-outline-info float-right">Комментировать</button>
        </div>
    );
}

export default NewComment;