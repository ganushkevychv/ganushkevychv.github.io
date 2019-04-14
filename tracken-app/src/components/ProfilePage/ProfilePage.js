import React, { Component } from "react";
import firebase from 'firebase'
import { Form, Segment, Button } from "semantic-ui-react";
import MainMenu from "../MainMenu";
import { withAuth } from "../../contexts/AuthContext";

import "./ProfilePage.css";

class ProfilePage extends Component {
  state = {
    active: false,
    company_name: "",
    name: "",
    surname: "",
    nip: "",
    phone: "",
    city: "",
    postalcode: "",
    street: "",
    number: ""
  };
  
  handleClick = () =>{
    const {
      company_name,
      name,
      surname,
      nip,
      phone,
      city,
      postalcode,
      street,
      number
    } = this.props.authContext.userData
    this.setState({
      active: !this.state.active,
      company_name,
      name,
      surname,
      nip,
      phone,
      city,
      postalcode,
      street,
      number
    })
  };

  handleChange = event => {
    const id = event.target.id;
    const value = event.target.value;
    this.setState({
      [id]: value
    });
  };
  handleSave = () => {
    const { user } = this.props.authContext;
    const {
      company_name,
      name,
      surname,
      nip,
      phone,
      city,
      postalcode,
      street,
      number
    } = this.state;
    const stateData = {name, surname, company_name, city, postalcode, street, number, phone, nip}
    // const updateData = Object.keys(stateData).reduce((obj, element)=> {
    //   if ((stateData[element])!=="") 
    //   obj[element] = stateData[element]
    //   return obj;
    // }, {});
        firebase
          .database()
          .ref("users")
          .child(user.uid)
          .update(stateData);
 
    this.handleClick();
  }

  render() {
    const { userData} = this.props.authContext;
    const {
      active,
      company_name,
      name,
      surname,
      nip,
      phone,
      city,
      postalcode,
      street,
      number
    } = this.state;
    return (
      <div className="ProfilePage">
        <MainMenu />
        <br />

        <h1>{userData.name} {userData.surname} - profile page</h1>
        <br />
        {active ? (
          <Button toggle active={active} onClick={this.handleSave}>
            Save
          </Button>
        ) : (
          <Button toggle active={active} onClick={this.handleClick}>
            Edit
          </Button>
        )}
        
        {active ? (
          <Segment color="purple">
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  id="company_name"
                  label="Company name"
                  placeholder="Company name"
                  value={company_name}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  id="name"
                  label="First name"
                  placeholder="First name"
                  value={name}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  id="surname"
                  label="Last name"
                  placeholder="Last name"
                  value={surname}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  id="nip"
                  label="NIP"
                  placeholder="NIP"
                  value={nip}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  id="city"
                  label="City"
                  placeholder="City"
                  value={city}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  id="postalcode"
                  label="Postal Code"
                  placeholder="Postal Code"
                  value={postalcode}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  id="street"
                  label="Street"
                  placeholder="Street"
                  value={street}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  id="number"
                  label="Number"
                  placeholder="Number"
                  value={number}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  id="phone"
                  label="Phone"
                  placeholder="Phone"
                  value={phone}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
          </Segment>
        ) : (
          <Segment color="purple">
            <Form>
              <Form.Group widths="equal">
                <div className="field">
                  <label>Company name</label>
                  <div className="formBox">{userData.company_name}</div>
                </div>

                <div className="field">
                  <label>First name</label>
                  <div className="formBox">{userData.name}</div>
                </div>
                <div className="field">
                  <label>Last name</label>
                  <div className="formBox">{userData.surname}</div>
                </div>
                <div className="field">
                  <label>NIP</label>
                  <div className="formBox">{userData.nip}</div>
                </div>
              </Form.Group>
              <Form.Group widths="equal">
                <div className="field">
                  <label>City</label>
                  <div className="formBox">{userData.city}</div>
                </div>
                <div className="field">
                  <label>Postal Code</label>
                  <div className="formBox">{userData.postalcode}</div>
                </div>
                <div className="field">
                  <label>Street</label>
                  <div className="formBox">{userData.street}</div>
                </div>
                <div className="field">
                  <label>Number</label>
                  <div className="formBox">{userData.number}</div>
                </div>
                <div className="field">
                  <label>Phone</label>
                  <div className="formBox">{userData.phone} </div>
                </div>
              </Form.Group>
            </Form>
          </Segment>
        )}
      </div>
    );
  }
}

export default withAuth(ProfilePage);
