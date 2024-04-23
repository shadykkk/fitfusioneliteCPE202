import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Spinner } from "react-bootstrap";
import CancelSubscription from "../Components/CancelSubscription";
import axios from 'axios';
import { getUserDetails } from '../Actions/accountActions';

function UserProfileScreen() {
  const [subscription, setSubscription] = useState(null);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  let navigate = useNavigate();
  const dispatch = useDispatch();
  if (!userInfo) {
    navigate("/login");
  }

  const [planName, setPlanName] = useState(null);
  const [nextPaymentDue, setNextPaymentDue] = useState(null);
  const [accessToken, setAccessToken] = useState('');
  const [loadingSubscription, setLoadingSubscription] = useState(true);

  const userDetails = useSelector(state => state.userDetails)
  const { error, loading, user } = userDetails
  const subscriptionId = user.subscription_id

  useEffect(() => {
    console.log(subscriptionId)
    const clientId = 'AYnh-9IN7iqMYmDzQBEF7n5R1nPztWUTQHP_5a64noW3ZMeNfyppUPlIyTNi-sFqQYlBc3DX4lbGtI44';
    const clientSecret = 'EKHp3ZpUkTaXpeLNRq7rCb_4NrGJLeioch9HcuP23Uick6ZuNHsVQv2lkdVw7b-uF7FZVg1r6pFRD397';
    dispatch(getUserDetails('profile'))
    if (!accessToken) {
      const getToken = async () => {
        try {
          const response = await axios({
            method: 'post',
            url: 'https://api.sandbox.paypal.com/v1/oauth2/token',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
            },
            data: 'grant_type=client_credentials'
          });

          console.log(response.data)
          setAccessToken(response.data.access_token);
        } catch (error) {
          console.error(error);
        }
      };

      getToken();

      const intervalId = setInterval(() => {
        getToken();
      }, 60000);

      return () => clearInterval(intervalId);
    }

    axios({
      method: 'GET',
      url: `https://api.sandbox.paypal.com/v1/billing/subscriptions/${user.subscription_id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        console.log(response.data);
        setSubscription(response.data);
        setLoadingSubscription(false);
        return response.data.plan_id;
      })
      .then(planId => {
        return axios({
          method: 'GET',
          url: `https://api.sandbox.paypal.com/v1/billing/plans/${planId}`,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        })
      })
      .then(response => {
        setPlanName(response.data.name);
      })
      .catch(error => {
        console.error(error);
        setLoadingSubscription(false);
      });
  }, [accessToken, subscriptionId]);
  useEffect(() => {
    if (subscription) {
      const nextBillingTime = new Date(subscription.billing_info.next_billing_time);
      setNextPaymentDue(nextBillingTime.toLocaleDateString());
    }
  }, [subscription, subscriptionId]);

  if (loadingSubscription || !subscription || !planName || !nextPaymentDue) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }


  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <h1 style={{ fontWeight: "bold", fontSize: "32px", color: "rgb(120, 194, 173)" }}>Account Overview</h1>
      </div>

      <Card style={{ width: "500px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "10px", margin: "20px auto", textAlign: "center" }}>
        <Card.Img variant="top" src="https://i.stack.imgur.com/l60Hf.png" style={{ borderRadius: "10px", width: "100%", height: "300px", objectFit: "cover" }} />
        <Card.Body>
          <Card.Title style={{ fontWeight: "bold", fontSize: "24px", color: "rgb(120, 194, 173)" }}>Profile</Card.Title>
          <div style={{ marginBottom: "20px" }}>
            <p style={{ color: "#333333", fontWeight: "bold" }}>Name:</p>
            <p style={{ color: "#555555" }}>{user.first_name} {user.last_name}</p>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <p style={{ color: "#333333", fontWeight: "bold" }}>Email:</p>
            <p style={{ color: "#555555" }}>{user.email}</p>
          </div>
          <div>
            <Button
              as={Link}
              to="/updateuserprofile"
              variant="primary"
              className="rounded"
              style={{ width: "100%" }}
            >
              Edit Profile
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Card style={{ width: "500px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "10px", margin: "20px auto", textAlign: "center" }}>
        <Card.Body>
          <Card.Title style={{ fontWeight: "bold", fontSize: "24px", color: "rgb(120, 194, 173)" }}>Subscription Details</Card.Title>
          <Card.Text>
            <div style={{ marginBottom: "20px" }}>
              <p style={{ color: "#333333", fontWeight: "bold" }}>Current Plan:</p>
              <p style={{ color: "#555555" }}>{planName}</p>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <p style={{ color: "#333333", fontWeight: "bold" }}>Status:</p>
              <p style={{ color: "#555555" }}>{subscription.status}</p>
            </div>
            <div>
              <p style={{ color: "#333333", fontWeight: "bold" }}>Next Payment Due:</p>
              <p style={{ color: "#555555" }}>{nextPaymentDue}</p>
            </div>
          </Card.Text>
          <div style={{ marginTop: "20px" }}>
            <CancelSubscription subscriptionId={subscriptionId} accessToken={accessToken} />
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default UserProfileScreen;
