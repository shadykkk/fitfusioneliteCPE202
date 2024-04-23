import React from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ButtonWrapper2 from "../Components/ButtonWrapper2";

function PlanScreen() {
  const userLogin = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  const { userInfo } = userLogin;

  return (
    <div className="container" style={{ paddingTop: "100px" }}>
      <div className="text-center">
        <h1 style={{ color: "rgb(120, 194, 173)", fontFamily: "Segoe UI" }}><b>Plan</b></h1>
        <p className="fs-5 text-muted">Go for the best Workout Plan for you and you alone.</p>
        <br />
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 d-flex justify-content-center"> {/* Center the column */}
          <div className="card text-center" style={{
            width: "90%", // Adjusted width to be 10% smaller
            height: "auto",
            boxShadow: "0 0 20px rgba(120, 194, 173, 0.7)",
            fontFamily: "Segoe UI",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "20px",
          }}>
            <div className="card-header" style={{ color: "rgb(120, 194, 173)" }}> {/* Change color to the provided RGB */}
              <h4 className="fw-normal"><b>FitFUISON ELITE</b></h4>
            </div>
            <div className="card-body">
  <h1 className="card-title" style={{ fontSize: "2rem", color: "#000", paddingTop: "10px" }}>
    Php 1000<small className="text-muted fw-light">/year</small>
  </h1>
  <ul className="list-unstyled py-3" style={{ fontSize: "1.5rem", color: "#555", marginBottom: "10px" }}>
    <li>Best Value</li>
    <li>Designed for everyone and training!</li>
    <li>Watch all you want. Ad-free.</li>
    <li>Cancel your plan anytime.</li>
  </ul>
</div>
            {userInfo ? (
              !userInfo.isSubscriber ? (
                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "AYnh-9IN7iqMYmDzQBEF7n5R1nPztWUTQHP_5a64noW3ZMeNfyppUPlIyTNi-sFqQYlBc3DX4lbGtI44", // papalitan din
                    components: "buttons",
                    intent: "subscription",
                    vault: true,
                  }}
                >
                  <ButtonWrapper2 type="subscription" />
                </PayPalScriptProvider>
              ) : (
                <div />
              )
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanScreen;
