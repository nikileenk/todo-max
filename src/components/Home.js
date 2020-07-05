import React, {useState } from 'react';
import { Container,Tab,Tabs } from 'react-bootstrap';
import NavBarManu from './NavBarManu'
import TaskList from './TaskList';
import Test from './Test';
function Home() {
   
        const [key, setKey] = useState('home');
        return (
           <Container>
                <NavBarManu />
                <br/><br/>
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" activeKey={key} onSelect={(k) => setKey(k)}>
                    <Tab eventKey="home" title="All">
                    <TaskList stat={""}/>
                    </Tab>
                    <Tab eventKey="Pending" title="Pending">
                    <TaskList stat={"pending"}/>
                    </Tab>

                    <Tab eventKey="Completed" title="Completed">
                    <TaskList stat={"Completed"}/>
                    </Tab>
                    
                </Tabs>

            </Container>
        
        );
    
}

export default Home;