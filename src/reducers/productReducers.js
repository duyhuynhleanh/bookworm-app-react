import {
    FETCH_AUTHORS_FAIL,
    FETCH_AUTHORS_REQUEST,
    FETCH_AUTHORS_SUCCESS,
    FETCH_CATEGORIES_FAIL,
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_CREATE_REVIEW_SUCCESS,
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

export const productTopDiscountReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_TOP_DISCOUNT_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_TOP_DISCOUNT_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_TOP_DISCOUNT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productListSearchReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_SEARCH_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_SEARCH_SUCCESS:
            return {
                loading: false,
                products: action.payload.data,
                page: action.payload.current_page,
                pages: action.payload.last_page,
                from: action.payload.from,
                to: action.payload.to,
                total: action.payload.total,
                per_page: action.payload.per_page,
            }
        case PRODUCT_SEARCH_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productListSearchReviewReducer = (
    state = { reviews: [] },
    action
) => {
    switch (action.type) {
        case PRODUCT_SEARCH_REVIEW_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_SEARCH_REVIEW_SUCCESS:
            return {
                loading: false,
                reviews: action.payload.data,
                page: action.payload.current_page,
                pages: action.payload.last_page,
                from: action.payload.from,
                to: action.payload.to,
                total: action.payload.total,
                per_page: action.payload.per_page,
            }
        case PRODUCT_SEARCH_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const categoryListReducer = (state = { categories: [] }, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_REQUEST:
            return { loading: true, categories: [] }
        case FETCH_CATEGORIES_SUCCESS:
            return { loading: false, categories: action.payload }
        case FETCH_CATEGORIES_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const authorListReducer = (state = { authors: [] }, action) => {
    switch (action.type) {
        case FETCH_AUTHORS_REQUEST:
            return { loading: true, authors: [] }
        case FETCH_AUTHORS_SUCCESS:
            return { loading: false, authors: action.payload }
        case FETCH_AUTHORS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productTopRecommendReducer = (
    state = { recommendProducts: [] },
    action
) => {
    switch (action.type) {
        case PRODUCT_TOP_RECOMMEND_REQUEST:
            return { loading: true, recommendProducts: [] }
        case PRODUCT_TOP_RECOMMEND_SUCCESS:
            return { loading: false, recommendProducts: action.payload }
        case PRODUCT_TOP_RECOMMEND_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productTopPopularReducer = (
    state = { popularProducts: [] },
    action
) => {
    switch (action.type) {
        case PRODUCT_TOP_POPULAR_REQUEST:
            return { loading: true, popularProducts: [] }
        case PRODUCT_TOP_POPULAR_SUCCESS:
            return { loading: false, popularProducts: action.payload }
        case PRODUCT_TOP_POPULAR_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productRatingDetailsReducer = (state = { rating: {} }, action) => {
    switch (action.type) {
        case PRODUCT_RATING_DETAILS_REQUEST:
            return { loading: true, ...state }
        case PRODUCT_RATING_DETAILS_SUCCESS:
            return { loading: false, rating: action.payload }
        case PRODUCT_RATING_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true }
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true }
        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}
        default:
            return state
    }
}
