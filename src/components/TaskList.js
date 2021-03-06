import React, { Component } from 'react';
import { Table, Container,Button,Form,Col,Row,Modal} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';
import './CompStyle.css';
import axios from 'axios';
import {
    Link
  } from 'react-router-dom'

class TasktList extends Component {

   
    
    constructor(props) {
        super(props);
        this.state = {
            list: null,
            status:this.props.stat,
            currentState:null,
            searchData: null,
            noData:false,
            lastSearch:"",
            key:this.props.search,
            group:null,
            plist:null,
            show:false
           
        }
        
        
    }


    componentDidMount() {
       this.getData()
    }

    getData=()=>{
       
        axios.get(`http://localhost:3000/task?q=`+ this.props.stat)
        .then(response=>{
            console.log(response.data)
            this.setState({list:response.data});
        })

        
    }

    group(val){
        this.setState({group:val})
        console.log(this.state.group)
       
            axios.get(`http://localhost:3000/task?q=`+ val)
            .then(response=>{
            console.log(response.data)
            this.setState({list:response.data});
        })
        
    }

    handleClose(){
        this.setState({show:false})
       
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

    view(id){
       
        axios.get(`http://localhost:3000/task?q=`+ id,)
        .then(response=>{
        console.log(response.data)
        this.setState({plist:response.data});
    })
    this.setState({show:true})
    }

    delete(id)
    {
        axios.delete('http://localhost:3000/task/'+id)
        .then(resp=>{
           
            this.getData()
        })

      
    }

    
   
    render() {
        
        return (
            
            <Container>
               
             <br/>
             <div className="group">
                    <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Sort By</Form.Label>
                            <Form.Control as="select" onChange={(event) => this.group(event.target.value)}>
                            <option value="">None</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                           
                            </Form.Control>
                        </Form.Group>
             </div> 
             <div className="search">
             <Form.Label>Search tasks</Form.Label>      
             <Form.Control type="text"  onChange={(event) => this.search(event.target.value)}   placeholder="Search Tasks" />
             </div>
             
             <br/>
             
              
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
                                            <tr key={i}>
                                                {item.currentState === "Completed" ?
                                                <td style={{textDecoration:"line-through"}} onClick={()=>this.view(item.title)}>{item.id}</td>:
                                                <td onClick={()=>this.view(item.title)}>{item.id}</td> }

                                                {item.currentState === "Completed" ?
                                                <td style={{textDecoration:"line-through"}} onClick={()=>this.view(item.title)}>{item.title}</td>:
                                                <td onClick={()=>this.view(item.title)}>{item.title}</td> }
                                              
                                              {item.currentState === "Completed" ?
                                                <td style={{textDecoration:"line-through"}} onClick={()=>this.view(item.title)}>{item.des}</td>:
                                                <td onClick={()=>this.view(item.title)}>{item.des}</td> }

                                                {item.currentState === "Completed" ?
                                                <td style={{textDecoration:"line-through"}} onClick={()=>this.view(item.title)}>{item.created}</td>:
                                                <td onClick={()=>this.view(item.title)}>{item.created}</td> }

                                                {item.currentState === "Completed" ?
                                                <td style={{textDecoration:"line-through"}} onClick={()=>this.view(item.title)}>{item.due}</td>:
                                                <td onClick={()=>this.view(item.title)}>{item.due}</td> }

                                                {item.currentState === "Completed" ?
                                                <td style={{textDecoration:"line-through"}} onClick={()=>this.view(item.title)}>{item.priority}</td>:
                                                <td onClick={()=>this.view(item.title)}>{item.priority}</td> }
                                                

                                                <td><Link to={"/update/"+item.id}><FontAwesomeIcon icon={faEdit} color="orange" /> </Link>
                                                <span onClick={()=>{ if (window.confirm('Are you sure you wish to delete this task?')) this.delete(item.id)}}><FontAwesomeIcon icon={faTrash} color="red" /> </span>
                                                
                                                </td>
                                                <td> {item.currentState ==="Pending"?
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
                                        ).reverse()
                                        
                                        
                                    }
                                </tbody>
                            </Table>
                        </div>
                        : <p>Please Wait...</p>
                }
                    {
                        this.state.noData?<h3>No Search Data Found</h3>:null
                    } 

                   


                    <Modal show={this.state.show} onHide={(e) => this.handleClose(e)} size="lg" backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                    <Modal.Title>View Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {this.state.plist !== null ? this.state.plist.map((item, i) =>
                    <Form>
                        <Form.Group controlId="formBasicSum">
                        <Form.Label>Summary</Form.Label>
                        <Form.Control type="Text" value={item.title} disabled/>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows="3" value={item.des} />
                        </Form.Group>

                        <Row>
                        <Col>
                        <Form.Group controlId="formBasicSum">
                        <Form.Label>Due</Form.Label>
                        <Form.Control type="Text" value={item.due} disabled/>
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group controlId="formBasicSum">
                        <Form.Label>Priority</Form.Label>
                        <Form.Control type="Text" value={item.priority} disabled/>
                        </Form.Group>
                        </Col>
                        </Row>
                    </Form>

                    
                    
                    ): null}
                  
                    </Modal.Body>
                    {/* <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => this.handleClose()}>
                        Save Changes
                    </Button>
                    </Modal.Footer> */}
                </Modal>
            </Container>
        );
    }
}

export default TasktList;