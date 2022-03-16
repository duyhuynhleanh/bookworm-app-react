import React from "react"
import { Col, Row } from "react-bootstrap"

const AboutScreen = () => {
    return (
        <>
            <h1 className='py-3 text-center'>Welcome to Bookworm</h1>
            <Row>
                <h5>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Sit amet risus nullam eget felis.
                </h5>
            </Row>
            <Row>
                <Col md={6}>
                    <h1>Our Story</h1>
                    <p className='py-1'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Sit amet risus nullam eget felis.
                    </p>
                    <p className='py-1'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Sit amet risus nullam eget felis.
                    </p>
                    <p className='py-1'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Sit amet risus nullam eget felis.
                    </p>
                </Col>
                <Col md={6}>
                    <h1>Our Vision</h1>
                    <p className='py-1'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Sit amet risus nullam eget felis.
                    </p>
                    <p className='py-1'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Sit amet risus nullam eget felis.
                    </p>
                    <p className='py-1'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Sit amet risus nullam eget felis.
                    </p>
                </Col>
            </Row>
        </>
    )
}

export default AboutScreen
