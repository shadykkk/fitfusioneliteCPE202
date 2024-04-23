import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate, Link, useParams } from "react-router-dom";
import { addProduct, editProduct, listProductDetails } from "../Actions/productActions";
import { listGenres } from "../Actions/genreActions";
import { listDirectors } from "../Actions/directorActions";

function EditProductScreen() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [description, setDescription] = useState("");
    const [director, setDirector] = useState("");
    const [genre, setGenre] = useState("");

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate("/login");
        } else {
            dispatch(listGenres());
            dispatch(listDirectors());
            dispatch(listProductDetails(id));
        }
    }, [dispatch, id, navigate, userInfo]);

    const genreList = useSelector((state) => state.genreList);
    const { genres } = genreList;

    const directorList = useSelector((state) => state.directorList);
    const { directors } = directorList;

    const productDetails = useSelector((state) => state.productDetails);
    const { product } = productDetails;

    const editProductHandler = async () => {
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

        dispatch(editProduct(id, formField)).then(() => {
            navigate("/movielist");
        });
    };

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="text-center mb-5">
                <h1 style={{ color: "rgb(120, 194, 173)" }}><b>Edit Workout</b></h1>
            </div>
            <Form className="w-75">
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter workout name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Video</Form.Label>
                    <Form.Control type="file" onChange={(e) => setVideo(e.target.files[0])} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter workout description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Genre</Form.Label>
                    <Form.Select value={genre} onChange={(e) => setGenre(e.target.value)}>
                        <option value="">Select genre</option>
                        {genres.map((genre) => (
                            <option key={genre._id} value={genre._id}>
                                {genre.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Director</Form.Label>
                    <Form.Select value={director} onChange={(e) => setDirector(e.target.value)}>
                        <option value="">Select director</option>
                        {directors.map((director) => (
                            <option key={director._id} value={director._id}>
                                {director.firstname} {director.lastname}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" onClick={editProductHandler}>
                    Update Workout
                </Button>
                <Link className="btn btn-light ms-2" to="/movielist">
                    Go Back
                </Link>
            </Form>
        </Container>
    );
}

export default EditProductScreen;
