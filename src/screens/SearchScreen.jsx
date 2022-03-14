import React, { useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader"
import { Row, Col, ListGroup, Card, Image } from "react-bootstrap"
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
        rating = 0,
        perPage = 5,
        page = 1,
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
    const { loading, error, products } = productListSearch

    const getFilterUrl = (filter) => {
        const filterKeyword = filter.keyword || keyword
        const filterCategory = filter.category || category
        const filterAuthor = filter.author || author
        const filterRating = filter.rating || rating
        const filterOrder = filter.order || order
        const filterPerPage = filter.perPage || perPage
        const filterPage = filter.page || page

        return `/search/keyword/${filterKeyword}/category/${filterCategory}/author/${filterAuthor}/rating/${filterRating}/order/${filterOrder}/perPage/${filterPerPage}/page/${filterPage}`
    }

    useEffect(() => {
        dispatch(
            listSearchProducts({
                keyword: keyword !== "all" ? keyword : "",
                category: category !== "all" ? category : "",
                author: author !== "all" ? author : "",
                sortOrder: order !== "sale" ? order : "sale",
                rating: rating !== 0 ? rating : 0,
                perPage: perPage !== 5 ? perPage : 5,
                page: page !== 1 ? page : 1,
            })
        )
    }, [keyword, category, author, order, rating, perPage, page, dispatch])
    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <>
            <Row>
                <div className='ml-auto'>
                    Sort by:
                    <select
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
                    </select>
                </div>
            </Row>
            <Row>
                <Col sm={4} md={3} lg={2}>
                    <h3>Category</h3>
                    <div>
                        {loadingCategories ? (
                            <Loader />
                        ) : errorCategories ? (
                            <Message variant='danger'>
                                {errorCategories}
                            </Message>
                        ) : (
                            <ListGroup>
                                <ListGroup.Item>
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
                                    <ListGroup.Item key={c.id}>
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
                    </div>
                    <div>
                        <h3>Author</h3>
                        <ListGroup>
                            <ListGroup.Item>
                                <Link
                                    className={"all" === author ? "active" : ""}
                                    to={getFilterUrl({ author: "all" })}
                                >
                                    Any
                                </Link>
                            </ListGroup.Item>
                            {authors.map((a) => (
                                <ListGroup.Item key={a.id}>
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
                    </div>
                    <div>
                        <h3>Rating</h3>
                        <ListGroup>
                            {ratings.map((r) => (
                                <ListGroup.Item key={r.name}>
                                    <Link
                                        to={getFilterUrl({ rating: r.rating })}
                                        className={
                                            `${r.rating}` === `${rating}`
                                                ? "active"
                                                : ""
                                        }
                                    >
                                        <Rating
                                            text={" & up"}
                                            value={r.rating}
                                        ></Rating>
                                    </Link>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                </Col>
                <Col sm={8} md={9} lg={10}>
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant='danger'>{error}</Message>
                    ) : (
                        <>
                            <div>{products?.length} Results</div>
                            {products?.length > 0 ? (
                                <Row sm={2} md={3} lg={4}>
                                    {products.map((product) => (
                                        <Link
                                            key={product.id}
                                            to={`/product/${product.id}`}
                                        >
                                            <Product product={product} />
                                        </Link>
                                    ))}
                                </Row>
                            ) : (
                                <Message>No Product Found</Message>
                            )}
                        </>
                    )}
                </Col>
            </Row>
        </>
    )
}

export default SearchScreen
