import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PageArea from "../nav/PageArea";
import SideBar from "../nav/SideBar";
import Footer from "../nav/Footer";
import Header from "../../../components/navs/header/Header";
import { isAuthenticated } from "../../../functions/auth";
import { getInvestmentPackages } from "../../../functions/investmentpackage";
import { createSite, getSites } from "../../../functions/site";

const Create__Site = ({ history }) => {
  const [values, setValues] = useState({
    name: "",
    about: "",
    email: "",
    terms_conditions: "",
    facebook_url: "",
    whatsapp_url: "",
    instagram_url: "",
    twitter_url: "",
    phone: "",
    logo: "",
    createdSite: "",
    redirectToProfile: false,
    formData: "",
  });
  const [loading, setLoading] = useState(false);
  const [sites, setSites] = useState([])
  
  const loadSites = () => {
    getSites().then((data) => {
      if (data && data.error) {
        console.log(data.error)
        setLoading(false)
      } else {
        setLoading(false)
        setSites(data)
      }
    })
  }
  
  useEffect(() => {
    loadSites()
  }, [])
    // if(sites && sites.length < 0){
    //   history.push("/admin-create-site-details")
    // }else {
    //   history.push("/admin-site-details")
    // }
  // useEffect(() => {
  // }, [])
  // destructure user and token from localstorage
  const { user, token } = isAuthenticated();
  const {
    name,
    about,
    email,
    facebook_url,
    terms_conditions,
    whatsapp_url,
    instagram_url,
    twitter_url,
    logo,
    phone,
    createdSite,
    redirectToProfile,
    formData,
  } = values;

  const handleChange = (name) => (event) => {
    const value = name === "logo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const init = () => {
    setLoading(true);
    getInvestmentPackages().then((data) => {
      if (data.error) {
        console.log(data.error);
        setLoading(false);
      } else {
        setValues({
          ...values,
          investmentpackages: data,
          formData: new FormData(),
        });
        setLoading(false);
      }
    });
  };
  useEffect(() => {
    init();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values });
    setLoading(true);
    if (!name) {
      setTimeout(() => {
        setLoading(false);
        toast.error("Site name is required.");
      }, 1000);
      return;
    }
    if (name.length > 32) {
      setTimeout(() => {
        setLoading(false);
        toast.error("Site name is long, should be between 2 to 32 characters.");
      }, 1000);
      return;
    }
    if (name.length <= 2) {
      setTimeout(() => {
        setLoading(false);
        toast.error(
          "Site name is short, should be between 2 to 32 characters."
        );
      }, 1000);
      return;
    }
    if (!email) {
      setTimeout(() => {
        setLoading(false);
        toast.error("Site's email is required. ");
      }, 1000);
      return;
    }
    if (!about) {
      setTimeout(() => {
        setLoading(false);
        toast.error("About site is required. ");
      }, 1000);
      return;
    }
    if (!terms_conditions) {
      setTimeout(() => {
        setLoading(false);
        toast.error("Terms and Conditions is required.");
      }, 1000);
      return;
    }
    if (terms_conditions.length <= 20) {
      setTimeout(() => {
        setLoading(false);
        toast.error(
          "Terms and Conditions is short, should be between 20 characters to 2000 characters."
        );
      }, 1000);
      return;
    }
    
    if (about.length <= 20) {
      setTimeout(() => {
        setLoading(false);
        toast.error(
          "About site is short, should be between 20 characters to 1000 characters."
        );
      }, 1000);
      return;
    }
    if (about.length > 2000) {
      setTimeout(() => {
        setLoading(false);
        toast.error(
          "About site is long, should be between 20 characters to 1000 characters."
        );
      }, 1000);
      return;
    }
    if (!logo) {
      setTimeout(() => {
        setLoading(false);
        toast.error("Please upload site's logo.");
      }, 1000);
      return;
    }
    if (!phone) {
      setTimeout(() => {
        setLoading(false);
        toast.error("Please site's phone number is required.");
      }, 1000);
      return;
    }

    setValues({
      ...values,
      name: "",
      about: "",
      email: "",
      facebook_url: "",
      whatsapp_url: "",
      instagram_url: "",
      twitter_url: "",
      phone: "",
      terms_conditions: "",
      amazon_url: "",
      logo: "",
      createdSite: "",
    });

    setLoading(false);

    // make request to api to create product
    createSite(user._id, token, formData, {phone}).then((data) => {
      if (data.error) {
        setValues({ ...values });
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          // toast.error(`Site should be unique. ${name} already exist.`);
        }, 1000);
        console.log(data);
      } else {
        setLoading(false);
        toast.success(`Site named "${name}" has been created successfully.`);
        setValues({
          ...values,
          name: "",
          about: "",
          email: "",
          facebook_url: "",
          whatsapp_url: "",
          instagram_url: "",
          phone: "",
          terms_conditions: "",
          twitter_url: "",
          amazon_url: "",
          logo: "",
          createdSite: data.name,
        });
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
                 <div className="login-area area-padding fix">
            <div className="login-overlay"></div>
            <div className="table">
                <div className="table-cell">
                    <div className="container">
                        <div className="row justify-content-center text-center ml-5">
                            <div className="col-xl-9 col-lg-9 col-md-6">
                                <div className="login-form signup-form">
                          <h4 className="login-title text-center">
                            Create Site Details
                          </h4>
                          <form
                            id="contactForm"
                            className="log-form"
                                onSubmit={handleSubmit}
                                style={{background: "transparent"}}
                              >
                              <div className="row" >
                                <div className="col-md-6">
                                  <label
                                    className="text-muted"
                                    style={{ float: "left", color: "#000" }}
                                  >
                                    Uplaod Logo
                                  </label>
                                  <input
                                    onChange={handleChange("logo")}
                                    type="file"
                                    accept="image/*"
                                    className="form-control"
                                  />
                                </div>
                                <div className="col-md-6">
                                  <label
                                    className="text-muted"
                                    style={{ float: "left", color: "#000" }}
                                  >
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    style={{ width: "100%", fontSize: "18px", color: "#000" }}
                                    className="form-control"
                                    placeholder="Enter your site's name..."
                                    onChange={handleChange("name")}
                                    value={name}
                                  />
                                </div>
                              </div>

                            <div className="row">
                              <div className="col-md-6">
                                <label
                                  className="text-muted"
                                  style={{ float: "left", color: "#000" }}
                                >
                                  E-mail
                                </label>
                                <input
                                  type="email"
                                  style={{ width: "100%", fontSize: "18px", color: "#000" }}
                                  className="form-control"
                                  onChange={handleChange("email")}
                                  value={email}
                                  placeholder="Enter your site's email address..."
                                />
                              </div>
                              <div className="col-md-6">
                                <label
                                  className="text-muted"
                                  style={{ float: "left", color: "#000" }}
                                >
                                  Phone Number
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter your site's phone number"
                                  className="form-control"
                                  style={{ width: "100%", fontSize: "18px", color: "#000" }}
                                  value={phone}
                                  onChange={handleChange("phone")}
                                  value={phone}
                                />
                              </div>
                            </div>
                            <div>
                              <div>
                                <label
                                  className="text-muted"
                                  style={{ float: "left", color: "#000" }}
                                >
                                  About
                                </label>
                                <textarea
                                  style={{
                                    width: "100%",
                                    backgroundColor: "transparent",
                                    padding: "5px",
                                    color: "#000",
                                    fontSize: "18px"
                                  }}
                                  placeholder="Write about your site..."
                                  onChange={handleChange("about")}
                                  value={about}
                                  rows="5"
                                ></textarea>
                              </div>
                            </div>
                            <div>
                              <div>
                                <label
                                  className="text-muted"
                                  style={{ float: "left", color: "#000" }}
                                >
                                  Terms and Conditions
                                </label>
                                <textarea
                                  style={{
                                    width: "100%",
                                    color: "#000",
                                    fontSize: "18px",
                                    backgroundColor: "transparent",
                                    padding: "5px",
                                  }}
                                  placeholder="Write about your site's terms and conditions..."
                                  onChange={handleChange("terms_conditions")}
                                  value={terms_conditions}
                                  rows="5"
                                ></textarea>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <label
                                  className="text-muted"
                                  style={{ float: "left", color: "#000" }}
                                >
                                  Facebook Link
                                </label>

                                <input
                                  onChange={handleChange("facebook_url")}
                                  type="text"
                                  placeholder="Optional"
                                  style={{ width: "100%", fontSize: "18px", color: "#000" }}
                                  className="form-control"
                                  value={facebook_url}
                                />
                              </div>
                              <div className="col-md-6">
                                <label
                                  className="text-muted"
                                  style={{ float: "left", color: "#000" }}
                                >
                                  WhatsApp Link
                                </label>
                                <input
                                  onChange={handleChange("whatsapp_url")}
                                  style={{ width: "100%", fontSize: "18px", color: "#000" }}
                                  type="text"
                                  placeholder="Optional"
                                  className="form-control"
                                  value={whatsapp_url}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <label
                                  className="text-muted"
                                  style={{ float: "left", color: "#000" }}
                                >
                                  Twitter Link
                                </label>
                                <input
                                  onChange={handleChange("twitter_url")}
                                  style={{ width: "100%", fontSize: "18px", color: "#000" }}
                                  type="text"
                                  placeholder="Optional"
                                  className="form-control"
                                  value={twitter_url}
                                />
                              </div>
                              <div className="col-md-6">
                                <label
                                  className="text-muted"
                                  style={{ float: "left", color: "#000" }}
                                >
                                  Instagram Link
                                </label>
                                <input
                                  onChange={handleChange("instagram_url")}
                                  style={{ width: "100%", fontSize: "18px", color: "#000" }}
                                  type="text"
                                  placeholder="Optional"
                                  className="form-control"
                                  value={instagram_url}
                                />
                              </div>
                            </div>

                            <button
                              type="submit"
                              className="slide-btn login-btn"
                            >
                              {loading ? (
                                <div className="spinner" id="spinner">
                                  Loading...
                                </div>
                              ) : (
                                <b>Create</b>
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
      </main>
      <Footer />
    </>
  );
};

export default Create__Site;
