import axios from "axios";
import jwt from "jsonwebtoken";
import { React, useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_API } from "../../../config";
import { isAuth } from "../../../helpers/auth";
import "./Activate.css";

const Activate = ({ match }) => {
  const [formData, setFormData] = useState({
    name: "",
    token: "",
    show: true,
  });
  const [processing, setProcessing] = useState("");

  useEffect(() => {
    let token = match.params.token;
    let { fullName } = jwt.decode(token);
    if (token) {
      setFormData({ ...formData, fullName, token });
    }
    console.log(token, fullName);
  }, [match.params]);

  const { fullName, token, show } = formData;
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    axios
      .post(`${BACKEND_API}/verified`, {
        token,
      })
      .then((res) => {
        setFormData({
          ...formData,
          show: false,
        });
        console.log(res.data.message);
        toast.success(res.data.message);
        setProcessing(false);
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        toast.error(err.response.data.errors);
        
        setProcessing(false);
      });
  };

  return (
    <>
      {isAuth() ? <Redirect to="/" /> : null}
      {/* <div className="login-area area-padding fix" style={{ height: "100vh" }}>
        <div className="login-overlay"></div>
        <div className="container mt-5">
          <div className="row justify-content-center text-center ">
            <div className="col-xl-6 col-lg-6 col-md-8">
              <div className="login-form">
                <h6>Welcome back {fullName}</h6>
                <h4 className="login-title text-center">
                 Click on button below to activate your account.
                </h4>
                <form
                  id="contactForm"
                  className="log-form"
                  onSubmit={handleSubmit}
                >
                  <button
                    type="submit"
                    id="submit"
                    onClick={handleSubmit}
                    className="slide-btn login-btn"
                  >
                    {processing ? (
                      <div className="spinner" id="spinner"></div>
                    ) : (
                      <b>Activate</b>
                    )}
                  </button>
                  <div className="acc-not">
                    <Link to="/login">Signin</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div class="login-area area-padding fix" style={{height: "100vh"}}>
            <div class="login-overlay"></div>
            <div class="table">
                <div class="table-cell">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-offset-2 col-md-8 col-sm-offset-2 col-sm-8 col-xs-12">
                                <div class="login-form">
                                    <h5 class="login-title text-center">Welcome back {fullName}</h5>
                                    <div class="row">
                                        <form id="contactForm"  class="log-form" onSubmit={handleSubmit}>
                                            <div class="col-md-12 col-sm-12 col-xs-12 text-center">
                                            <button type="submit" id="submit" className="slide-btn login-btn">
                                              {processing ? (
                                                <div className="spinner" id="spinner"></div>
                                              ) : (
                                                <b>Activate</b>
                                              )}
                                            </button>
                                            </div>
                                            <div class="col-md-12 col-sm-12 col-xs-12 text-center">
                                                <div class="clear"></div>
                                                <div class="sign-icon">
                                                    <div class="acc-not" style={{color: "#fff"}}><Link to="/login">Login</Link></div>
                                                </div> 
                                            </div> 
                                        </form> 
                                    </div>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default Activate;
