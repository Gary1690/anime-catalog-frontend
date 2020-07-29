import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form} from 'react-bootstrap'

class Signup extends React.Component {

    state = {
        username: "",
        password: "",
        confirmation: "",
        imgUrl: ""
    }

    changeHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()
        if (this.state.password !== this.state.confirmation){
            alert("Your Password does not match!")
        } else {
            fetch('http://localhost:3000/users', {
                method:'POST',
                headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
                },
                body:JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    img_url: this.state.imgUrl
                })
            }
            )
            .then(resp => resp.json())
            .then(user => {
                if(user.id){
                    window.localStorage.setItem("user", JSON.stringify(user))
                    this.props.handleUser(user)
                    this.props.history.push('/profile')
                }else{
                    alert ("Username is already in used.")
                }
               
            })
            .then(this.setState({
                username: "",
                password: "",
                confirmation: "",
                imgUrl: ""
            }))
        }
    }

    render() {
        return (
            <div className="login-form">
                <h1>Sign up</h1>
                <Form onSubmit={this.submitHandler}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" name="username" value={this.state.username} onChange={this.changeHandler}/>
                    </Form.Group>

                    <Form.Group controlId="imgUrl">
                        <Form.Label>User Image</Form.Label>
                        <Form.Control type="text" placeholder="Enter Img URL" name="imgUrl" value={this.state.imgUrl} onChange={this.changeHandler}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.changeHandler}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Re-type Password</Form.Label>
                        <Form.Control type="password" placeholder="Re-Type Password" name="confirmation" value={this.state.confirmation} onChange={this.changeHandler}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Sign up
                    </Button>

                    <Button variant="info" onClick={this.props.toggleNewUser}>
                        Login
                    </Button>
                </Form>
            </div>
        )
    }
}

export default Signup