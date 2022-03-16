import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { Table, Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getUserDetails, updateUserProfile } from "../actions/userActions"
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants"
import { useNavigate } from "react-router-dom"
import { listMyOrders } from "../actions/orderActions"
import { LinkContainer } from "react-router-bootstrap"

const ProfileScreen = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const orderListMy = useSelector((state) => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy
    console.log(orders)

    useEffect(() => {
        if (!userInfo) {
            navigate("/")
        } else {
            if (!user) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails())
            } else {
                dispatch(listMyOrders())
                setFirstName(userInfo.first_name)
                setLastName(userInfo.last_name)
                setEmail(userInfo.email)
            }
        }
    }, [dispatch, userInfo, user, success, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage("Password and confirm do not match!")
        } else {
            dispatch(
                updateUserProfile({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password,
                })
            )
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {
                    success && (
                        <Message variant='success'>Profile updated!</Message>
                    )
                    // toast('🦄 "Profile updated!"', {
                    //     position: "bottom-right",
                    //     autoClose: 3000,
                    //     hideProgressBar: true,
                    //     closeOnClick: true,
                    //     pauseOnHover: true,
                    //     draggable: true,
                    //     progress: undefined,
                    // })
                }
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type='firstName'
                                placeholder='First Name'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='name'>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Last Name'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='confirmPassword'>
                            <Form.Label>Confirm password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Password'
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}
            </Col>
            <Col md={9}>
                <h2>My orders</h2>
                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className='table-sm'
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ORDER DATE</th>
                                <th>ORDER AMOUNT</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.order_date.substring(0, 10)}</td>
                                    <td>{`$${order.order_amount}`}</td>
                                    <td>
                                        <LinkContainer
                                            to={`/order/${order.id}`}
                                        >
                                            <Button
                                                className='btn-sm'
                                                variant='light'
                                            >
                                                Detail page
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen
