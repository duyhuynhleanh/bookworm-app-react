import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
} from "./reducers/userReducers"
import {
    productTopDiscountReducer,
    productListSearchReducer,
    productTopRecommendReducer,
    productTopPopularReducer,
    productDetailsReducer,
    categoryListReducer,
    authorListReducer,
} from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"

const reducer = combineReducers({
    categoryList: categoryListReducer,
    authorList: authorListReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    productTopDiscount: productTopDiscountReducer,
    productListSearch: productListSearchReducer,
    productTopRecommend: productTopRecommendReducer,
    productTopPopular: productTopPopularReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
})

const cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : []

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
    },
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
