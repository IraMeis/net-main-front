import Separator from "../Separator";

const RoleMapper = (props) => {
  return(
      props.roles.map((role, index) =>
          <li key={index}>
              {role.label} (code {role.value})
          </li>
  ));
}

const BarSearchUser = () =>{
    return (
        <div className={"float-right"}>
            <button type="button" className="btn btn-outline-secondary">В бан</button>
            <button type="button" className="btn btn-outline-dark border-0" disabled> </button>
            <button type="button" className="btn btn-outline-secondary">Удалить</button>
        </div>
    )
}

const SearchUser = (props) => {
    return (
        <div>
            <Separator.Separator4/>
            <Separator.Separator2/>

            <h5>Meta info:</h5>
            <hr/>
            <p> <strong>Id:</strong> {props.id}</p>
            <p> <strong>UUID:</strong> {props.uuid}</p>
            <p> <strong>Created (registered) at </strong> {props.createdTimestamp}</p>
            <p> <strong>Last time modified at</strong> {props.modifiedTimestamp}</p>
            <p> <strong>Is active:</strong> {props.isActive ? "yes": "no"}</p>
            <p> <strong>Is user:</strong> {props.isUser ? "yes": "no"}</p>

            <Separator.Separator1/>

            <h5>User-editable info:</h5>
            <hr/>
            <p> <strong>Login:</strong> {props.login}</p>
            <p><strong>About:</strong> {props.about === null ? 'no data' : props.about}</p>

            <Separator.Separator1/>

            <h5>Admin-editable info:</h5>
            <hr/>
            <p> <strong>Is deleted:</strong> {props.isDeleted ? "yes": "no"}</p>
            <p> <strong>Is banned:</strong> {props.isTokenAllowed ? "no" : "yes"}</p>
            <p> <strong>Scope:</strong> {props.scope.value} ({props.scope.label})</p>
            <p> <strong>Roles:</strong> <ul>{<RoleMapper roles={props.roles}/>}</ul> </p>

            <hr/>
            <BarSearchUser/>
        </div>
    );
}

export default SearchUser;