import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Container } from "react-bootstrap"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen"
import RegisterScreen from "./screens/RegisterScreen"
import AboutScreen from "./screens/AboutScreen"
import Message from "./components/Message"
import ProductScreen from "./screens/ProductScreen"
import CartScreen from "./screens/CartScreen"
import ProfileScreen from "./screens/ProfileScreen"
import SearchScreen from "./screens/SearchScreen"
import { getAllCategories, getAllAuthors } from "./actions/productActions"

const App = () => {
    const dispatch = useDispatch()
    const categoryList = useSelector((state) => state.categoryList)
    const {
        loading: loadingCategories,
        error: errorCategories,
        categories,
    } = categoryList

    const authorList = useSelector((state) => state.authorList)
    const { loading: loadingAuthors, error: errorAuthors, authors } = authorList
    useEffect(() => {
        dispatch(getAllCategories())
        dispatch(getAllAuthors())
    }, [dispatch])
    return (
        <Router>
            <Header />
            <main className='py-3'>
                <Container>
                    <Routes>
                        <Route path='/' element={<HomeScreen />} />
                        <Route
                            path='/product/:id'
                            element={<ProductScreen />}
                        />
                        <Route path='/cart' element={<CartScreen />}></Route>
                        <Route
                            path='/cart/:id'
                            element={<CartScreen />}
                        ></Route>
                        <Route path='/register' element={<RegisterScreen />} />
                        <Route path='/profile' element={<ProfileScreen />} />
                        <Route path='/about' element={<AboutScreen />} />
                        <Route
                            path='/search/keyword'
                            element={<SearchScreen />}
                            exact
                        ></Route>
                        <Route
                            path='/search/keyword/:keyword'
                            element={<SearchScreen />}
                            exact
                        ></Route>
                        <Route
                            path='/search/category/:category'
                            element={<SearchScreen />}
                            exact
                        ></Route>
                        <Route
                            path='/search/category/:category/keyword/:keyword'
                            element={<SearchScreen />}
                            exact
                        ></Route>
                        <Route
                            path='/search/category/:category/keyword/:keyword/author/:author/order/:order/rating/:rating/perPage/:perPage/page/:page'
                            element={<SearchScreen />}
                            exact
                        ></Route>
                    </Routes>
                </Container>
            </main>
            <Footer />
        </Router>
    )
}

export default App
