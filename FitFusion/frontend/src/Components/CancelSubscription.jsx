import React, { useState } from "react";
import axios from "axios";
import {Button} from 'react-bootstrap'
import { useDispatch } from "react-redux";
import { cancelSubscriptionUser } from "../Actions/accountActions";

const CancelSubscription = ({ subscriptionId, accessToken }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch()
  const cancelSubscription = async () => {
    
    try {
      const response = await axios.post(
        `https://api.sandbox.paypal.com/v1/billing/subscriptions/${subscriptionId}/cancel`,
        {
          reason: "The customer requested to cancel.",
          note: "This subscription was canceled by the customer."
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
      if (response.status === 204) {
        dispatch(cancelSubscriptionUser())
        setSuccess(true);
        setError(null);
        
      } else {
        setSuccess(false);
        setError(response.data.error.message);
      }
    } catch (error) {
      setSuccess(false);
      setError(error.message);
    }
  };

  return (
    <div>
      <Button onClick={cancelSubscription}>Cancel Subscription</Button>
      {success && <p>Subscription canceled successfully.</p>}
      {error && <p>Error canceling subscription: {error}</p>}
    </div>
  );
};

export default CancelSubscription;
