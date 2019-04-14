import React, { Component } from "react";
import { Form, Input, Button, Segment, Header, Popup } from "semantic-ui-react";
import ContactsBook from "../ContactsBook/ContactsBook";
import firebase from "firebase";

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import moment from "moment";

import "./SendParcel.css";

const initialState = {
  selectedDay: "",
  recipientName: "",
  phone: "",
  city: "",
  email: "",
  postalCode: "",
  streetName: "",
  streetNumber: "",
  country: "",
  parcelWeight: "",
  parcelDepth: "",
  parcelHeight: "",
  parcelWidth: "",
  lat: "",
  lng: ""
};
const googleApiKey = "AIzaSyAUsnERWvgUrNKQy4YvHAaeg99HdhJLpTM";

class SendParcel extends Component {
  state = initialState;

  addParcel = (
    {
      selectedDay,
      recipientName,
      phone,
      city,
      postalCode,
      streetName,
      streetNumber,
      country,
      email,
      parcelWeight,
      parcelDepth,
      parcelHeight,
      parcelWidth,
      lat,
      lng
    } = this.state
  ) => {
    firebase
      .database()
      .ref("packages")
      .push({
        date_send: selectedDay
          ? selectedDay
          : moment(new Date()).format("YYYY-MM-DD"),
        client_id: this.props.clientID,
        delivery: {
          name: recipientName,
          phone,
          city,
          postalcode: postalCode,
          street: streetName,
          number: streetNumber,
          country,
          email
        },
        dimensions: {
          weight: parcelWeight,
          depth: parcelDepth,
          height: parcelHeight,
          width: parcelWidth
        },
        latitude: lat,
        longitude: lng,
        status: "pending",
        date_order: moment(new Date()).format("YYYY-MM-DD")
      });
  };

  syncGeoLocation = () =>
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?key=
    ${googleApiKey}&address=${this.state.city}+${this.state.postalCode}+${
        this.state.streetName
      }+${this.state.streetNumber}`
    )
      .then(response => response.json())
      .then(data => data.results)
      .then(results => results[0].geometry.location)
      .then(coords =>
        this.setState({
          lat: coords.lat,
          lng: coords.lng
        })
      );

  handleChange = event => {
    const id = event.target.id;
    const value = event.target.value;
    this.setState({
      [id]: value
    });
  };

  handleDayChange = (selectedDay, modifiers, dayPickerInput) => {
    const input = dayPickerInput.getInput();
    this.setState({
      selectedDay: moment(selectedDay).format("YYYY-MM-DD"),
      isEmpty: !input.value.trim(),
      isValidDay: typeof selectedDay !== "undefined",
      isDisabled: modifiers.disabled === true
    });
  };

  handleSendParcel = event => {
    event.preventDefault();
    this.syncGeoLocation().then(() => {
      this.addParcel();
      this.setState(initialState);
      this.props.refreshView();
      this.props.closeSendParcel();
    });
  };

  handleCopyContact = contact => {
    this.setState({
      recipientName: `${contact.company_name} ${contact.name} ${
        contact.surname
      }`,
      phone: contact.phone,
      city: contact.city,
      email: contact.email,
      postalCode: contact.postalcode,
      streetName: contact.street,
      streetNumber: contact.number,
      country: contact.country
    });
  };

  render() {
    return (
      <Form onSubmit={this.handleSendParcel}>
        <Segment color="purple">
          <Header as="h4">
            Please fill the form below to send a new package
          </Header>
          <Segment color="purple">
            <div className="sendParcel_div--pickerandpopup">
              <DayPickerInput
                placeholder={moment(new Date()).format("YYYY-MM-DD")}
                onDayChange={this.handleDayChange}
                selectedDay={this.state.selectedDay}
              />
  <div className="book__button--hide">
              <Popup
                keepInViewPort
                trigger={<Button type="button" content="Contacts Book" />}
                on="click"
              >
                <ContactsBook
                  perPage={2}
                  additionalClass={'showCopy'}
                  onCopyContact={this.handleCopyContact}
                />
              </Popup></div>
            </div>
          </Segment>
          <Header as="h4">Recipient details</Header>
          <Segment color="purple">
            <Form.Group widths="equal">
              <Form.Field
                id="recipientName"
                control={Input}
                label="Recipient name"
                placeholder="Recipient name"
                value={this.state.recipientName}
                onChange={this.handleChange}
                required
              />
              <Form.Field
                id="city"
                control={Input}
                label="City"
                placeholder="City"
                value={this.state.city}
                onChange={this.handleChange}
                required
              />
              <Form.Field
                id="postalCode"
                control={Input}
                label="Postal Code"
                placeholder="Postal Code"
                value={this.state.postalCode}
                onChange={this.handleChange}
                required
              />
              <Form.Field
                id="streetName"
                control={Input}
                label="Street name"
                placeholder="Street name"
                value={this.state.streetName}
                onChange={this.handleChange}
                required
              />
              <Form.Field
                id="streetNumber"
                control={Input}
                label="Street number"
                placeholder="Steet number"
                value={this.state.streetNumber}
                onChange={this.handleChange}
                required
              />
              <Form.Field
                id="country"
                control={Input}
                label="Country"
                placeholder="Country"
                value={this.state.country}
                onChange={this.handleChange}
              />
              <Form.Field
                id="phone"
                control={Input}
                label="Phone number"
                placeholder="Phone number"
                value={this.state.phone}
                onChange={this.handleChange}
                required
              />
              <Form.Field
                id="email"
                control={Input}
                label="Email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
          </Segment>
          <Header as="h4">Parcel details</Header>
          <Segment color="purple">
            <Form.Group widths="equal">
              <Form.Field
                id="parcelWeight"
                control={Input}
                label="Parcel weight"
                placeholder="Parcel weight"
                value={this.state.parcelWeight}
                onChange={this.handleChange}
                required
              />
              <Form.Field
                id="parcelWidth"
                control={Input}
                label="Parcel width"
                placeholder="Parcel width"
                value={this.state.parcelWidth}
                onChange={this.handleChange}
                required
              />
              <Form.Field
                id="parcelHeight"
                control={Input}
                label="Parcel height"
                placeholder="Parcel height"
                value={this.state.parcelHeight}
                onChange={this.handleChange}
                required
              />
              <Form.Field
                id="parcelDepth"
                control={Input}
                label="Parcel depth"
                placeholder="Parcel depth"
                value={this.state.parcelDepth}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
          </Segment>
          <Segment basic>
            <Form.Field
              id="sendParcel"
              control={Button}
              content="Send parcel"
            />
          </Segment>
        </Segment>
      </Form>
    );
  }
}

export default SendParcel;
