import { Row, Container, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import HomeScreen from "./Screen/HomeScreen";
import ProductScreen from './Screen/ProductScreen';
import Registerscreen from './Screen/Registerscreen';
import DirectorProductsScreen from './Screen/DirectorProductsScreen';
import GenresScreen from './Screen/GenresScreen';
import LoginScreen from './Screen/LoginScreen';
import PlanScreen from './Screen/PlanScreen';
import GenreProductsScreen from './Screen/GenreProductsScreen';
import DirectorsScreen from './Screen/DirectorsScreen';
import AddGenreScreen from './Screen/AddGenreScreen';
import 'video-react/dist/video-react.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './bootstrap.min.css';
import './App.css';
import AddProductScreen from './Screen/AddProductScreen';
import UserProfileScreen from './Screen/UserProfileScreen';
import ProductListScreen from './Screen/ProductListScreen';
import DeletedProductScreen from './Screen/DeletedProductScreen';
import UpdateUserProfileScreen from './Screen/UpdateUserProfileScreen';
import UserProfileScreen2 from './Screen/UserProfileScreen2';
import EditProductScreen from './Screen/EditProductScreen';
import UserListScreen from './Screen/UserListScreen';
// import UpdateUserInfoScreen from './Screen/UpdateUserInfo';
import UpdateUserScreen from './Screen/UpdateUserScreen';
import MyListScreen from './Screen/MyListScreen';

function App() {
  return (
  <Router>
    <Header/>
    {/* <Slider /> */}
    <main>
      <Routes>
      <Route path='/' element={<HomeScreen />} exact/>
      <Route path='/products/:id' element={<ProductScreen />} />
      <Route path='/directorproducts/:id' element={<DirectorProductsScreen />} />
      <Route path='/signup' element={<Registerscreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/plans' element={<PlanScreen />} />
      <Route path='/userprofile' element={<UserProfileScreen />} />
      <Route path='/userlist' element={<UserListScreen />} />
      <Route path='/updateuserprofile' element={<UpdateUserProfileScreen />} />
      <Route path='/updateuserinfo/:id' element={<UpdateUserScreen />} />
      <Route path='/addworkout' element={<AddProductScreen />} />
      <Route path='/editworkout/:id' element={<EditProductScreen />} />
      <Route path='/addgenre' element={<AddGenreScreen />} />
      <Route path='/genres' element={<GenresScreen />} />
      <Route path='/directors' element={<DirectorsScreen />} />
      <Route path='/genreproducts/:id' element={<GenreProductsScreen />} />
      <Route path='/movielist' element={<ProductListScreen />} />
      <Route path='/deleted' element={<DeletedProductScreen/>} />
      <Route path='/mylist' element={<MyListScreen/>} />
      
      {/* <Route path='/paypal' element={<SubscriptionForm/>} /> */}
      {/* <Route path='/plandetails' element={<PlanDetailsScreen/>} /> */}
      </Routes>
    </main>
    <Footer fixed="bottom"/>
  </Router>
  );
}

export default App;
