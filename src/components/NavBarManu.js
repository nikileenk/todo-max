import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHome, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Navbar, Nav,Modal,Button } from 'react-bootstrap';
import './CompStyle.css';
import TaskCreate from './TaskCreate';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
class NavBarManu extends Component {

    constructor(props) {
        super(props);
        this.state = {
        show : false
        }
    }

    handleShow(){
        this.setState({show:true})
        console.log(this.props)


    }

    handleClose(){
        this.setState({show:false})
        window.location.href = "/";
       
    }

    render() {
        return (
            <>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">TODO APP</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/"><Link to="/"> <FontAwesomeIcon icon={faHome} /> List  </Link></Nav.Link>
                            
                            <Nav.Link href="#link"><Link to="/search"><FontAwesomeIcon icon={faSearch} /> Search </Link></Nav.Link>

                            <Nav.Link href="" onClick={(e) => this.handleShow(e)}><Link><FontAwesomeIcon icon={faPlus} /> Add Task</Link></Nav.Link>

                            
                            

                        </Nav>
                        {
                                localStorage.getItem('login') ?
                                    <Nav.Link href="#link" style={{float:"right"}}><Link to="/logout"><FontAwesomeIcon icon={faUser} /> Logout </Link></Nav.Link>

                                    :
                                    <Nav.Link href="#link" style={{float:"right"}}><Link to="/login"><FontAwesomeIcon icon={faUser} /> Login </Link></Nav.Link>
                            }
                    </Navbar.Collapse>
                </Navbar>

                            <div className="addicon" onClick={() => this.handleShow()}>
                            <FontAwesomeIcon icon={faPlus}  />
                            </div>


                <Modal show={this.state.show} onHide={(e) => this.handleClose(e)} size="lg" backdrop="static" keyboard={false}>
                    <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                   <TaskCreate/>
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
            </>
        );
    }
}

export default NavBarManu;