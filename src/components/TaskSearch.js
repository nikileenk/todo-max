import React, { Component } from 'react';
import { Table,Form,Container,Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'
import {
    Link
  } from 'react-router-dom'
import NavBarManu from './NavBarManu'

class TaskSearch extends Component {
    constructor() {
        super()
        this.state = {
            searchData: null,
            noData:false,
            lastSearch:"",
        }
    }
    search(key) {
        console.warn(key)
        this.setState({lastSearch:key})
        fetch("http://localhost:3000/task?q=" + key).then((data) => {
            data.json().then((resp) => {
                console.warn("resp", resp)
                if(resp.length>0)
                {
                    this.setState({searchData:resp,noData:false})
                }
                else
                {
                    this.setState({noData:true,searchData:null})
                }
            })
        })
    }
    delete(id)
    {
        fetch('http://localhost:3000/task/'+id,
        {
            method: "DELETE",
            // headers:{
            //     'Content-Type':'application/json'
            // },
        }).then((result)=>{
            result.json().then((resp)=>{
                alert("Task Deleted")
                this.search(this.state.lastSearch)
            })
        })
    }
    render() {
        return (
            <Container>
                <NavBarManu />
                <h1>Task Search</h1>
               
                <Form.Control type="text"  onChange={(event) => this.search(event.target.value)}   placeholder="Search Task" />
                <div>
                    {
                        this.state.searchData?
                        <div>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        {/* <th>CurrentState</th> */}
                                        <th>Title</th>
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
                                this.state.searchData.map((item)=>
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
                        :""
                    }
                    {
                        this.state.noData?<h3>No Data Found</h3>:null
                    } 
                </div>

            </Container>
        );
    }
}

export default TaskSearch;