import React, { Component } from "react";

import queryString from 'query-string';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';

import API from '../api';

export default class ContactsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      pagination: [],
      api_error: false
    };
  }

  componentDidMount() {
    API.get(`/contacts?page=${queryString.parse(this.props.location.search).page}`)
      .then(res => {
        const contacts = res.data.contacts;
        const pagination = res.data.pagination;
        this.setState({ contacts });
        this.setState({ pagination });
      })
      .catch((error) => {
        const api_error = true;

        this.setState({ api_error });
      })
  }

  deleteContact(id) {
    const contacts = this.state.contacts.filter((contact) => contact.id !== id);

    API.delete(`/contacts/${id}`)
      .then(() => { this.setState({ contacts }); })
  }

  renderPagination() {
    var items = [];
    if (this.state.pagination.pages === 1) {
      return
    }
    for(var i=1; i <= this.state.pagination.pages; i++){
      items.push(
        <Pagination.Item
          key={i}
          active={i === Number(this.state.pagination.current)}
          href={`?page=${i}`}>
          {i}
        </Pagination.Item>,
      );
    }
    return items;
  }

  render() {
    if (this.state.api_error) {
      return(
        <div>There is an error connecting with rails app, probably heroku server is loading, just wait some seconds and refresh this page :)</div>
      )
    }
    return (
      <div>
        <Table striped bordered hover>
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
                <tr key={contact.id}>
                  <td>{contact.first_name}</td>
                  <td>{contact.last_name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone_number}</td>
                  <td>
                    <div className="text-center">
                      <Button
                        href={`/update/${contact.id}`}
                        size="sm"
                        className="mr-2"
                        variant="primary">
                        Update
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => this.deleteContact(contact.id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            }
          </tbody>
        </Table>
        <Pagination className="justify-content-center">
          {this.renderPagination()}
        </Pagination>
      </div>
    );
  }
}
