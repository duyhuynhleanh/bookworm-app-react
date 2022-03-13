import React from "react"
import { Row } from "react-bootstrap"
import ProductCarousel from "../components/ProductCarousel"
import ProductTabs from "../components/ProductTabs"

const HomeScreen = () => {
    return (
        <>
            <h1>On Sale</h1>
            <ProductCarousel />
            <h1>Featured Books</h1>
            <Row>
                <ProductTabs />
            </Row>
        </>
    )
}

export default HomeScreen
