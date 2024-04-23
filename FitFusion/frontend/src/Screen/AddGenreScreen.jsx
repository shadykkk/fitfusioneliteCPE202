// import axios from 'axios'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addGenre } from "../Actions/genreActions";
import { Link } from "react-router-dom";
import { listGenres } from "../Actions/genreActions";

function AddGenreScreen() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [description, setDescription] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const AddGenreInfo = async () => {
    let formField = new FormData();

    formField.append("name", name);

    if (image !== null) {
      formField.append("image", image);
    }

    dispatch(addGenre(formField)).then((response) => {
      navigate("/movielist");
    });
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  if (!userInfo) {
    navigate("/login");
  } else {
    if (!userInfo.isAdmin) {
      navigate("/");
    }
  }
  return (
    <div>
      <br />
      <div class="text-center" variant="light">
        <h1>Add Genre</h1>
      </div>
      <Container>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              id="image"
              name="image"
              className="form-control"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>
          <Button className="btn btn-primary" onClick={AddGenreInfo}>
            Add Genre
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default AddGenreScreen;
