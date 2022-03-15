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
import { format, parseISO } from "date-fns"
import { ratings } from "../util"
import MyPagination from "../components/MyPagination"

const ProductScreen = () => {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const {
        id: productId,
        rating = 0,
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
                rating: rating !== 0 ? rating : 0,
                sortOrder: order !== "desc" ? order : "desc",
                paginate: paginate !== 1 ? paginate : 1,
                perPage: perPage !== 5 ? perPage : 5,
                page: pageNumber !== 1 ? pageNumber : 1,
            })
        )
    }, [dispatch, productId, rating, order, paginate, perPage, pageNumber])

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
                Back
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
                    <Row>
                        <Col md={6}>
                            <Row>
                                <h2>
                                    Review:{" "}
                                    {rating !== 0
                                        ? `filtered by ${rating}`
                                        : ""}
                                </h2>
                            </Row>
                            {ratingDetails?.length > 0 ? (
                                <Col>
                                    <ListGroup variant='flush'>
                                        {ratingDetails?.map((r) => (
                                            <ListGroup.Item
                                                as='button'
                                                key={r.rating_start}
                                            >
                                                <Link
                                                    to={getFilterUrl({
                                                        rating: r.rating_start,
                                                    })}
                                                >
                                                    <Rating
                                                        value={r.rating_start}
                                                        text={`${r.rating_start} sao (${r.quantity})`}
                                                    ></Rating>
                                                </Link>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Col>
                            ) : null}
                            <Row>
                                <Col md={6}>
                                    <Form.Control
                                        as='select'
                                        value={order}
                                        onChange={(e) => {
                                            navigate(
                                                getFilterUrl({
                                                    order: e.target.value,
                                                })
                                            )
                                        }}
                                    >
                                        <option value='desc'>
                                            Sort by date: newest to oldest
                                        </option>
                                        <option value='asc'>
                                            Sort by date: oldest to newest
                                        </option>
                                    </Form.Control>
                                </Col>
                                <Col md={6}>
                                    <Form.Control
                                        as='select'
                                        value={perPage}
                                        onChange={(e) => {
                                            navigate(
                                                getFilterUrl({
                                                    perPage: e.target.value,
                                                })
                                            )
                                        }}
                                    >
                                        <option value={5}>Show 5</option>
                                        <option value={15}>Show 10</option>
                                        <option value={20}>Show 20</option>
                                        <option value={25}>Show 25</option>
                                    </Form.Control>
                                </Col>
                            </Row>
                            {reviews?.length === 0 && (
                                <Message>
                                    This product doesn't have any review!
                                </Message>
                            )}
                            <ListGroup variant='flush'>
                                {reviews?.map((review) => (
                                    <ListGroup.Item key={review.id}>
                                        <strong>{review.review_title}</strong>
                                        <Rating value={review.rating_start} />
                                        <p>
                                            {format(
                                                parseISO(review.review_date),
                                                "MMMM/dd/yyyy"
                                            )}
                                        </p>
                                        <p>{review.review_details}</p>
                                    </ListGroup.Item>
                                ))}
                                {pages && pages > 1 ? (
                                    <Row>
                                        <MyPagination
                                            totPages={pages}
                                            currentPage={page}
                                            pageClicked={(ele) => {
                                                navigate(
                                                    getFilterUrl({
                                                        page: ele,
                                                    })
                                                )
                                            }}
                                        />
                                    </Row>
                                ) : null}
                            </ListGroup>
                        </Col>
                        <Col md={6}>
                            <ListGroup>
                                <ListGroup.Item>
                                    <h2>Write a review</h2>
                                    {successProductReview && (
                                        <Message variant='success'>
                                            Review success!
                                        </Message>
                                    )}
                                    {loadingProductReview && <Loader />}
                                    {errorProductReview && (
                                        <Message variant='danger'>
                                            {errorProductReview}
                                        </Message>
                                    )}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>
                                                    Đánh giá
                                                </Form.Label>
                                                <Form.Control
                                                    as='select'
                                                    value={rating}
                                                    onChange={(e) =>
                                                        setRating(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value=''>
                                                        Chọn...
                                                    </option>
                                                    <option value='1'>
                                                        1 - Tệ
                                                    </option>
                                                    <option value='2'>
                                                        2 - Tạm
                                                    </option>
                                                    <option value='3'>
                                                        3 - Tốt
                                                    </option>
                                                    <option value='4'>
                                                        4 - Rất tốt
                                                    </option>
                                                    <option value='5'>
                                                        5 - Tuyệt vời
                                                    </option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>
                                                    Bình luận
                                                </Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    row='3'
                                                    value={comment}
                                                    onChange={(e) =>
                                                        setComment(
                                                            e.target.value
                                                        )
                                                    }
                                                ></Form.Control>
                                            </Form.Group>
                                            <Button
                                                disabled={loadingProductReview}
                                                type='submit'
                                                variant='primary'
                                            >
                                                Gửi
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message>
                                            Vui lòng{" "}
                                            <Link to='/login'>đăng nhập</Link>{" "}
                                            để viết nhận xét{" "}
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}

export default ProductScreen
