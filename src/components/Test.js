import React, { Component } from 'react'
import { Table, Container,Button,Form,Modal} from 'react-bootstrap';
import  { Redirect } from 'react-router-dom'
import TaskCreate from './TaskCreate';


export default class Test extends Component {

    constructor(){
        super();
        this.state = {
            show : false
        }
    }

    handleShow(){
        this.setState({show:true})


    }

    handleClose(){
        // this.setState({show:false})
        this.props.history.push('/')
       
    }

    render() {

        
        return (
            <>
                <Button variant="primary" onClick={() => this.handleShow()}>
                    Launch demo modal
                </Button>

                <Modal show={this.state.show} onHide={() => this.handleClose()} size="lg">
                    <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                   <TaskCreate />
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
        )
    }
}
