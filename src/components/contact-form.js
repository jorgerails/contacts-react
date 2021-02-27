import React, { Component } from "react";
import API from '../api';

import { Redirect } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      contact: {
        first_name: '',
        last_name: '',
        email: '',
        phone_number: ''
      },
      redirect: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    if (id !== undefined) {
      API.get(`/contacts/${id}`)
        .then(res => {
          const contact = res.data;

          const id = contact.id;
          delete contact.id

          this.setState({ contact, id });
        })
    }
  }

  handleChange(event) {
    const contact = this.state.contact;
    contact[event.target.name] = event.target.value;

    this.setState({ contact });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.id !== null) {
      API.patch(`/contacts/${this.state.id}`, { contact: this.state.contact })
        .then(() => this.setState({ redirect: true }))
    } else {
      API.post(`/contacts`, { contact: this.state.contact })
        .then(() => this.setState({ redirect: true }))
    }
  }

  render() {
    const { redirect } = this.state;

     if (redirect) {
       return <Redirect to='/'/>;
     }

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="first_name">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              name="first_name"
              defaultValue={this.state.contact.first_name}
              onChange={this.handleChange}
              placeholder="Jorge" />
          </Form.Group>

          <Form.Group as={Col} controlId="last_name">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              name="last_name"
              defaultValue={this.state.contact.last_name}
              onChange={this.handleChange}
              placeholder="Peris" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              defaultValue={this.state.contact.email}
              onChange={this.handleChange}
              type="email"
              placeholder="example@example.com" />
          </Form.Group>

          <Form.Group as={Col} controlId="phone_number">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              name="phone_number"
              defaultValue={this.state.contact.phone_number}
              onChange={this.handleChange}
              placeholder="+34666554433" />
          </Form.Group>
        </Form.Row>

        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    );
  }
}
