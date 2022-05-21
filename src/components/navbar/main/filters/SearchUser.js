import Separator from "../Separator";
import React, {createContext, useContext, useState} from "react";
import UserService from "../../../../services/user.service";
import {Navigate} from "react-router-dom";
import scopes from "../../../../util/scopes.json";

const SearchUserParams = createContext(null);
const CurMasUserParams = createContext(null);

const RoleMapper = (props) => {
  return(
      props.roles.map((role, index) =>
          <li key={index}>
              {role.label} (code {role.value})
          </li>
  ));
}

const BarSearchUser = () => {
    const data = useContext(CurMasUserParams);

    const updateFunc = useContext(SearchUserParams).f;
    const updateResp = useContext(SearchUserParams).resp;

    function onDelChange (resp, id) {
        let copy = resp.slice();
        for(let i = 0; i < copy.length; i++) {
            if(resp[i].id===id) {
                resp[i].isDeleted = !resp[i].isDeleted;
                break;
            }
        }
        return copy;
    }

    function onBanChange (resp, id) {
        let copy = resp.slice();
        for(let i = 0; i < copy.length; i++) {
            if(resp[i].id===id) {
                resp[i].isTokenAllowed = !resp[i].isTokenAllowed;
                break;
            }
        }
        return copy;
    }

    const getNameByScopeCode = (code) =>{
        let scopesMas = [scopes.p1, scopes.p2, scopes.p3, scopes.p4];
        for (var i = 0; i < scopesMas.length; i++){
            if (scopesMas[i].code === code){
                return scopesMas[i].name;
            }
        }
    }

    const getVisByScopeCode = (code) => {
        let scopesMas = [scopes.p1, scopes.p2, scopes.p3, scopes.p4];
        for (var i = 0; i < scopesMas.length; i++){
            if (scopesMas[i].code === code){
                return scopesMas[i].visual;
            }
        }
    }

    function onScopeChange (resp, id, scope) {
        let copy = resp.slice();
        for(let i = 0; i < copy.length; i++) {
            if(resp[i].id===id) {
                resp[i].scope = {value: scope, label: getNameByScopeCode(scope)};
                break;
            }
        }
        return copy;
    }

    const [isErr, setIsErr] = useState(false);
    const [scopeCode, setScopeCode] = useState(data.scope.value);

    const handleScope = () => {
        if(scopeCode > 0 && scopeCode < 5)
        if(scopeCode>3)
            setScopeCode(1);
        else
            setScopeCode(scopeCode+1);
    }

    function handleDelete () {
        if (data && data.isDeleted) {
            UserService.undeleteUser(data.id)
                .then(
                    () => {
                        updateFunc(onDelChange(updateResp, data.id));
                    })
                .catch(
                    (error) => {
                        setIsErr(true);
                        localStorage.setItem("error", JSON.stringify(error.message));
                    });
        }
        else if (data && !data.isDeleted){
            UserService.deleteUser(data.id)
                .then(
                    () => {
                        updateFunc(onDelChange(updateResp, data.id));
                    })
                .catch(
                    (error) => {
                        setIsErr(true);
                        localStorage.setItem("error", JSON.stringify(error.message));
                    });
        }
    };

    function handleBan () {
        if (data && !data.isTokenAllowed) {
            UserService.unbanUser(data.id)
                .then(
                    () => {
                        updateFunc(onBanChange(updateResp, data.id));
                    })
                .catch(
                    (error) => {
                        setIsErr(true);
                        localStorage.setItem("error", JSON.stringify(error.message));
                    });
        }
        else if (data && data.isTokenAllowed) {
            UserService.banUser(data.id)
                .then(
                    () => {
                        updateFunc(onBanChange(updateResp, data.id));
                    })
                .catch(
                    (error) => {
                        setIsErr(true);
                        localStorage.setItem("error", JSON.stringify(error.message));
                    });
        }
    };

    function handleSaveScope () {
        UserService.setScope(data.id, scopeCode)
            .then(
                () => {
                    updateFunc(onScopeChange(updateResp, data.id, scopeCode));
                })
            .catch(
                (error) => {
                    setIsErr(true);
                    localStorage.setItem("error", JSON.stringify(error.message));
                });
    }

    if(isErr===true)
        return <Navigate to="/error" />

    return (
        <div className={"float-right"}>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button"
                        className="btn btn-info"
                        onClick ={handleScope}
                >
                    {getVisByScopeCode(scopeCode)}</button>
                <button type="button"
                        className="btn btn-secondary"
                        onClick ={() => handleSaveScope()}
                >
                    Сохранить</button>
            </div>
            <button type="button" className="btn btn-outline-secondary border-0" disabled> </button>
            <button type="button"
                    className="btn btn-outline-danger"
                    onClick ={() => handleBan()}
            >
                {!data.isTokenAllowed ? "Разбанить" : "В бан"}</button>
            <button type="button" className="btn btn-outline-dark border-0" disabled> </button>
            <button type="button"
                    className="btn btn-outline-danger"
                    onClick ={() => handleDelete()}
            >
                {data.isDeleted ? "Восстановить" : "Удалить"}</button>
        </div>
    )
}

const SearchUser = (props) => {
    return (
        <CurMasUserParams.Provider value={props}>
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
        </CurMasUserParams.Provider>
    );
}

const GetSearchUserWithParams = (props) => {
    return (
        <SearchUserParams.Provider value={props}>
            <Separator.Separator4/>
            <div className={"jumbotron bg-light"}>
                <h4 className={"text-center"}>Search result</h4>
                {props.resp.length === 0 ?
                    <p className={"text-center"}>No content with current search parameters found</p> :
                    props.resp.map(SearchUser)}
            </div>
        </SearchUserParams.Provider>
    );
}

export default GetSearchUserWithParams;