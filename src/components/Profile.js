import React from "react";
import AuthService from "../services/auth.service";

const currentUser = AuthService.getCurrentUser();

function AdminData(props) {
    const isNeed = props.isNeeded;

    if (isNeed)
        return (
            <div>
                <strong>Authorities:</strong>
                <ul>
                    {currentUser.roles &&
                    currentUser.roles.map((role, index) =>
                        <li key={index}>
                            {role}
                        </li>)}
                </ul>
            </div>
        );

    else
        return <div/>;
}

const Profile = () => {

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
        <p>
            <strong>Id:</strong> {currentUser.id}
        </p>
        <p>
            {/*<strong>Token:</strong> {currentUser.accessToken}*/}
            <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
            {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
            <strong>About:</strong> {currentUser.about === undefined ? 'no data' : currentUser.about}
        </p>
        <AdminData isNeeded={currentUser.roles.some(role =>["system","user_data_admin_viewer"].includes(role))}/>
    </div>
  );
};

export default Profile;