import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap"
import { addToCart, removeFromCart } from "../actions/cartActions"
import { Link, useNavigate, useParams, useLocation } from "react-router-dom"

const CartScreen = () => {
    const navigate = useNavigate()
    const params = useParams()
    const { search } = useLocation()
    const { id: productId } = params
    const qtyInUrl = new URLSearchParams(search).get("qty")
    const qty = qtyInUrl ? Number(qtyInUrl) : 1

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)

    const { cartItems = [] } = cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [productId, dispatch, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate("/placeorder")
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Cart</h1>
                {cartItems?.length === 0 ? (
                    <Message>
                        Your cart is currently empty <Link to='/'>Back</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush'>
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.book_id}>
                                <Row>
                                    <Col md={2}>
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
                                    <Col md={3}>
                                        <Link to={`/product/${item.book_id}`}>
                                            {item.book_title}
                                        </Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={2}>
                                        <Form.Control
                                            as='select'
                                            value={item.quantity}
                                            onChange={(e) =>
                                                dispatch(
                                                    addToCart(
                                                        item.book_id,
                                                        Number(e.target.value)
                                                    )
                                                )
                                            }
                                        >
                                            {[...Array(8).keys()].map((x) => (
                                                <option
                                                    key={x + 1}
                                                    value={x + 1}
                                                >
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button
                                            type='button'
                                            variant='light'
                                            onClick={() =>
                                                removeFromCartHandler(
                                                    item.book_id
                                                )
                                            }
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>
                                You have (
                                {cartItems.reduce(
                                    (acc, item) => acc + item.quantity,
                                    0
                                )}
                                ) products
                            </h2>
                            $
                            {cartItems
                                .reduce(
                                    (acc, item) =>
                                        acc + item.quantity * item.price,
                                    0
                                )
                                .toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button
                                type='button'
                                className='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
