import React from "react"
import { Row } from "react-bootstrap"
import ProductCarousel from "../components/ProductCarousel"
import ProductTabs from "../components/ProductTabs"
import { Link } from "react-router-dom"

const HomeScreen = () => {
    return (
        <>
            <Row>
                <h1>On Sale</h1>

                <Link
                    className='btn btn-dark my-2 ml-auto'
                    to='search/keyword/all'
                >
                    View All
                </Link>
            </Row>
            <ProductCarousel />
            <h1>Featured Books</h1>
            <Row>
                <ProductTabs />
            </Row>
        </>
    )
}

export default HomeScreen
