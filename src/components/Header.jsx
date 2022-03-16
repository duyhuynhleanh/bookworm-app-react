import { useState, useEffect } from "react"
import SearchBox from "./SearchBox"
import { useDispatch, useSelector } from "react-redux"
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import LoginModal from "./LoginModal"
import { logout } from "../actions/userActions"
import { toast } from "react-toastify"

const Header = () => {
    const [active, setActive] = useState("default")
    const [modalShow, setModalShow] = useState(false)

    const ModalPopUpHandler = () => {
        setModalShow(!modalShow)
    }
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const cart = useSelector((state) => state.cart)

    const { cartItems } = cart

    const logoutHandler = () => {
        dispatch(logout())
        toast.configure()
        toast('🦄 "Logout successfully!"', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    useEffect(() => {
        if (userInfo) {
            setModalShow(false)
        }
    }, [userInfo])
    return (
        <>
            <header>
                <Navbar
                    bg='dark'
                    variant='dark'
                    expand='lg'
                    collapseOnSelect
                    fixed='top'
                >
                    <Container>
                        <LinkContainer to='/'>
                            <Navbar.Brand>BOOKWORM</Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle aria-controls='basic-navbar-nav' />
                        <Navbar.Collapse id='basic-navbar-nav'>
                            <SearchBox />

                            <Nav
                                className='ml-auto'
                                activeKey={active}
                                onSelect={(selectedKey) =>
                                    setActive(selectedKey)
                                }
                            >
                                <LinkContainer to='/'>
                                    <Nav.Link eventKey='default'>Home</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to='/search/keyword/all/category/all/author/all/rating/1/order/sale/perPage/5/pageNumber/1'>
                                    <Nav.Link eventKey='products'>
                                        Shop
                                    </Nav.Link>
                                </LinkContainer>
                                <LinkContainer to='/about'>
                                    <Nav.Link eventKey='about'>About</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to='/cart'>
                                    <Nav.Link eventKey='cart'>
                                        <i className='fas fa-shopping-cart'></i>
                                        Cart (
                                        {cartItems?.length > 0
                                            ? cartItems.reduce(
                                                  (acc, item) =>
                                                      acc + item.quantity,
                                                  0
                                              )
                                            : 0}
                                        )
                                    </Nav.Link>
                                </LinkContainer>
                                {userInfo ? (
                                    <NavDropdown
                                        title={`${userInfo.first_name} ${userInfo.last_name} `}
                                        id='username'
                                    >
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>
                                                Profile
                                            </NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item
                                            onClick={logoutHandler}
                                        >
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                ) : (
                                    <Nav.Link
                                        eventKey='login'
                                        onClick={ModalPopUpHandler}
                                    >
                                        <i className='fas fa-user'></i> Login
                                    </Nav.Link>
                                )}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <LoginModal show={modalShow} toggle={ModalPopUpHandler} />
        </>
    )
}

export default Header
