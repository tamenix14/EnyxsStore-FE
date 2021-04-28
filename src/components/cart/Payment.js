import React, { Fragment, useState, useEffect } from "react";

import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, clearErrors } from "../../actions/orderActions";

// Braintree
import { getBraintreeClientToken, processPayment } from "../../apiCore";
// import {isAuthenticated} from "../auth/index"
import Cookies from "js-cookie";
import "braintree-web";
import DropIn from "braintree-web-drop-in-react";

// import {
//   useStripe,
//   useElements,
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
// } from "@stripe/react-stripe-js";

import axios from "axios";

// const options = {
//   style: {
//     base: {
//       fontSize: "16px",
//     },
//     invalid: {
//       color: "#9e2146",
//     },
//   },
// };

const Payment = ({ history }) => {
  const alert = useAlert();
  // const stripe = useStripe();
  // const elements = useElements();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: ""
  });

  const { user} = useSelector((state) => state.auth);
  const { cartItems, shippingInfo} = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);

  // Braintree
  const userId = user._id;
  const token = Cookies.get("token");
  console.log(userId);

  // Braintree
  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
        setData({ error: data.error });
      } else {
        console.log(data);
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    //Braintree
    getToken(userId, token);
  }, [dispatch, alert, error, userId, token]);

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  // const paymentData = {
  //   amount: Math.round(orderInfo.totalPrice * 100),
  // };

  const submitHandler = () => {
    setData({ loading: true });
    // send the nonce to your server
    // nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        console.log(data);
        nonce = data.nonce;
        // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
        // and also total to be charged
        // console.log(
        //     "send nonce and total to process: ",
        //     nonce,
        //     getTotal(products)
        // );
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: Math.round(orderInfo.totalPrice * 100),
          address: shippingInfo.address
        };

        processPayment(userId, token, paymentData)
          .then((response) => {
            console.log(response);
            // empty cart
            // create order

            const createOrderData = {
              order: order,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: response.transaction.address
            };
            dispatch(createOrder(order));
                localStorage.removeItem("cartItems");
                history.push("/success");
                // window.location.reload()
            createOrder(userId, token, createOrderData)
          })
          .catch((error) => {
            console.log(error);
            setData({ loading: false });
          });
      })
      .catch((error) => {
        // console.log("dropin error: ", error);
        setData({ ...data, error: error.message });
      });
  };

  // Braintree
  const showDropIn = () => (
    <div>
      {data.clientToken !== null ? (
        <div>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: "vault",
              },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button
            onClick={submitHandler}
            id="pay_btn"
            type="submit"
            className="btn btn-success btn-block py-3"
          >
            Pay {` - ${orderInfo && orderInfo.totalPrice}`}
          </button>
        </div>
      ) : null}
    </div>
  );

  return (
    <Fragment>
      <MetaData title={"Payment"} />

      <CheckoutSteps shipping confirmOrder payment />
      {showDropIn()}
      {/* <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" >
            <h1 className="mb-4">Card Info</h1>
            <div className="form-group">
              <label htmlFor="card_num_field">Card Number</label>
              <CardNumberElement
                type="text"
                id="card_num_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_exp_field">Card Expiry</label>
              <CardExpiryElement
                type="text"
                id="card_exp_field"
                className="form-control"
                options={options}
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_cvc_field">Card CVC</label>
              <CardCvcElement
                type="text"
                id="card_cvc_field"
                className="form-control"
                options={options}
              />
            </div>

            <button id="pay_btn" type="submit" className="btn btn-block py-3">
              Pay {` - ${orderInfo && orderInfo.totalPrice}`}
            </button>
          </form>
        </div>
      </div> */}
    </Fragment>
  );
};

export default Payment;
