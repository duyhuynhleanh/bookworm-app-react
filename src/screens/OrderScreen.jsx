import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getOrderDetails } from "../actions/orderActions"
import LoginModal from "../components/LoginModal"

const OrderScreen = () => {
    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const { id: orderId } = useParams()
    const [modalShow, setModalShow] = useState(false)
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            setModalShow(true)
        }

        if (!order) {
            dispatch(getOrderDetails(orderId))
        }
    }, [dispatch, orderId, order, userInfo])

    if (!loading) {
        //   Calculate prices
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        order.itemsPrice = addDecimals(
            order?.order_items?.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            )
        )
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <>
            <a className='btn btn-light my-3' href='/'>
                Back
            </a>
            <h1>Details for order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Items</h2>
                            {order.order_items.length === 0 ? (
                                <Message>Order empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {order.order_items.map((item) => (
                                        <ListGroup.Item key={item.book_id}>
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
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total price</Col>
                                    <Col>${order.order_amount}</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            <LoginModal show={modalShow} />
        </>
    )
}

export default OrderScreen
