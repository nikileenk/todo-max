import React, { Component } from 'react';
import { Container,Form,Button,Col } from 'react-bootstrap';
import NavBarManu from './NavBarManu'

class StUpdate extends Component {
    constructor()
    {
        super();
        this.state = {
            currentState: "Pending",
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
                    currentState:"Pending",
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
                alert("Task Status has heen Updated")
            })
        })
    }
    render() {
        console.log(this.state.currentState)
        return (
            <Container>
                <NavBarManu />
                <br/>
        <h2>Update Status of : {this.state.title}</h2><br/>
                <div>
                <Col md={{ span: 4, offset: 4 }}>
                <Form>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            {/* <Form.Label>Update Status</Form.Label> */}
                            <Form.Control as="select" onChange={(event) => { this.setState({ currentState: event.target.value }) }}>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            </Form.Control>
                        </Form.Group>
                </Form>
                </Col>
               
                    
                {/* <input onChange={(event) => { this.setState({ currentState: event.target.value }) }}
                        placeholder="currentState" value={this.state.currentState} /> <br /><br /> */}

                    <Button variant="primary" onClick={() => { this.update() }}>
                    Update Status
                    </Button>

                

                    <input onChange={(event) => { this.setState({ title: event.target.value }) }}
                        placeholder="Title" value={this.state.title} style={{display:"none"}} /> <br /><br />

                    <input onChange={(event) => { this.setState({ des: event.target.value }) }}
                        placeholder="Description"  value={this.state.des} style={{display:"none"}}/> <br /><br />

                    <input onChange={(event) => { this.setState({ created: event.target.value }) }}
                        placeholder="Created"  value={this.state.created} style={{display:"none"}}/> <br /><br />

                    <input onChange={(event) => { this.setState({ due: event.target.value }) }}
                        placeholder="Due"  value={this.state.due} style={{display:"none"}}/> <br /><br />

                    <input onChange={(event) => { this.setState({ priority: event.target.value }) }}
                        placeholder="Priority"  value={this.state.priority} style={{display:"none"}}/> <br /><br />

                    
                </div>
           </Container>
        );
    }
}

export default StUpdate;