import React, { useState, useEffect } from "react"
import LoginModal from "../components/LoginModal"
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import { Link, useNavigate } from "react-router-dom"
import { createOrder } from "../actions/orderActions"
import { ORDER_CREATE_RESET } from "../constants/orderConstants"
import { USER_DETAILS_RESET } from "../constants/userConstants"
import { toast } from "react-toastify"

const PlaceOrderScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const [modalShow, setModalShow] = useState(false)

    const orderCreate = useSelector((state) => state.orderCreate)

    const { order, success, error } = orderCreate

    const cart = useSelector((state) => state.cart)

    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    cart.itemsPrice = addDecimals(
        cart?.cartItems?.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        )
    )

    cart.totalPrice = Number(cart.itemsPrice).toFixed(2)

    useEffect(() => {
        if (!userInfo) {
            setModalShow(true)
        } else {
            setModalShow(false)
        }
        if (success) {
            toast("Order success!", {
                position: "bottom-right",
                autoClose: 10000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            navigate(`/order/${order.id}`)
            dispatch({ type: USER_DETAILS_RESET })
            dispatch({ type: ORDER_CREATE_RESET })
        }
        // eslint-disable-next-line
    }, [navigate, success, userInfo])

    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                totalPrice: cart.totalPrice,
            })
        )
    }

    return (
        <>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems !== undefined ? (
                                <ListGroup variant='flush'>
                                    {cart?.cartItems?.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={
                                                            item.book_cover_photo
                                                                ? `/images/${item.book_cover_photo}.jpg`
                                                                : `/images/default.jpg`
                                                        }
                                                        alt={item.book_title}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link
                                                        to={`/product/${item.book_id}`}
                                                    >
                                                        {item.book_title}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.quantity} x $
                                                    {item.price} = $
                                                    {item.quantity * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : (
                                <Message>
                                    Your cart is currently empty{" "}
                                    <Link to='/'>Go Back</Link>
                                </Message>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order details</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && (
                                    <Message variant='danger'>{error}</Message>
                                )}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    onClick={placeOrderHandler}
                                >
                                    Place order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <LoginModal show={modalShow} />
        </>
    )
}

export default PlaceOrderScreen
