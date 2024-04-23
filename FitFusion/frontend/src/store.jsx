import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer, addProductReducer, productDeleteReducer, productEditReducer } from './Reducers/productReducers'
import { genreListReducer, genreMoviesReducer } from './Reducers/genreReducers'
import { userLoginReducer, userUpdateReducer, userPaymentReducer, cancelSubscriptionReducer, userDetailsReducer, UserListReducer } from './Reducers/accountReducers'
import { directorsListReducer, directorsDetailReducer } from './Reducers/directorReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productEdit: productEditReducer,
    genreList: genreListReducer,
    genreMovies: genreMoviesReducer,
    userLogin: userLoginReducer,
    directorList: directorsListReducer,
    userUpdate: userUpdateReducer,
    userPayment: userPaymentReducer,
    directorDetails: directorsDetailReducer,
    cancelSubscription: cancelSubscriptionReducer,
    userDetails: userDetailsReducer,
    userList : UserListReducer,
})

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
    userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
