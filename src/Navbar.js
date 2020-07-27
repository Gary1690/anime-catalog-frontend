import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, FormControl, Form} from 'react-bootstrap'

const NavBar = () => {

    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand to="/">Manga in Motion</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/">Profile</Nav.Link>
                <Nav.Link as={Link} to="/">Pricing</Nav.Link>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
                </Form>
            </Navbar>
        </>
    )
    
}

export default NavBar