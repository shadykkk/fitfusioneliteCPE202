import React from 'react'
import { useEffect, useState } from "react";
import {
	PayPalScriptProvider,
	PayPalButtons,
	usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { paymentUserSuccess, updateSubscriptionId } from "../Actions/accountActions";
import { useDispatch, useSelector } from "react-redux";

const ButtonWrapper = ({ type }) => {
  const [{ options }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        intent: "subscription",
      },
    });
  }, [type]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch1 = useDispatch();

  const handleApprove = (data, actions) => {
    dispatch1(paymentUserSuccess());
  };

  return (
    <PayPalButtons
      createSubscription={(data, actions) => {
        return actions.subscription
          .create({
            plan_id: "P-22G43625B5398950AMYSTBSI", // eto papalitan
          })
          .then((orderId) => {
            console.log(orderId)
            dispatch1(updateSubscriptionId(orderId));
            return orderId;
          });
      }}
      onApprove={handleApprove}
      style={{
        label: "subscribe",
      }}
    />
  );
};

export default ButtonWrapper