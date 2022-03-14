import React, { useEffect } from "react"
import { Tabs, Tab, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Loader from "./Loader"
import Message from "./Message"
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
        <>
            <Tabs
                defaultActiveKey='recommend'
                id='id="uncontrolled-tab-example"'
            >
                <Tab eventKey='recommend' title='Recommend'>
                    {recommendProducts?.length > 0 && loadingRecommend ? (
                        <Loader />
                    ) : errorRecommend ? (
                        <Message variant='danger'>{errorRecommend}</Message>
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
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                    )}
                </Tab>

                <Tab eventKey='Popular' title='Popular'>
                    {popularProducts.length > 0 && loadingPopular ? (
                        <Loader />
                    ) : errorPopular ? (
                        <Message variant='danger'>{errorPopular}</Message>
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
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                    )}
                </Tab>
            </Tabs>
        </>
    )
}

export default ProductTabs
