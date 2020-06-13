import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminLeftSide = () => {
    return (
      <div className="card">
        <h3 className="card-header bg-dark text-white">Admin Navigation</h3>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-success">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-success">
              Manage Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-success">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-success">
              Manage orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminRightSide = () => {
    return (
      <div className="card">
        <h3 className="card-header bg-dark text-white">Admin Information</h3>
        <ul className="list-group">
          <li className="list-group-item text-dark">
            <span className="badge badge-success mr-2">Name:</span>
            {name}
          </li>
          <li className="list-group-item text-dark">
            <span className="badge badge-success mr-2">Email:</span>
            {email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-danger">Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base title="Welcome to admin area" description="Manage all the stuff">
      <div className="row">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashboard;
