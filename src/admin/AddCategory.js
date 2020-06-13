import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => {
    return (
      <div className="mt-5">
        <Link to="/admin/dashboard" className="btn btn-success btn-sm mb-3">
          Admin Home
        </Link>
      </div>
    );
  };

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    //backend request fired
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const succesMessage = () => {
    if (success) {
      return <h2 className="text-info">Category created successfully</h2>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <h2 className="text-warning">Failed to create category</h2>;
    }
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter category</p>
        <input
          type="text"
          className="form-control py-3"
          onChange={handleChange}
          value={name}
          required
          autoFocus
          placeholder="Ex: Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info mt-4">
          Create Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      className="container bg-success rounded p-4"
      title="This is Add Category"
      description="Create categories"
    >
      <div className="row bg-light rounded">
        <div className="col-md-8 offset-2 ">
          {succesMessage()}
          {warningMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
}
