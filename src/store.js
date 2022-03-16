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
    productRatingDetailsReducer,
    productListSearchReviewReducer,
    productReviewCreateReducer,
} from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderListMyReducer,
} from "./reducers/orderReducers"

const reducer = combineReducers({
    categoryList: categoryListReducer,
    authorList: authorListReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    productTopDiscount: productTopDiscountReducer,
    productListSearch: productListSearchReducer,
    productListSearchReview: productListSearchReviewReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRecommend: productTopRecommendReducer,
    productTopPopular: productTopPopularReducer,
    productDetails: productDetailsReducer,
    productRatingDetails: productRatingDetailsReducer,
    cart: cartReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderListMy: orderListMyReducer,
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
