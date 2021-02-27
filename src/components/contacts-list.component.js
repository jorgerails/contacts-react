import React, { Component } from "react";

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import API from '../api';

export default class ContactsList extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    API.get(`/contacts`)
      .then(res => {
        const contacts = res.data.contacts;
        this.setState({ contacts });
      })
  }

  deleteContact(id) {
    const contacts = this.state.contacts.filter((contact) => contact.id !== id);

    API.delete(`/contacts/${id}`)

    this.setState({ contacts });
  }

  render() {
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone number</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.contacts.map(contact =>
              <tr>
                <td>{contact.first_name}</td>
                <td>{contact.last_name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone_number}</td>
                <td>
                  <div className="m-auto">
                    <Button href={`/update/${contact.id}`} size="sm" className="mr-1" variant="primary">Update</Button>
                    <Button size="sm" variant="danger" onClick={() => this.deleteContact(contact.id)}>Delete</Button>
                  </div>
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>
    );
  }
}
