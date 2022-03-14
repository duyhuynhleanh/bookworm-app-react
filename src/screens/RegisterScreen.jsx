import React, { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { register } from "../actions/userActions"
import { useFormik } from "formik"
import * as Yup from "yup"

const RegisterScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { search } = useLocation()

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirectInUrl = new URLSearchParams(search).get("redirect")
    const redirect = redirectInUrl ? redirectInUrl : "/"
    const RegistrationSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Required"),
        lastName: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Required"),
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password is too short - should be 6 chars minimum"),
        confirmPassword: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Passwords must match"
        ),
    })

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: RegistrationSchema,
        onSubmit: ({
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        }) => {
            dispatch(
                register(firstName, lastName, email, password, confirmPassword)
            )
        },
    })

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group controlId='firstName'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type='firstName'
                        placeholder='Enter first name'
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        isInvalid={formik.errors.firstName}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='lastName'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type='lastName'
                        placeholder='Enter last name'
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        isInvalid={formik.errors.lastName}
                    ></Form.Control>
                </Form.Group>

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

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        isInvalid={formik.errors.confirmPassword}
                    ></Form.Control>
                </Form.Group>
                <Row className='py-3'>
                    <Col>
                        <Button type='submit' variant='primary'>
                            Register
                        </Button>
                    </Col>
                </Row>
            </Form>
            {/* <Row className='py-3'>
                <Col>
                    Have an Account? <Link to='/login'>Login</Link>
                </Col>
            </Row> */}
        </FormContainer>
    )
}

export default RegisterScreen
