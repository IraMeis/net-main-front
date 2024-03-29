import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../../../services/auth.service";
import {useNavigate} from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

// const validEmail = (value) => {
//   if (!isEmail(value)) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This is not a valid email.
//       </div>
//     );
//   }
// };

const Register = () => {

  const form = useRef();
  const checkBtn = useRef();

  let navigate = useNavigate();

  const [username, setUsername] = useState("");
/*  const [email, setEmail] = useState("");*/
  const [password0, setPassword0] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  // const onChangeEmail = (e) => {
  //   const email = e.target.value;
  //   setEmail(email);
  // };

  const onChangePassword0 = (e) => {
    const password0 = e.target.value;
    setPassword0(password0);
    console.log(password0);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    console.log(password);
  };

  const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
          <div className="alert alert-danger" role="alert">
            The username must be between 3 and 20 characters.
          </div>
      );
    }
  };

  const vpassword0 = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
          <div className="alert alert-danger" role="alert">
            The password must be between 6 and 40 characters.
          </div>
      );
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if(password!==password0){
      setMessage("Inputted passwords are different.");
      setSuccessful(false);
      return;
    }

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, password).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);

          AuthService.login(username, password).then(
              () => {
                navigate("/profile");
                window.location.reload();
              },
              (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
              }
          );
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          if(error.response.status === 406)
            setMessage("This login is already in use");
          else
            setMessage(resMessage);

          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Enter password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password0"
                  value={password0}
                  onChange={onChangePassword0}
                  validations={[required, vpassword0]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Confirm password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword0]}
                />
              </div>

              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
