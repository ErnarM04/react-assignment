import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetails from "./pages/ProductDetails";
import {BrowserRouter, Routes, Route} from "react-router";
import About from "./pages/About";
import ProductsList from "./pages/ProductsList";
import Header from "./components/Header";

function App() {

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<ProductsList />} />
                <Route path="/products/:id" element={<ProductDetails />} />

                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );

}

export default App;