import React, { Component } from 'react';
import { Table, Container,Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import {
    Link
  } from 'react-router-dom'
import NavBarManu from './NavBarManu'

class TasktList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null,
            status:this.props.stat,
            currentState:null
        }
        
    }
    componentDidMount() {
       this.getData()
       
    }
    getData(props)
    {
        
        axios.get(`http://localhost:3000/task?q=`+ this.state.status)
        .then(response=>{
            console.log(response.data)
            this.setState({list:response.data});
        })

        
    }
    delete(id)
    {
        axios.delete('http://localhost:3000/task/'+id)
        .then(resp=>{
            alert("Task Delete")
            this.getData()
        })

      
    }

   
    render() {

        return (
            <Container>
             <br/>
                {/* <NavBarManu /> */}
        {/* <h2>Task List {this.state.status}</h2> */}
                {
                    this.state.list ?
                        <div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        {/* <th>CurrentState</th> */}
                                        <th>Summary</th>
                                        <th>Description</th>
                                        <th>Created</th>
                                        <th>Due</th>
                                        <th>Priority</th>
                                        <th>Action</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.list.map((item, i) =>
                                            <tr>
                                                <td>{item.id}</td>
                                                {/* <td>{item.currentState}</td> */}
                                                <td>{item.title}</td>
                                                <td>{item.des}</td>
                                                <td>{item.created}</td>
                                                <td>{item.due}</td>
                                                <td>{item.priority}</td>
                                                <td><Link to={"/update/"+item.id}><FontAwesomeIcon icon={faEdit} color="orange" /> </Link>
                                                <span onClick={()=>this.delete(item.id)}><FontAwesomeIcon icon={faTrash} color="red" /> </span>
                                                
                                                </td>
                                                <td> {item.currentState =="Pending"?
                                                <Link to={"/StUpdate/"+item.id}>
                                                <Button variant="danger" style={{color:"white"}}>{item.currentState} 
                                                </Button>
                                            </Link>
                                                :<Link to={"/StUpdate/"+item.id}>
                                                <Button variant="success" style={{color:"white"}}>{item.currentState} 
                                                </Button>
                                            </Link>}
                                                    
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </div>
                        : <p>Please Wait...</p>
                }
            </Container>
        );
    }
}

export default TasktList;