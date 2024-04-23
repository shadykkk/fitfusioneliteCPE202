import React, { useEffect, useState} from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col} from 'react-bootstrap';
import DirectorProducts from '../Components/DirectorProducts';

function DirectorProductsScreen() {
  const {id} = useParams()
  const [directorproduct, setDirectorProducts] = useState([])
  const userLogin = useSelector((state) => state.userLogin);
  let navigate = useNavigate()
  const { userInfo } = userLogin;

  if (!userInfo) {
    navigate('/login');
  } else {
    if (!userInfo.isSubscriber) {
      navigate('/plans')
    }
  }
  useEffect(() =>{
    async function fetchDirectorProducts(){
      const {data} = await axios.get(`http://127.0.0.1:8000/api/directorproducts/${id}`)
      setDirectorProducts(data);
    }
    fetchDirectorProducts()
  }, [])
  return (
    <div><br/>
    <div class='text-center' variant='light'>
    <h1>Workouts</h1>
    </div>
    <br/>
    <Container fluid>
    <Row>
    {directorproduct.map(product => (
        <Col className='row g-1' key={product._id} sm={12} md={6} lg={4} xl={3}>
            <DirectorProducts product={product} />
        </Col>
    ))}
    </Row>
    </Container>
    </div>
  )
}

export default DirectorProductsScreen