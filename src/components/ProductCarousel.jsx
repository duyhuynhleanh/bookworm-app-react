import React, { useEffect } from "react"
import { Carousel, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Loader from "./Loader"
import Message from "./Message"
import { Link } from "react-router-dom"
import Product from "./Product"
import { listTopDiscountProducts } from "../actions/productActions"

const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productTopDiscount = useSelector((state) => state.productTopDiscount)

    const { loading, error, products } = productTopDiscount

    useEffect(() => {
        dispatch(listTopDiscountProducts())
    }, [dispatch])

    const perChunk = 4 // items per chunk
    const result = products.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / perChunk)

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
        }

        resultArray[chunkIndex].push(item)

        return resultArray
    }, [])
    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <Carousel pause='hover' className='bg-light' variant='light'>
            {result.map((chunk) => (
                <Carousel.Item key={chunk[0].id}>
                    <Row>
                        {chunk.map((product) => (
                            <Col key={product.id} sm={3}>
                                <Link to={`/product/${product.id}`}>
                                    <Product product={product} />
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default ProductCarousel
