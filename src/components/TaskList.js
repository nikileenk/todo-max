import React, { Component } from 'react';
import { Table, Container,Button,Form} from 'react-bootstrap'
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
            currentState:null,
            searchData: null,
            noData:false,
            lastSearch:""
        }
        
    }
    componentDidMount(props) {
       this.getData()
    //    this.setState({status:this.props.stat})
    }

    

    getData(props)
    {
        
        axios.get(`http://localhost:3000/task?q=`+ this.state.status)
        .then(response=>{
            console.log(response.data)
            this.setState({list:response.data});
        })

        
    }

    search(key) {
        console.warn(key)
        this.setState({lastSearch:key})
        fetch("http://localhost:3000/task?q=" + key).then((data) => {
            data.json().then((resp) => {
                console.warn("resp", resp)
                if(resp.length>0)
                {
                    this.setState({searchData:resp,noData:false,list:resp})
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

             <Form.Control type="text"  onChange={(event) => this.search(event.target.value)}   placeholder="Search Tasks" /><br/>
             
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
                                                {item.currentState == "Completed" ?
                                                <td style={{textDecoration:"line-through"}}>{item.id}</td>:
                                                <td>{item.id}</td> }

                                                {item.currentState == "Completed" ?
                                                <td style={{textDecoration:"line-through"}}>{item.title}</td>:
                                                <td>{item.title}</td> }
                                              
                                              {item.currentState == "Completed" ?
                                                <td style={{textDecoration:"line-through"}}>{item.des}</td>:
                                                <td>{item.des}</td> }

                                                {item.currentState == "Completed" ?
                                                <td style={{textDecoration:"line-through"}}>{item.created}</td>:
                                                <td>{item.created}</td> }

                                                {item.currentState == "Completed" ?
                                                <td style={{textDecoration:"line-through"}}>{item.due}</td>:
                                                <td>{item.due}</td> }

                                                {item.currentState == "Completed" ?
                                                <td style={{textDecoration:"line-through"}}>{item.priority}</td>:
                                                <td>{item.priority}</td> }
                                                

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