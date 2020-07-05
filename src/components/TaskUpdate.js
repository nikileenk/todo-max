import React, { Component } from 'react';
import { Container, Form, Button,Row,Col } from 'react-bootstrap'
import NavBarManu from './NavBarManu';
import './CompStyle.css';

class TaskUpdate extends Component {
    constructor()
    {
        super();
        this.state = {
            currentState: "pending",
            title: null,
            des: null,
            created: null,
            due:null,
            priority:null
        }
    }
    componentDidMount()
    { 
        
        fetch('http://localhost:3000/task/'+this.props.match.params.id).then((response) => {
            response.json().then((result) => {
                console.warn(result)
                 this.setState({
                    id:result.id,
                    currentState:result.currentState,
                    title:result.title,
                    des:result.des,
                    created:result.created,
                    due:result.due,
                    priority:result.priority

                  })
            })
        })
    }



    update()
    {
        fetch('http://localhost:3000/task/'+this.state.id, {
            method: "PUT",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(this.state)
        }).then((result)=>{
            result.json().then((resp)=>{
                alert("Task Updated")
            })
        })
    }
    render() {
        
        return (
            <Container>
                <NavBarManu />
        <h1>Update Task : {this.state.title}</h1>
                <div>

                <Form>
                    <input onChange={(event) => { this.setState({ currentState: event.target.value }) }}
                        placeholder="CurrentState" style={{display:"none"}} />
                    <br /><br />

                    <Form.Group controlId="formBasicSum">
                        <Form.Label>Summary</Form.Label>
                        <Form.Control type="Text" placeholder="Enter Summary" onChange={(event) => { this.setState({ title: event.target.value }) }} value={this.state.title} />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="3" onChange={(event) => { this.setState({ des: event.target.value }) }} value={this.state.des} />
                    </Form.Group>

                    <Row>
                        <Col>
                            <Form.Group controlId="formBasicDate">
                            <Form.Label>DUE</Form.Label>
                            <Form.Control type="Date" placeholder="Enter Summary" onChange={(event) => { this.setState({ due: event.target.value }) }} value={this.state.due} />
                            </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Priority</Form.Label>
                            <Form.Control as="select" onChange={(event) => { this.setState({ priority: event.target.value }) }} value={this.state.priority}>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                            </Form.Control>
                        </Form.Group>
                        </Col>
                    </Row><br/>

                    <Button variant="primary" onClick={() => { this.update() }} style={{float:"right"}}>
                    Update Task
                    </Button>
                    </Form>

                <input onChange={(event) => { this.setState({ currentState: event.target.value }) }}
                        placeholder="currentState" value={this.state.currentState} style={{display:"none"}} /> <br /><br />

                    {/* <input onChange={(event) => { this.setState({ title: event.target.value }) }}
                        placeholder="Title" value={this.state.title} style={{display:"none"}}/> <br /><br />

                    <input onChange={(event) => { this.setState({ des: event.target.value }) }}
                        placeholder="Description"  value={this.state.des}/> <br /><br /> */}

                    <input onChange={(event) => { this.setState({ created: event.target.value }) }}
                        placeholder="Created"  value={this.state.created} style={{display:"none"}}/> <br /><br />

                    {/* <input onChange={(event) => { this.setState({ due: event.target.value }) }}
                        placeholder="Due"  value={this.state.due}/> <br /><br />

                    <input onChange={(event) => { this.setState({ priority: event.target.value }) }}
                        placeholder="Priority"  value={this.state.priority}/> <br /><br /> */}

                    {/* <button onClick={() => { this.update() }}>Update Task</button> */}
                </div>
           </Container>
        );
    }
}

export default TaskUpdate;