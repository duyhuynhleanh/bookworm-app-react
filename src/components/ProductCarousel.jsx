import React, { useEffect } from "react"
import { Carousel, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Loader from "./Loader"
import Message from "./Message"
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
    return products && loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <Carousel pause='hover' className='bg-light' variant='light'>
            {result.map((chunk) => (
                <Carousel.Item as='div' key={chunk[0].id}>
                    <Row sm={2} md={3} lg={4}>
                        {chunk.map((product) => (
                            <div key={product.id}>
                                <Product product={product} />
                            </div>
                        ))}
                    </Row>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default ProductCarousel
