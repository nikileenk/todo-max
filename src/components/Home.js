import React, {useState,useEffect, Component} from 'react';
import { Container,Tab,Tabs,Form } from 'react-bootstrap';
import NavBarManu from './NavBarManu'
import TaskList from './TaskList';

class Home extends Component{

    state ={
        key:"home",
        sr:""
    }

        search = (e) =>{
                this.setState({sr:e.target.value})
                
        }
        
render(){
        return (
            
           <Container>
                <NavBarManu />
                <br/><br/>

                

                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" activeKey={this.state.key} onSelect={(k) => this.setState({key:k})}>
                    <Tab eventKey="home" title="All">
                 
                    </Tab>
                    <Tab eventKey="Pending" title="Pending" >
                  
                    </Tab>

                    <Tab eventKey="Completed" title="Completed">
                   
                    </Tab>
                    
                </Tabs>

              

                {this.state.key ==="home"? <TaskList stat={""} search={this.props.sr}/> : null }

                {this.state.key ==="Pending"? <TaskList stat={this.state.key} search={this.props.sr}/> : null}

                {this.state.key ==="Completed"? <TaskList stat={this.state.key} search={this.props.sr}/> : null}

             

            </Container>
        
        );
    
}
}

export default Home;