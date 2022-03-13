import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants"

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            book_id: data.id,
            book_tittle: data.book_title,
            book_cover_photo: data.book_cover_photo
                ? `/images/${data.book_cover_photo}.jpg`
                : `/images/default.jpg`,
            price: data.final_price,
            quantity: qty,
        },
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}
