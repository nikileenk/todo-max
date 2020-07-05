import React, { Component } from 'react';
import NavBarManu from './NavBarManu';
import { Container, Form, Button,Row,Col } from 'react-bootstrap';
import './CompStyle.css';

class TaskCreate extends Component {
    constructor() {
        super();
        this.state = {
            currentState: "Pending",
            title: null,
            des: null,
            created: null,
            due:null,
            priority:"High"
        }
    }
    create() {

        if(this.state.title == null){
            alert("Title cannot be empty")
        }

        else if(this.state.des == null){
            alert("Description cannot be empty")
        }

        else if(this.state.due == null){
            alert("DUE cannot be empty")
        }

        else{
            fetch('http://localhost:3000/task', {
            method: "Post",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(this.state)
        }).then((result)=>{
            result.json().then((resp)=>{
                alert("Task added")
            })
        })
        }
        
    }

    componentDidMount() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        this.setState({created:today,due:today})
    }
    
    render() {
        return (
           
                <Container>
                <NavBarManu />
                <h1>Add Task</h1>
                <div>
                    {}
                <Form>
                    <input onChange={(event) => { this.setState({ currentState: event.target.value }) }}
                        placeholder="CurrentState" style={{display:"none"}} />
                    <br /><br />

                    <Form.Group controlId="formBasicSum">
                        <Form.Label>Summary</Form.Label>
                        <Form.Control type="Text" placeholder="Enter Summary" onChange={(event) => { this.setState({ title: event.target.value }) }} required/>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="3" onChange={(event) => { this.setState({ des: event.target.value }) }} />
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicDate">
                            <Form.Label>DUE</Form.Label>
                            <Form.Control type="Date" placeholder="Enter Summary" onChange={(event) => { this.setState({ due: event.target.value }) }} />
                            </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Priority</Form.Label>
                            <Form.Control as="select" onChange={(event) => { this.setState({ priority: event.target.value }) }}>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                            </Form.Control>
                        </Form.Group>
                        </Col>
                    </Row>

                    <Button variant="primary" onClick={() => { this.create() }} style={{float:"right"}}>
                        Add Task
                    </Button>
                </Form> 
                   


                    {/* <button onClick={() => { this.create() }}>Add Task</button> */}
                </div>

                </Container>
            
        );
    }
}

export default TaskCreate;