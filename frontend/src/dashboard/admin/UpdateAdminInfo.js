import React, { useState, useEffect } from "react";
import Header from "../../components/navs/header/Header";
import { update, read, updateUser } from "../../functions/user";
import { RegionDropdown, CountryDropdown } from "react-country-region-selector";
import Input from "react-phone-number-input/input";
import { isAuthenticated } from "../../functions/auth";
import PageArea from "./nav/PageArea";
import SideBar from "./nav/SideBar";
import Footer from "./nav/Footer";
import { toast } from "react-toastify";

const UpdateUserInfo = ({ match }) => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    usdt_address: "",
    email: "",
    password: "",
    error: false,
  });
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const { user, token } = isAuthenticated();
  const { usdt_address, email, password, firstName, lastName, error } = values;

  const init = () => {
    const userId = user._id;
    console.log(userId);
    read(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error, data);
        console.log("User Id =>", user._id);
        setValues({ ...values, error: true });
      } else {
        console.log(data);
        console.log(userId);
        setValues({
          ...values,
          firstName: data.firstName,
          lastName: data.lastName,
          fullName: data.fullName,
          usdt_address: data.usdt_address,
          email: data.email,
          password: data,
        });
        setPhone(data.phone);
        setCountry(data.country);
        setState(data.state);
      }
    });
  };

  useEffect(() => {
    const userId = match.params.userId;
    init(userId);
  }, []);

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setProcessing(true);
    const strongRegexSpecialCharacter = /^(.*\W).*$/;
    if (
      !firstName &&
      !lastName &&
      !phone &&
      !country &&
      !state &&
      !usdt_address
    ) {
      toast.error("Please update at least one field");
      setProcessing(false);
      return;
    }
    if (!state) {
      toast.error("State is required.");
      setProcessing(false);
      return;
    }
    if (!country) {
      toast.error("Country is required.");
      setProcessing(false);
      return;
    }
    if (!firstName) {
      toast.error("First name is required.");
      setProcessing(false);
      return;
    }
    if (strongRegexSpecialCharacter.test(firstName)) {
      toast.error("First name can't contain any special character.");
      setProcessing(false);
      return;
    }

    if (strongRegexSpecialCharacter.test(lastName)) {
      toast.error("Last name can't contain any special character.");
      setProcessing(false);
      return;
    }

    update(user._id, token, {
      firstName,
      lastName,
      fullName: firstName.trim() + " " + lastName.trim(),
      email,
      phone,
      usdt_address,
      country,
      state,
    }).then((data) => {
      console.log(data);
      if (data.error) {
        console.log(data.error);
        console.log(data);
        toast.error(data.error);
        setLoading(false);
      } else {
        updateUser(data, () => {
          setLoading(false);
          setValues({
            ...values,
            firstName: "",
            lastName: "",
            usdt_address: "",
            phone: "",
            state: "",
            country: "",
            email: data.email,
            success: true,
          });
        });
        setLoading(false);
        toast.success("Profile updated successfully.");
      }
    });
  };

  return (
    <>
      <Header />
      <main>
        <PageArea />
        <div className="notify-overlay"></div>
        <div className="notify-overlay"></div>
        <div className="dsahboard-area bg-color area-padding">
          <div className="container">
            <div className="row">
              <SideBar />
              <div className="col-xl-9 col-lg-9 col-md-8">
                 <div class="login-area area-padding fix">
            <div class="login-overlay"></div>
            <div class="table">
                <div class="table-cell">
                    <div class="container">
                        <div class="row justify-content-center text-center ml-5">
                            <div class="col-xl-9 col-lg-9 col-md-6">
                                <div class="login-form signup-form">
                                    <h4 class="login-title text-center">Update Profile</h4>
                                    <div class="row">
                                    <form id="contactForm"
                                      className="log-form"
                                      onSubmit={handleSubmit}
                                      style={{ background: "transparent" }}>
                                            <div class="col-md-12 col-sm-12 col-xs-12">
                                            <input type="text" id="name"
                                              placeholder="Please enter your firstname"
                                              value={firstName}
                                              onChange={handleChange("firstName")}
                                              name="firstName"
                                              class="form-control" />
                                            </div>
                                            <div class="col-md-12 col-sm-12 col-xs-12">
                                            <input type="text" id="name"
                                              placeholder="Please enter your lastname"
                                              value={lastName}
                                              onChange={handleChange("lastName")}
                                              name="lastName"
                                              class="form-control" />
                                            </div>
                                            <div class="col-md-12 col-sm-12 col-xs-12">
                                            <input type="email" id="email" class="form-control"
                                              placeholder="Enter your valid e-mail address"
                                              value={email}
                                              onChange={handleChange("email")}
                                              name="email"
                                              disabled
                                            />
                                            </div>
                                            <div class="col-md-12 col-sm-12 col-xs-12">
                                            <Input
                                              placeholder="Enter phone number"
                                              className="form-control"
                                              value={phone}
                                              onChange={setPhone}
                                            />
                                            </div>
                                            <div class="col-md-12 col-sm-12 col-xs-12">
                                            <CountryDropdown
                                              value={country}
                                              style={{ color: "grey" }}
                                              className="form-control"
                                              onChange={setCountry}
                                              name="country"
                                            />
                                            </div>
                                            <div class="col-md-12 col-sm-12 col-xs-12">
                                            <RegionDropdown
                                              disableWhenEmpty={true}
                                              country={country}
                                              style={{ color: "grey" }}
                                              className="form-control"
                                              value={state}
                                              onChange={setState}
                                              name="state"
                                            />
                                            </div>
                                           
                                            <div class="col-md-12 col-sm-12 col-xs-12">
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="Enter USDT address (TRC-20) wallet address"
                                              value={usdt_address}
                                              onChange={handleChange("usdt_address")}
                                              name="usdt_address"
                                            />
                                            </div>
                                            <div class="col-md-12 col-sm-12 col-xs-12" style={{float: "left"}}>
                                            <p><small>Make sure you are submitting TRC-20 wallet address to avoid delay or no payment.</small></p>
                                            </div>
                                            
                                            <button
                                                type="submit"
                                                onClick={handleSubmit}
                                                className="slide-btn login-btn"
                                                style={{marginTop: "20px"}}
                                              >
                                                {loading ? (
                                                  <b>Updating...</b>
                                                  ) : (
                                                  <b>Update</b>
                                                )}
                                            </button>
                                  
                                        </form> 
                                    </div>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>
            </div>
        </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UpdateUserInfo;
