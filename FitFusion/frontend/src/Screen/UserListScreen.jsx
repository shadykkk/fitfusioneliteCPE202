import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { listUsers } from "../Actions/accountActions";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import CancelSubscriptionAdmin from "../Components/CancelSubscriptionAdmin";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const UserListScreen = () => {
  const [accessToken, setAccessToken] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    const clientId =
      "AYnh-9IN7iqMYmDzQBEF7n5R1nPztWUTQHP_5a64noW3ZMeNfyppUPlIyTNi-sFqQYlBc3DX4lbGtI44";
    const clientSecret =
      "EKHp3ZpUkTaXpeLNRq7rCb_4NrGJLeioch9HcuP23Uick6ZuNHsVQv2lkdVw7b-uF7FZVg1r6pFRD397";

    if (!accessToken) {
      const getToken = async () => {
        try {
          const response = await axios({
            method: "post",
            url: "https://api.sandbox.paypal.com/v1/oauth2/token",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
            },
            data: "grant_type=client_credentials",
          });

          console.log(response.data);
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
  }, [accessToken]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
  }, []);
  const userList = useSelector((state) => state.userList);
  const { error, loading, users } = userList;
  const userLogin = useSelector((state) => state.userLogin);
  let navigate = useNavigate();
  const { userInfo } = userLogin;

  if (!userInfo || !userInfo.isAdmin) {
    navigate("/login");
    return null;
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="display-4 fw-bold text-primary">User List</h1>
        <Form className="mb-4">
          <Row className="justify-content-center">
            <Col md={6}>
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Search"
                aria-label="Search"
                className="form-control-lg"
              />
            </Col>
          </Row>
        </Form>
        <Link to="/signup" className="btn btn-primary btn-lg">
          Add User
        </Link>
      </div>
      <div className="table-responsive">
        <Table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Subscription Status</th>
              <th scope="col">Subscription ID</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center">
                  <Loader />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6" className="text-center">
                  <Message variant="danger">{error}</Message>
                </td>
              </tr>
            ) : (
              users
                .filter((user) =>
                  search.toLowerCase()
                    ? user.email.toLowerCase().includes(search) ||
                      user.first_name.toLowerCase().includes(search) ||
                      user.last_name.toLowerCase().includes(search)
                    : true
                )
                .map((user) => (
                  <tr key={user._id}>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.email}</td>
                    <td>{user.isSubscriber ? "Active" : "Inactive"}</td>
                    <td>{user.subscription_id}</td>
                    <td>
                      <div className="d-grid gap-2">
                        <CancelSubscriptionAdmin
                          subscriptionId={user.subscription_id}
                          accessToken={accessToken}
                          id={user._id}
                        />
                        <LinkContainer to={`/updateuserinfo/${user._id}`}>
                          <Button
                            variant="light"
                            className="btn-sm"
                            style={{
                              minWidth: "4rem",
                            }}
                          >
                            <i className="fas fa-edit"></i> Edit
                          </Button>
                        </LinkContainer>
                      </div>
                    </td>
                  </tr>
                ))
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default UserListScreen;
