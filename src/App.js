import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import ContactsList from "./components/contacts-list";
import ContactForm from "./components/contact-form";

import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends Component{
  render(){
    return (
      <Container>
        <Navbar bg="light">
          <Navbar.Brand href={"/"}>Contacts</Navbar.Brand>
        </Navbar>
        <Row>
          <Col className="mt-3">
            <Button href={"/add"} variant="outline-success">
              Add contact
            </Button>
          </Col>
        </Row>


        <Row>
          <Col className="mt-5">
            <Switch>
              <Route exact path={["/"]} component={ContactsList} />
              <Route exact path={["/update/:id", "/add"]} component={ContactForm} />
            </Switch>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
