import React from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import Plan from "../hero/Plan";


const Investment = () => {

  return (
    <>
      <Header />
      <div class="page-area">
            <div class="breadcumb-overlay"></div>
            <div class="container">
                <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="breadcrumb text-center">
                            <div class="section-headline">
                                <h2 style={{color:"#fff"}}>Investment plan</h2>
                            </div>
                            <ul>
                                <li class="home-bread">Home</li>
                                <li>Investment</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Plan />
      <Footer />
    </>
  );
};

export default Investment;
