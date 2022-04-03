import React from "react";
import AuthService from "../services/auth.service";

function AdminData(props) {
    if (props.isNeeded)
        return (
            <div>
                <strong>Authorities:</strong>
                <ul>
                    {props.user.roles &&
                    props.user.roles.map((role, index) =>
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
  const currentUser = AuthService.getCurrentUser();
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
        <p className="text-break">
            <strong>Token:</strong> {currentUser.accessToken}
            {/*<strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}*/}
            {/*{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}*/}
        </p>
        <p>
            <strong>About:</strong> {currentUser.about === undefined ? 'no data' : currentUser.about}
        </p>
        <AdminData isNeeded={currentUser.roles.some(role =>["system","user_data_admin_viewer"].includes(role))}
                   user={currentUser}/>
    </div>
  );
};

export default Profile;