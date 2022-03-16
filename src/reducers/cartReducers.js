import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_CLEAR_ITEMS,
} from "../constants/cartConstants"

export const cartReducer = (
    state = { cartItems: [], shippingAddress: {} },
    action
) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload

            const existItem = state.cartItems.find(
                (x) => x.book_id === item.book_id
            )
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.book_id === existItem.book_id ? item : x
                    ),
                }
            } else
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (x) => x.book_id !== action.payload
                ),
            }
        case CART_CLEAR_ITEMS:
            return {}
        default:
            return state
    }
}
