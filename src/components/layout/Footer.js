import React, { Fragment } from "react";
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <Fragment>
      {/* <footer className="py-1">
        <p className="text-center mt-1">
          Ecommerce Sport - 2021, All Rights Reserved.
        </p>
      </footer> */}
      <footer className="wrapper__footer mt-5">
      <div className="container-fluid text-center">
        <div className="row">
          <div className="wrapper__left-footer col-6">
            <h5 className="title">CONNECT WITH US & SAVE</h5>
            <p>Sign Up For Email and Get 10% Off*</p>
            <label className="mt-3">
              *First-time subscribers only. Returning subscribers will be
              resubscribed for marketing/promo emails.
            </label>
          </div>
          <div className="wrapper__right-footer col-6">
            <div className="row">
              <div className="col-4">
                <h5 className="title">Services</h5>
                <ul className="p-0">
                  <li className="list-unstyled">
                    <a href="#!">Warranty</a>
                  </li>
                  <li className="list-unstyled">
                    <a href="#!">Refund policy</a>
                  </li>
                  <li className="list-unstyled">
                    <a href="#!">Cleaning products</a>
                  </li>
                  <li className="list-unstyled">
                    <a href="#!">Payment assistance</a>
                  </li>
                </ul>
              </div>
              <div className="col-4">
                <h5 className="title">About us</h5>
                <ul className="p-0">
                  <li className="list-unstyled">
                    <a href="#!">Privacy</a>
                  </li>
                  <li className="list-unstyled">
                    <a href="#!">History</a>
                  </li>
                  <li className="list-unstyled">
                    <a href="#!">Connect</a>
                  </li>
                  <li className="list-unstyled">
                    <a href="#!">Contact us</a>
                  </li>
                </ul>
              </div>
              <div className="col-4">
                <h5 className="title">Links</h5>
                <ul className="p-0">
                  <li className="list-unstyled">
                    <a href="#!">Visa</a>
                  </li>
                  <li className="list-unstyled">
                    <a href="#!">Paypal</a>
                  </li>
                  <li className="list-unstyled">
                    <a href="#!">Credit card</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4 mb-4">
        <div className="m-auto">
            Copyright (c) by <Link style={{textDecoration:"none"}}>Enyxs</Link>
        </div>
      </div>
    </footer>
    </Fragment>
  );
};

export default Footer;
