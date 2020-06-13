import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My title",
  description = "My Description",
  className = "bg-dark text-white p-4",
  children,
}) => {
  return (
    <div className="bg-dark">
      <Menu />
      <div className="container-fluid">
        <div className="bg-dark text-white text-center">
          <h6 className="display-6">{title}</h6>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer className="footer bg-dark py-3 ">
        <div className="container bg-success text-white text-center rounded mt-5">
          <h4>If you have any question feel free to reach out</h4>
          <button className="btn btn-warning btn-sm">Contact Us</button>
        </div>
        <div className="container">
          <span className="text-muted">An amazing footer</span>
        </div>
      </footer>
    </div>
  );
};

export default Base;
