import React, { Component } from 'react';
import { Button,Form, Container } from 'react-bootstrap';
import NavBarManu from './NavBarManu';
import './CompStyle.css';
class Login extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            password: ''
        }
    }
    login() {
        console.warn(this.state)
        fetch("http://localhost:3000/login?q=" + this.state.name).then((data) => {
            data.json().then((resp) => {
                console.warn("resp", resp)
                if (resp.length > 0) {
                    localStorage.setItem('login',JSON.stringify(resp))
                    console.warn(this.props.history.push('/'))
                }
                else {
                    alert("Pelase check username and password")
                }

            })
        })
    }
    render() {
        return (
            <div>
                 <Container>
                {/* <NavBarManu /> */}
                <br/><br/>
                   <div className="login">
                       <h3>ToDo App</h3><br/>
                    <Form.Group controlId="formBasicSum">
                        <Form.Label>Enter Name</Form.Label>
                        <Form.Control type="Text" placeholder="enter name" name="user" onChange={(event) => this.setState({ name: event.target.value })} defaultValue="admin" required/>
                    </Form.Group>
                

                    <Form.Group controlId="formBasicSum">
                        <Form.Label>Enter Password</Form.Label>
                        <Form.Control type="password" placeholder="enter password" name="password" onChange={(event) => this.setState({ password: event.target.value })}defaultValue="admin" required/>
                    </Form.Group>
            

                    <Button variant="primary" onClick={() => { this.login() }}>
                        Login
                    </Button>
                    <br/>
                    <p>NOTE: Please Check JSON API Server is Started</p>
                    </div>
                    </Container>

            </div>
        );
    }
}

export default Login;