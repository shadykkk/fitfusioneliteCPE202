import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { updateAccount } from "../Actions/accountActions";

function UpdateUserProfileScreen() {
  const [password, setPassword] = useState("");
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!userInfo) {
    navigate('/login');
  }

  const [email, setEmail] = useState(userInfo.email);

  const UpdateUserInfo = async () => {
    let formField = new FormData();

    formField.append("email", email);
    formField.append("password", password);
    formField.append("first_name", first_name);
    formField.append("last_name", last_name);

    dispatch(updateAccount(formField)).then((response) => {
      navigate("/");
    });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      UpdateUserInfo();
    }
  };
 
  return (
    <div>
      <br />
      <div className="text-center" style={{ color: "rgb(120, 194, 173)", paddingTop: "50px" }}>
  <h1 style={{ color: "rgb(120, 194, 173)" }}><b>Update Profile</b></h1>
</div>

      <div className="container">
        <div className="row">
          <div className="row justify-content-center mt-5">
            <div className="col-sm-6 col-12">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={userInfo.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </Form.Group>

                <div className="text-center">
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    variant="primary"
                  >
                    Submit
                  </Button>
                </div>
                <br />
                <div className="text-center">
                  {error && <h4>{error}</h4>}
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateUserProfileScreen;
