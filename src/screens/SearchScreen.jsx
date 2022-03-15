import React, { useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import MyPagination from "../components/MyPagination"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader"
import { Row, Col, ListGroup, Container, Form } from "react-bootstrap"
import Message from "../components/Message"
import { listSearchProducts } from "../actions/productActions"
import Rating from "../components/Rating"
import { ratings } from "../util"
import Product from "../components/Product"

const SearchScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {
        keyword = "all",
        category = "all",
        author = "all",
        order = "sale",
        rating = 1,
        perPage = 5,
        pageNumber = 1,
    } = useParams()
    const categoryList = useSelector((state) => state.categoryList)
    const {
        loading: loadingCategories,
        error: errorCategories,
        categories,
    } = categoryList

    const authorList = useSelector((state) => state.authorList)
    const { loading: loadingAuthors, error: errorAuthors, authors } = authorList

    const productListSearch = useSelector((state) => state.productListSearch)
    const { loading, error, products, from, to, total, per_page, page, pages } =
        productListSearch

    const getFilterUrl = (filter) => {
        const filterKeyword = filter.keyword || keyword
        const filterCategory = filter.category || category
        const filterAuthor = filter.author || author
        const filterRating = filter.rating || rating
        const filterOrder = filter.order || order
        const filterPerPage = filter.perPage || perPage
        const filterPage = filter.page || pageNumber

        return `/search/keyword/${filterKeyword}/category/${filterCategory}/author/${filterAuthor}/rating/${filterRating}/order/${filterOrder}/perPage/${filterPerPage}/pageNumber/${filterPage}`
    }

    useEffect(() => {
        dispatch(
            listSearchProducts({
                keyword: keyword !== "all" ? keyword : "",
                category: category !== "all" ? category : "",
                author: author !== "all" ? author : "",
                sortOrder: order !== "sale" ? order : "sale",
                rating: rating !== 1 ? rating : 1,
                perPage: perPage !== 5 ? perPage : 5,
                page: pageNumber !== 1 ? pageNumber : 1,
            })
        )
    }, [
        keyword,
        category,
        author,
        order,
        rating,
        perPage,
        pageNumber,
        dispatch,
    ])
    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <>
            <Row>
                <Col className='text-center'>
                    Books filtered by category:{" "}
                    {category !== "all"
                        ? categories[category - 1]?.category_name
                        : "all"}
                </Col>
                <Col className='text-center'>
                    Books filtered by author:{" "}
                    {author !== "all"
                        ? authors[author - 1]?.author_name
                        : "all"}
                </Col>
                <Col className='text-center'>
                    Books filtered by rating: {rating !== 1 ? rating : 1}
                </Col>
            </Row>
            <Row>
                <Col className='text-left' md={8}>
                    <h3>
                        Showing {Number(per_page)} results from {from} to {to}{" "}
                        of {total}
                    </h3>
                </Col>
                <Col md={2}>
                    <Form.Control
                        as='select'
                        value={order}
                        onChange={(e) => {
                            navigate(getFilterUrl({ order: e.target.value }))
                        }}
                    >
                        <option value='sale'>Sort by on sale</option>
                        <option value='popular'>Sort by popularity</option>
                        <option value='priceASC'>
                            Sort by price low to high
                        </option>
                        <option value='priceDESC'>
                            Sort by price high to low
                        </option>
                    </Form.Control>
                </Col>
                <Col md={2}>
                    <Form.Control
                        as='select'
                        value={perPage}
                        onChange={(e) => {
                            navigate(getFilterUrl({ perPage: e.target.value }))
                        }}
                    >
                        <option value={5}>Show 5</option>
                        <option value={15}>Show 10</option>
                        <option value={20}>Show 20</option>
                        <option value={25}>Show 25</option>
                    </Form.Control>
                </Col>
            </Row>
            <Row>
                <Col sm={4} md={3} lg={2}>
                    <h3 className='text-center'>Filter</h3>
                    <>
                        <h5 className='text-center'>By category</h5>
                        {loadingCategories ? (
                            <Loader />
                        ) : errorCategories ? (
                            <Message variant='danger'>
                                {errorCategories}
                            </Message>
                        ) : (
                            <ListGroup variant='flush'>
                                <ListGroup.Item as='button'>
                                    <Link
                                        className={
                                            "all" === category ? "active" : ""
                                        }
                                        to={getFilterUrl({ category: "all" })}
                                    >
                                        Any
                                    </Link>
                                </ListGroup.Item>
                                {categories.map((c) => (
                                    <ListGroup.Item as='button' key={c.id}>
                                        <Link
                                            className={
                                                c.id === category
                                                    ? "active"
                                                    : ""
                                            }
                                            to={getFilterUrl({
                                                category: c.id,
                                            })}
                                        >
                                            {c.category_name}
                                        </Link>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </>
                    <>
                        <h5 className='text-center'>By author</h5>
                        {loadingAuthors ? (
                            <Loader />
                        ) : errorAuthors ? (
                            <Message variant='danger'>{errorAuthors}</Message>
                        ) : (
                            <ListGroup variant='flush'>
                                <ListGroup.Item as='button'>
                                    <Link
                                        className={
                                            "all" === author ? "active" : ""
                                        }
                                        to={getFilterUrl({ author: "all" })}
                                    >
                                        Any
                                    </Link>
                                </ListGroup.Item>
                                {authors.map((a) => (
                                    <ListGroup.Item as='button' key={a.id}>
                                        <Link
                                            to={getFilterUrl({
                                                author: a.id,
                                            })}
                                            className={
                                                a.id === author ? "active" : ""
                                            }
                                        >
                                            {a.author_name}
                                        </Link>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </>
                    <>
                        <h5 className='text-center'>By rating</h5>
                        <ListGroup variant='flush'>
                            {ratings.map((r) => (
                                <ListGroup.Item as='button' key={r.name}>
                                    <Link
                                        to={getFilterUrl({ rating: r.rating })}
                                        className={
                                            `${r.rating}` === `${rating}`
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        <Rating
                                            value={r.rating}
                                            text='& up'
                                        ></Rating>
                                    </Link>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </>
                </Col>
                <Col sm={8} md={9} lg={10}>
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant='danger'>{error}</Message>
                    ) : (
                        <>
                            {products?.length > 0 ? (
                                <>
                                    <Row sm={1} md={2} lg={3}>
                                        {products.map((product) => (
                                            <Container key={product.id}>
                                                <Product product={product} />
                                            </Container>
                                        ))}
                                    </Row>

                                    {pages &&
                                        pages >
                                            1(
                                                <Row className='align-items-center'>
                                                    <Col lg='auto'>
                                                        <MyPagination
                                                            totPages={pages}
                                                            currentPage={page}
                                                            pageClicked={(
                                                                ele
                                                            ) => {
                                                                navigate(
                                                                    getFilterUrl(
                                                                        {
                                                                            page: ele,
                                                                        }
                                                                    )
                                                                )
                                                            }}
                                                        ></MyPagination>
                                                    </Col>
                                                </Row>
                                            )}
                                </>
                            ) : (
                                <Message>No Products Found</Message>
                            )}
                        </>
                    )}
                </Col>
            </Row>
        </>
    )
}

export default SearchScreen
