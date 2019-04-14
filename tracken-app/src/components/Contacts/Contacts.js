import React, { Component } from 'react'
import firebase from "firebase";
import { withAuth } from "../../contexts/AuthContext";
import './Contacts.css'
import MainMenu from '../MainMenu';
import ContactsBook from '../ContactsBook';
import { Form, Segment, Button } from 'semantic-ui-react';

const initialState = {
  name: "",
  surname: "",
  postalcode: "",
  country: "",
  city: "",
  street: "",
  number: "",
  company: "",
  phone: "",
  email: "",
  showAddContact: false
};
class Contacts extends Component {
  state = initialState;

  handleChange = event => {
    if (event.target.name === "phone") {
      
      if (event.target.value !== '' && !event.target.value.match(/^[\d-]+$/gi)) {
        return;
      }
    }
  
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  toggleAddContact = () => {
    this.setState({ showAddContact: !this.state.showAddContact });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { user } = this.props.authContext;
    firebase
      .database()
      .ref("users")
      .child(user.uid)
      .child("contactsBook")
      .push({
        name: this.state.name,
        surname: this.state.surname,
        postalcode: this.state.postalcode,
        country: this.state.country,
        city: this.state.city,
        street: this.state.street,
        number: this.state.number,
        company_name: this.state.company,
        phone: this.state.phone,
        email: this.state.email
      });
      this.setState(initialState);
  };
  render() {
    const { showAddContact } = this.state;
    return (
      <div className="Contacts">
      <MainMenu />
      <br />
        <div>
          <Button onClick={() => this.toggleAddContact(showAddContact)}>
            {showAddContact ? "Cancel" : "Add new contact"}
          </Button>
        </div>
        <br />
        {showAddContact && 
        (<Segment color="purple">
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                label="Company name"
                placeholder="Company name"
                type="text"
                name="company"
                value={this.state.company}
                onChange={this.handleChange}
              />
              <Form.Input
                label="Name"
                placeholder="Name"
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                required
              />
              <Form.Input
                label="Surname"
                placeholder="Surname"
                type="text"
                name="surname"
                value={this.state.surname}
                onChange={this.handleChange}
                
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                label="Email"
                placeholder="Email"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <Form.Input
                label="Phone Number"
                placeholder="xxx-xxx-xxx"
                width={13}
                type="text"
                name="phone"
                value={this.state.phone}
                onChange={this.handleChange}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
                title="Correct format: 'xxx-xxx-xxx'"
              />
              <Form.Input
                label="Country"
                placeholder="Coutry"
                name="country"
                type="text"
                value={this.state.country}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                label="City"
                placeholder="City"
                type="text"
                name="city"
                value={this.state.city}
                onChange={this.handleChange}
              />
              <Form.Input
                label="Postal code"
                placeholder="Postal code"
                type="number"
                name="postalcode"
                value={this.state.postalcode}
                onChange={this.handleChange}
              />
              <Form.Input
                label="Street"
                placeholder="Street"
                type="text"
                name="street"
                value={this.state.street}
                onChange={this.handleChange}
              />
              <Form.Input
                label="Street number"
                placeholder="Street number"
                type="number"
                name="number"
                value={this.state.number}
                onChange={this.handleChange}
              />
            </Form.Group>
          </Form>
          <Button type="submit" onClick={this.handleSubmit}>
              Add Contact
            </Button>
        </Segment>)
        }
      <ContactsBook />
      </div>
    )
  }
}

export default withAuth(Contacts)
