import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import firebase from "firebase";
import "./ContactsBook.css";
import { withAuth } from "../../contexts/AuthContext";

class ContactsBook extends Component {
  state = {
    searchPhrase: "",
    pagination: 0,
  }
  handleChange = event => {
    this.setState({
      searchPhrase: event.target.value
    });
  };
  handlePaginationChange = event => {
    const paginationPage = event.target.value;
    this.setState({
      pagination: paginationPage * (this.props.perPage || 10)
    });
  };
  deleteContact =  event => {
    const contactId = event.target.id
    const { user } = this.props.authContext;
      firebase
        .database()
        .ref('users')
        .child(user.uid)
        .child("contactsBook")
        .child(contactId)
        .set(null)
  }

  render() {
    const { pagination, searchPhrase } = this.state;
    const {
      userData: { contactsBook }
    } = this.props.authContext;
    const recordsOnPage = this.props.perPage || 10;
    const shearchedContactBook = contactsBook.map(contact => ({
      ...contact,
      searchData: (
        contact.company_name +
        contact.name +
        contact.surname.street
      ).toLowerCase()
    }))
    .filter(contact => contact.searchData.includes(searchPhrase.toLowerCase()))
    return (
      <div className="ContactsBook">
        <div className="ui input">
              <input
                placeholder="Search..."
                value={searchPhrase}
                onChange={this.handleChange}
              />
            </div>
        <table className="ui celled table contacts_table">
          <thead>
            <tr className="th__header--tr">
              <th>Company name</th>
              <th>Name</th>
              <th>Surname</th>
              <th>City</th>
              <th>Postal code</th>
              <th>Street</th>
              <th>Number</th>
              <th>Phone</th>
              <th>Email</th>
              <th>NIP</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {shearchedContactBook.map(contact => (
              <tr key={contact.id}>
                <td><span className="span__title--td">Company name:&nbsp;&nbsp; </span>{contact.company_name}</td>
                <td><span className="span__title--td">Name: &nbsp;&nbsp;</span>{contact.name}</td>
                <td><span className="span__title--td">Surname: &nbsp;&nbsp;</span>{contact.surname}</td>
                <td><span className="span__title--td">City: &nbsp;&nbsp;</span>{contact.city}</td>
                <td><span className="span__title--td">Postal code: &nbsp;&nbsp;</span>{contact.postalcode}</td>
                <td><span className="span__title--td">Street: &nbsp;&nbsp;</span>{contact.street}</td>
                <td><span className="span__title--td">Number: &nbsp;&nbsp;</span>{contact.number}</td>
                <td><span className="span__title--td">Phone:&nbsp;&nbsp;</span>{contact.phone}</td>
                <td><span className="span__title--td">Email:&nbsp;&nbsp;</span>{contact.email}</td>
                <td><span className="span__title--td">NIP: &nbsp;&nbsp;</span>{contact.nip}</td>
                <td className="td_buttons"><span className="span__title--td">Options:&nbsp;&nbsp;</span><Button className={this.props.additionalClass || "hideCopy"} onClick={() => this.props.onCopyContact(contact)} circular color='facebook' icon='copy' />
                <Button id={contact.id} onClick={this.deleteContact} circular color='red' icon='delete' />
                </td>
              </tr>
            )).slice(pagination, pagination + recordsOnPage)}
          </tbody>
        </table>
        <div className="pagination">
            {Array.from({
              length: Math.ceil(shearchedContactBook.length / recordsOnPage)
            }).map((button, index) => (
              <button
                className="ui button"
                key={index}
                value={index}
                onClick={this.handlePaginationChange}
              >
                {index + 1}
              </button>
            ))}
          </div>
      </div>
    );
  }
}

export default withAuth(ContactsBook);
