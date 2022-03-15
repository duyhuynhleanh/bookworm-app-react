import axios from "axios"
import {
    FETCH_AUTHORS_FAIL,
    FETCH_AUTHORS_REQUEST,
    FETCH_AUTHORS_SUCCESS,
    FETCH_CATEGORIES_FAIL,
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_RATING_DETAILS_FAIL,
    PRODUCT_RATING_DETAILS_REQUEST,
    PRODUCT_RATING_DETAILS_SUCCESS,
    PRODUCT_SEARCH_FAIL,
    PRODUCT_SEARCH_REQUEST,
    PRODUCT_SEARCH_REVIEW_FAIL,
    PRODUCT_SEARCH_REVIEW_REQUEST,
    PRODUCT_SEARCH_REVIEW_SUCCESS,
    PRODUCT_SEARCH_SUCCESS,
    PRODUCT_TOP_DISCOUNT_FAIL,
    PRODUCT_TOP_DISCOUNT_REQUEST,
    PRODUCT_TOP_DISCOUNT_SUCCESS,
    PRODUCT_TOP_POPULAR_FAIL,
    PRODUCT_TOP_POPULAR_REQUEST,
    PRODUCT_TOP_POPULAR_SUCCESS,
    PRODUCT_TOP_RECOMMEND_FAIL,
    PRODUCT_TOP_RECOMMEND_REQUEST,
    PRODUCT_TOP_RECOMMEND_SUCCESS,
} from "../constants/productConstants"

axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://localhost:8000"

export const listTopDiscountProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_DISCOUNT_REQUEST })

        const { data } = await axios.get(`/api/products/topdiscount`)

        dispatch({
            type: PRODUCT_TOP_DISCOUNT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_DISCOUNT_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listSearchProducts =
    ({
        keyword = "",
        category = "",
        author = "",
        sortOrder = "sale",
        rating = 1,
        perPage = 5,
        page = 1,
    }) =>
    async (dispatch) => {
        try {
            dispatch({ type: PRODUCT_SEARCH_REQUEST })

            const { data } = await axios.get(
                `/api/search?keyword=${keyword}&category=${category}&author=${author}&sortOrder=${sortOrder}&rating=${rating}&page=${page}&perPage=${perPage}`
            )

            dispatch({
                type: PRODUCT_SEARCH_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: PRODUCT_SEARCH_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }

export const listSearchReviews =
    ({
        productId = "",
        rating = 0,
        sortOrder = "desc",
        paginate = 1,
        perPage = 5,
        page = 1,
    }) =>
    async (dispatch) => {
        try {
            dispatch({ type: PRODUCT_SEARCH_REVIEW_REQUEST })

            const { data } = await axios.get(
                `/api/search/${productId}/reviews?rating=${rating}&sortOrder=${sortOrder}&perPage=${perPage}&paginate=${paginate}&page=${page}`
            )

            dispatch({
                type: PRODUCT_SEARCH_REVIEW_SUCCESS,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: PRODUCT_SEARCH_REVIEW_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }

export const listTopRecommendProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_RECOMMEND_REQUEST })

        const { data } = await axios.get(`/api/products/toprecommend`)

        dispatch({
            type: PRODUCT_TOP_RECOMMEND_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_RECOMMEND_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listTopPopularProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_POPULAR_REQUEST })

        const { data } = await axios.get(`/api/products/toppopular`)

        dispatch({
            type: PRODUCT_TOP_POPULAR_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_POPULAR_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getAllCategories = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_CATEGORIES_REQUEST })
        const { data } = await axios("/api/categories")
        dispatch({
            type: FETCH_CATEGORIES_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: FETCH_CATEGORIES_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const getAllAuthors = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_AUTHORS_REQUEST })
        const { data } = await axios("/api/authors")
        dispatch({
            type: FETCH_AUTHORS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: FETCH_AUTHORS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listProductRatingDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_RATING_DETAILS_REQUEST })
        const { data } = await axios.get(`/api/products/${id}/reviews`)
        dispatch({
            type: PRODUCT_RATING_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_RATING_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
