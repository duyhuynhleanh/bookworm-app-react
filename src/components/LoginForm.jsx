import React from "react"
import FormContainer from "../components/FormContainer"
import { Form, Button, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { login } from "../actions/userActions"
import { useFormik } from "formik"
import * as Yup from "yup"
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify"

const LoginForm = () => {
    const LoginSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password is too short - should be 6 chars minimum"),
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: LoginSchema,
        onSubmit: ({ email, password }) => {
            dispatch(login(email, password))
            toast.configure()
        },
    })

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    return userInfo ? (
        <Message variant='primary'>{` Hello ${userInfo.first_name} ${userInfo.last_name}.\n You can close this popup`}</Message>
    ) : (
        <FormContainer>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        isInvalid={formik.errors.email}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        isInvalid={formik.errors.password}
                    ></Form.Control>
                </Form.Group>
                <Row className='py-3'>
                    <Col>
                        <Button type='submit' variant='primary'>
                            Sign In
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer? <Link to='/register'>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginForm
