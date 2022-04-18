import Separator from "../Separator";

const SimplePostMapper = (props) => {
    return(
        props.pairs.map((pair, index) =>
            <li key={index}>
                <p/>
                <div>Id: {pair.value}</div>
                <div>Header: {pair.label}</div>
                <div>Link: <a href={"#"}>link</a></div>
            </li>
        ));
}

const GetStatistic = (props) => {
    return (
        <div>
            <Separator.Separator4/>
            <p> <strong>Id:</strong> {props.userId}</p>
            <p> <strong>UUID:</strong> {props.userUuid}</p>
            <p> <strong>Created (registered) at </strong> {props.registrationTime}</p>
            <p> <strong>Last visit time </strong> {props.lastVisitTime}</p>
            <hr/>
            <p> <strong>Is active:</strong> {props.isActive ? "yes": "no"}</p>
            <p> <strong>Is deleted:</strong> {props.isDeleted ? "yes": "no"}</p>
            <p> <strong>Is banned:</strong> {props.isBanned ? "yes": "no"}</p>
            <hr/>
            <p> <strong>Comments count:</strong> {props.commentsCount}</p>
            <p> <strong>Commented posts:</strong> <ul>{<SimplePostMapper pairs={props.postsHeadsAndIds}/>}</ul> </p>
        </div>
    );
}

export default GetStatistic;