import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getCategories, deleteCategory } from "./helper/adminapicall";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);

  const { user, token } = isAuthenticated();

  const preLoad = () =>
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });

  useEffect(() => {
    preLoad();
  }, []);

  const deleteThisProduct = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preLoad();
      }
    });
  };

  return (
    <Base title="Welcome admin" description="Manage categories here">
      <h2 className="mb-4">All categories:</h2>
      <Link className="btn btn-info mb-3" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row rounded">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            Total {categories.length} categories
          </h2>

          {categories.map((category, index) => (
            <div className="row text-center bg-success mb-2 rounded ">
              <div className="col-4">
                <h3 className="text-white text-left">{category.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-warning mt-1 mb-1 btn-sm"
                  to={`/admin/category/update/${category._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button
                  onClick={() => {
                    deleteThisProduct(category._id);
                  }}
                  className="btn btn-danger mt-1 mb-1 btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
};

export default ManageCategory;
