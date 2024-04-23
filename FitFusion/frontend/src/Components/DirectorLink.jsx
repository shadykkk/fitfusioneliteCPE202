import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// import { productDetailsReducer } from '../Reducers/productReducers'
// import Product from './Product'
import { detailDirector } from '../Actions/directorActions'
function DirectorLink() {
  const { id } = useParams();
  const [director, setDirectors] = useState([]);
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;

  const directorDetails = useSelector((state) => state.directorDetails);
  const { directors } = directorDetails;

  const [fname, setFname] = useState('');
  // console.log(directors);
  const dispatch = useDispatch()
  useEffect(() => {
    async function fetchDirectors() {
      // const { data } = await axios.get(`/api/directorproducts/${product.director}`);
      // // const { direcotrInfo} = axios.get(`/api/directors/${product.director}`);
      // setDirectors(data);
      // // console.log(direcotrInfo)
    }
    fetchDirectors();
  }, [dispatch]);
  return (
    <div>
      <Link to={`/directorproducts/${product.director}`}>Director</Link>
    </div>
  );
}

export default DirectorLink;
