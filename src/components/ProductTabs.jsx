import React, { useEffect } from "react"
import { Tabs, Tab, Row, Col, Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Loader from "./Loader"
import Message from "./Message"
import { Link } from "react-router-dom"
import Product from "./Product"
import {
    listTopPopularProducts,
    listTopRecommendProducts,
} from "../actions/productActions"

const ProductTabs = () => {
    const dispatch = useDispatch()

    const productTopRecommend = useSelector(
        (state) => state.productTopRecommend
    )

    const {
        loading: loadingRecommend,
        error: errorRecommend,
        recommendProducts,
    } = productTopRecommend

    const productTopPopular = useSelector((state) => state.productTopPopular)

    const {
        loading: loadingPopular,
        error: errorPopular,
        popularProducts,
    } = productTopPopular

    useEffect(() => {
        dispatch(listTopRecommendProducts())
        dispatch(listTopPopularProducts())
    }, [dispatch])
    return (
        <Container>
            <Row>
                <Col>
                    <Tabs
                        defaultActiveKey='recommend'
                        id='id="uncontrolled-tab-example"'
                    >
                        <Tab eventKey='recommend' title='Recommend'>
                            {loadingRecommend ? (
                                <Loader />
                            ) : errorRecommend ? (
                                <Message variant='danger'>
                                    {errorRecommend}
                                </Message>
                            ) : (
                                <Row>
                                    {recommendProducts.map((product) => (
                                        <Col
                                            key={product.id}
                                            sm={12}
                                            md={6}
                                            lg={4}
                                            xl={3}
                                        >
                                            <Link to={`/product/${product.id}`}>
                                                <Product product={product} />
                                            </Link>
                                        </Col>
                                    ))}
                                </Row>
                            )}
                        </Tab>

                        <Tab eventKey='Popular' title='Popular'>
                            {loadingPopular ? (
                                <Loader />
                            ) : errorPopular ? (
                                <Message variant='danger'>
                                    {errorPopular}
                                </Message>
                            ) : (
                                <Row>
                                    {popularProducts.map((product) => (
                                        <Col
                                            key={product.id}
                                            sm={12}
                                            md={6}
                                            lg={4}
                                            xl={3}
                                        >
                                            <Link to={`/product/${product.id}`}>
                                                <Product product={product} />
                                            </Link>
                                        </Col>
                                    ))}
                                </Row>
                            )}
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
        </Container>
    )
}

export default ProductTabs
