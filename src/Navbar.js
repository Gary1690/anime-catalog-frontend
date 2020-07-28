import React from 'react'
import {Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, FormControl, Form} from 'react-bootstrap'

const NavBar = (props) => {
    return(
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand  as={Link} to="/">Manga in Motion</Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" value={props.filter} onChange={props.handleSearch}/>
                {
                    props.user
                    ? 
                    <Button variant="outline-info" onClick={props.handleLogout}>Log Out</Button>
                    :
                    <Nav.Link as={Link} to="/login">
                        <Button variant="outline-info">Log In</Button>
                    </Nav.Link>
                }    
                </Form>
            </Navbar>
        </>
    )
    
}

export default NavBar