import React from "react"
import { Modal, Button } from "react-bootstrap"
import LoginForm from "./LoginForm"

const LoginModal = ({ show, toggle }) => {
    return (
        <>
            <Modal show={show} onHide={toggle} autoFocus>
                <Modal.Header>
                    <Modal.Title>Login</Modal.Title>
                    {toggle && (
                        <Button size='sm' onClick={toggle}>
                            <i className='fas fa-times'></i>
                        </Button>
                    )}
                </Modal.Header>
                <Modal.Body>
                    <LoginForm />
                </Modal.Body>
            </Modal>
        </>
    )
}

export default LoginModal
