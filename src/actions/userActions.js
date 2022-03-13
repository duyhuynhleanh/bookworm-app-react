import axios from "axios"
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
} from "../constants/userConstants"

axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://localhost:8000"

export const login = (email, password) => async (dispatch) => {
    dispatch({
        type: USER_LOGIN_REQUEST,
    })
    await axios.get("/sanctum/csrf-cookie").then(() => {
        axios
            .post("api/users/login", {
                email: email,
                password: password,
            })
            .then((response) => {
                const data = {
                    id: response.data.user.id,
                    first_name: response.data.user.first_name,
                    last_name: response.data.user.last_name,
                    email: response.data.user.email,
                    admin: response.data.user.admin,
                    token: response.data.token,
                }
                dispatch({
                    type: USER_LOGIN_SUCCESS,
                    payload: data,
                })
                localStorage.setItem("userInfo", JSON.stringify(data))
            })
            .catch((error) => {
                dispatch({
                    type: USER_LOGIN_FAIL,
                    payload:
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message,
                })
            })
    })
}

export const register =
    (firstName, lastName, email, password, confirmPassword) =>
    async (dispatch) => {
        try {
            dispatch({
                type: USER_REGISTER_REQUEST,
            })
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            }

            const { data } = await axios.post(
                "api/users/register",
                {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password,
                    password_confirmation: confirmPassword,
                },
                config
            )

            const user = {
                id: data.user.id,
                first_name: data.user.first_name,
                last_name: data.user.last_name,
                email: data.user.email,
                admin: data.user.admin,
                token: data.token,
            }

            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: user,
            })

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: user,
            })

            localStorage.setItem("userInfo", JSON.stringify(user))
        } catch (error) {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }

export const logout = () => async (dispatch) => {
    await axios.post("/logout")
    localStorage.removeItem("userInfo")
    localStorage.removeItem("cartItems")
    dispatch({ type: USER_LOGOUT })
    // dispatch({ type: USER_DETAILS_RESET })
    // dispatch({ type: ORDER_LIST_MY_RESET })
    // document.location.href = "/"
}

export const getUserDetails = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.get("/api/user", config)
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === "Unauthenticated.") {
            dispatch(logout())
        }
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: message,
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(`/api/users/profile`, user, config)

        const user_res = {
            id: data.user.id,
            first_name: data.user.first_name,
            last_name: data.user.last_name,
            email: data.user.email,
            admin: data.user.admin,
            token: data.token,
        }

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: user_res,
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: user_res,
        })
        localStorage.setItem("userInfo", JSON.stringify(user_res))
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === "Unauthenticated.") {
            dispatch(logout())
        }
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: message,
        })
    }
}
