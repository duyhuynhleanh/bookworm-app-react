import React, { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap"
import Rating from "../components/Rating"
import Message from "../components/Message"
import Loader from "../components/Loader"
import {
    listProductDetails,
    listProductRatingDetails,
    listSearchReviews,
} from "../actions/productActions"
import { toast } from "react-toastify"

const ProductScreen = () => {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const {
        id: productId,
        rating = 1,
        order = "desc",
        paginate = 1,
        perPage = 5,
        pageNumber = 1,
    } = params

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const productRatingDetails = useSelector(
        (state) => state.productRatingDetails
    )
    const {
        loading: loadingRatingDetails,
        error: errorRatingDetails,
        rating: ratingDetails,
    } = productRatingDetails

    const productListSearchReview = useSelector(
        (state) => state.productListSearchReview
    )
    const {
        loading: loadingReview,
        error: errorReview,
        reviews,
        page,
        pages,
        from,
        to,
        total,
        per_page,
    } = productListSearchReview

    const getFilterUrl = (filter) => {
        const filterProductId = filter.productId || productId
        const filterRating = filter.rating || rating
        const filterOrder = filter.order || order
        const filterPaginate = filter.paginate || paginate
        const filterPerPage = filter.perPage || perPage
        const filterPage = filter.page || pageNumber

        return `/product/${filterProductId}/rating/${filterRating}/order/${filterOrder}/paginate/${filterPaginate}/perPage/${filterPerPage}/pageNumber/${filterPage}`
    }

    useEffect(() => {
        dispatch(listProductDetails(productId))
        dispatch(listProductRatingDetails(productId))
        dispatch(
            listSearchReviews({
                productId: productId,
                rating: rating !== 1 ? rating : 1,
                sortOrder: order !== "desc" ? order : "desc",
                paginate: paginate !== 1 ? paginate : 1,
                perPage: perPage !== 5 ? perPage : 5,
                page: pageNumber !== 1 ? pageNumber : 1,
            })
        )
    }, [dispatch, productId])

    const addToCartHandler = () => {
        toast.configure()
        toast(`Added ${qty} product to the cart`, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        navigate(`/cart/${productId}?qty=${qty}`)
    }

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Trở lại
            </Link>
            {product && loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        <Col md={6}>
                            <Image
                                fluid
                                src={
                                    product.book_cover_photo
                                        ? `/images/${product.book_cover_photo}.jpg`
                                        : `/images/default.jpg`
                                }
                                alt={product.book_title}
                            />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.book_title}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={Number(product.rating)}
                                        text={`${product.numReviews} reviews`}
                                    />
                                </ListGroup.Item>
                                {product.book_price > product.final_price ? (
                                    <ListGroup.Item
                                        className='text-muted'
                                        style={{
                                            textDecorationLine: "line-through",
                                            textDecorationStyle: "solid",
                                        }}
                                    >
                                        Book Price: ${product.book_price}
                                    </ListGroup.Item>
                                ) : (
                                    <ListGroup.Item>
                                        Book Price: ${product.book_price}
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    Book Description: {product.book_summary}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Final Price:</Col>
                                            <Col>
                                                <strong>
                                                    ${product.final_price}
                                                </strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Author:</Col>
                                            <Col>
                                                {product.author?.author_name}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Category:</Col>
                                            <Col>
                                                {
                                                    product.category
                                                        ?.category_name
                                                }
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Quantity</Col>
                                            <Col>
                                                <Form.Control
                                                    as='select'
                                                    value={qty}
                                                    onChange={(e) =>
                                                        setQty(e.target.value)
                                                    }
                                                >
                                                    {[...Array(8).keys()].map(
                                                        (x) => (
                                                            <option
                                                                key={x + 1}
                                                                value={x + 1}
                                                            >
                                                                {x + 1}
                                                            </option>
                                                        )
                                                    )}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Button
                                            onClick={addToCartHandler}
                                            className='btn-block'
                                            type='button'
                                        >
                                            Add to cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}

export default ProductScreen
