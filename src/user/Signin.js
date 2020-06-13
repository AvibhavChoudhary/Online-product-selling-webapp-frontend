import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signin, isAuthenticated, authenticate } from "../auth/helper/index";

const Signin = () => {
  const [values, setValues] = useState({
    email: "new@avi.com",
    password: "12345",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true });
          });
        }
      })
      .catch(console.log("sign in request failed"));
  };

  const loadingMessage = () => {
    return loading && <div className="alert alert-info">Loading...</div>;
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className=" col-md-6 offset-3 text-center">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                type="password"
                value={password}
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="SignIn" description="This is for sign in!">
      {loadingMessage}
      {errorMessage}
      {signInForm()}
      <p className="text-center text-white">{JSON.stringify(values)}</p>
      {performRedirect()}
    </Base>
  );
};

export default Signin;
