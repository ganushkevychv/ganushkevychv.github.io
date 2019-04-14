import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { Button, Form, Icon, Message } from "semantic-ui-react";
import firebase from "firebase";
import image from "./trackenLogo.svg";

import "./SignUp.css";

class CustomButton extends Component {
  render() {
    return <NavLink {...this.props} />;
  }
}

class SignUp extends Component {
  state = {
    name: "",
    surname: "",
    phone: "",
    postalcode: "",
    city: "",
    street: "",
    number: "",
    company_name: "",
    nip: "",
    email: "",
    password: "",
    error: null,
    success: null
  };

  handleChange = event => {
    if (event.target.name === "phone") {
      if (event.target.value !== '' && !event.target.value.match(/^[\d-]+$/gi)) {
        return;
      }
    }
    if (event.target.name === "nip") {
      if (event.target.value !== '' && !event.target.value.match(/^[\d-]+$/gi)) {
        return;
      }
    }
    if (event.target.name === "postalcode") {
      if (event.target.value !== '' && !event.target.value.match(/^[\d-]+$/gi)) {
        return;
      }
    }
    if (event.target.name === "number") {
      if (event.target.value !== '' && !event.target.value.match(/^[\d-]+$/gi)) {
        return;
      }
    }
   
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(data => {
        const userId = firebase.auth().currentUser.uid;
        firebase
          .database()
          .ref("users")
          .child(userId)
          .set({
            name: this.state.name,
            surname: this.state.surname,
            postalcode: this.state.postalcode,
            street: this.state.street,
            city: this.state.city,
            phone: this.state.phone,
            company_name: this.state.company_name,
            nip: this.state.nip,
            number: this.state.number
          });
        this.setState({ error: null, success: "Account created" });
        this.props.history.push("/dashboard");
      })
      .catch(error => this.setState({ error: error, success: null }));
  };

  render() {
    return (
      <div className="signUp">
        <img className="signUpFormMenuIcon" src={image} alt="tracken-logo" />

        <div className="signUpForm">
          <Form
            onSubmit={this.handleSubmit}
            style={{
              padding: 20,
              boxShadow: "0 5px 10px rgba(0, 0, 0, 0.5",
              background: "white"
            }}
          >
            <Form.Group>
              <Form.Input
                label="First name"
                placeholder="First Name"
                width={13}
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                label="Last Name"
                placeholder="Last Name"
                width={13}
                type="text"
                name="surname"
                value={this.state.surname}
                onChange={this.handleChange}
                required
              />
            </Form.Group>

            <Form.Group>
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
            </Form.Group>
            <Form.Group>
              <Form.Input
                label="Company Name"
                placeholder="Company Name"
                width={13}
                type="text"
                name="company_name"
                value={this.state.company_name}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                label="NIP"
                placeholder="NIP number"
                width={13}
                type="text"
                pattern="[0-9]{10}"
                name="nip"
                value={this.state.nip}
                onChange={this.handleChange}
                title="Please enter 10 digits number"
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                label="Postal code"
                placeholder="xx-xxx"
                type="text"
                width={4}
                value={this.state.postalcode}
                onChange={this.handleChange}
                name="postalcode"
                pattern="[0-9]{2}-[0-9]{3}"
                title="Correct format: 'xx-xxx'"
              />
              <Form.Input
                label="City"
                type="text"
                placeholder="City"
                width={9}
                value={this.state.city}
                onChange={this.handleChange}
                name="city"
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                label="Street Name"
                type="text"
                placeholder="Street Name"
                width={9}
                value={this.state.street}
                onChange={this.handleChange}
                name="street"
              />
              <Form.Input
                label="Street Number"
                type="number"
                placeholder="Number"
                width={4}
                value={this.state.number}
                onChange={this.handleChange}
                name="number"
              />
            </Form.Group>

            <Form.Group>
              <Form.Input
                label="Email"
                placeholder="Email"
                width={13}
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Input
                label="Password"
                placeholder="Password"
                width={13}
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <label id="termsnConditionsLabel">
                <input
                  id="termsnConditions"
                  type="checkbox"
                  label="I agree to the Terms and Conditions"
                  required
                />
                I agree to the Terms and Conditions{" "}
                <span id="requiredStar">*</span>
              </label>
            </Form.Group>
            <Form.Group className="signUpFormMenuButtons">
              <Button className="submitButtonSignUp" size="medium" type="submit">
                Submit
              </Button>

              <Button as={CustomButton} to="/" animated>
                <Button.Content visible>Home</Button.Content>
                <Button.Content hidden id="hiddenButton">
                  <Icon name="arrow left" />
                </Button.Content>
              </Button>
            </Form.Group>
            <div className="signUpFormMenuErrorMessage">
              {this.state.error && (
                <Message negative compact floating>
                  <Message.Header>An error occured</Message.Header>
                  <p style={{ color: "red" }}>
                    {this.state.error.message}
                  </p>{" "}
                </Message>
              )}
            </div>
          </Form>
        </div>

        {this.state.success && (
          <p style={{ color: "green" }}>{this.state.success}</p>
        )}
      </div>
    );
  }
}

export default SignUp;
