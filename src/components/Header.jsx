import React from "react";
import { Link, useLocation } from "react-router";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";

function Header() {
    const location = useLocation();

    return (
        <Navbar expand="lg" bg="dark" variant="dark" className="shadow-sm sticky-top">
            <Container fluid className="px-5">
                <Navbar.Brand as={Link} to="/" className="fw-bold fs-4 text-light">
                    FakeStore
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        navbarScroll
                    >
                        <Nav.Link
                            as={Link}
                            to="/"
                            className={location.pathname === "/" ? "active fw-semibold" : ""}
                        >
                            Home
                        </Nav.Link>

                        <Nav.Link
                            as={Link}
                            to="/products"
                            className={location.pathname === "/products" ? "active fw-semibold" : ""}
                        >
                            Products
                        </Nav.Link>

                        <Nav.Link
                            as={Link}
                            to="/about"
                            className={location.pathname === "/about" ? "active fw-semibold" : ""}
                        >
                            About
                        </Nav.Link>
                    </Nav>

                    <Form className="d-flex align-items-center gap-2">
                        <Button as={Link} to="/login" variant="outline-light" className="rounded-pill px-3">
                            Login
                        </Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
