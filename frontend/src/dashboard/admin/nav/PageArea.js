import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from '../../../functions/auth'

const PageArea = () => {
  const { user } = isAuthenticated()

  return (
    <div className="page-area bread-pd">
      <div className="breadcumb-overlay"></div>
      <div className="container">
        <div className="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
                      <div class="breadcrumb text-center">
                          <div class="section-headline">
                              <h2 style={{color: "#fff"}}>
                              {user && user.role !== "Subscriber" ? (
                                 "Admin Dashboard"
                                ) : "User Dashboard"}
                                </h2>
                          </div>
                          <ul>
                              <li class="home-bread">Home</li>
                              <li> {user && user.role !== "admin" ? (
                                 "Admin Dashboard"
                                ) : "User Dashboard"}</li>
                          </ul>
                      </div>
                  </div>
        </div>
      </div>
    </div>
  );
};

export default PageArea;
