import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import NavBarManu from './NavBarManu'

class Test extends Component {
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
                alert("Restaurant has heen Update")
            })
        })
    }
    render() {
        
        return (
            <Container>
                <NavBarManu />
                <h1>Task Update</h1>
                <div>
                <input onChange={(event) => { this.setState({ currentState: event.target.value }) }}
                        placeholder="currentState" value={this.state.currentState} /> <br /><br />

                    <input onChange={(event) => { this.setState({ title: event.target.value }) }}
                        placeholder="Title" value={this.state.title} style={{display:"none"}} /> <br /><br />

                    <input onChange={(event) => { this.setState({ des: event.target.value }) }}
                        placeholder="Description"  value={this.state.des}/> <br /><br />

                    <input onChange={(event) => { this.setState({ created: event.target.value }) }}
                        placeholder="Created"  value={this.state.created}/> <br /><br />

                    <input onChange={(event) => { this.setState({ due: event.target.value }) }}
                        placeholder="Due"  value={this.state.due}/> <br /><br />

                    <input onChange={(event) => { this.setState({ priority: event.target.value }) }}
                        placeholder="Priority"  value={this.state.priority}/> <br /><br />

                    <button onClick={() => { this.update() }}>Update Status</button>
                </div>
           </Container>
        );
    }
}

export default Test;