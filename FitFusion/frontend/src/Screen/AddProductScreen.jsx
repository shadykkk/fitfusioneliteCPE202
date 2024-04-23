import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { addProduct } from "../Actions/productActions";
import { listGenres } from "../Actions/genreActions";
import { listDirectors } from "../Actions/directorActions";

function AddProductScreen() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [description, setDescription] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listGenres());
    dispatch(listDirectors());
  }, [dispatch]);

  const genreList = useSelector((state) => state.genreList);
  const { genres } = genreList;

  const directorList = useSelector((state) => state.directorList);
  const { directors } = directorList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let formField = new FormData();
    formField.append("name", name);
    formField.append("description", description);
    formField.append("director", director);
    formField.append("genre", genre);

    if (image) {
      formField.append("image", image);
    }
    if (video) {
      formField.append("video", video);
    }

    dispatch(addProduct(formField)).then(() => {
      navigate("/movielist");
    });
  };

  return (
    <Container className="py-5">
<h1 className="text-center mb-4" style={{ color: 'rgb(120, 194, 173)', fontWeight: 'bold' }}>Add Workout</h1>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="video">
              <Form.Label>Video File</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setVideo(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="genre">
              <Form.Label>Genre</Form.Label>
              <Form.Select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                <option value="">-- Please select --</option>
                {genres.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="director">
              <Form.Label>Director</Form.Label>
              <Form.Select
                value={director}
                onChange={(e) => setDirector(e.target.value)}
              >
                <option value="">-- Please select --</option>
                {directors.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.firstname} {item.lastname}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Add Workout
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <div className="text-center mt-3">
        <Link to="/movielist" className="btn btn-light">Go Back</Link>
      </div>
    </Container>
  );
}

export default AddProductScreen;
