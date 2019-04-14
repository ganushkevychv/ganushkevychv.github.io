import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Parcel from "../Parcel";
import HomeView from "../HomeView";
import Chat from "../Chat";
import Dashboard from "../Dashboard";
import SignUp from "../SignUp";
import ProfilePage from "../ProfilePage"
import Contacts from "../Contacts/Contacts";
class Root extends Component {
  render() {
    return (
      <Router>
        <div style={{ display: "flex", width: "100%" }}>
          <div
            style={{
              flexGrow: 1,
              minHeight: "100px",
              boxSizing: "border-box"
            }}
          >
            <Route exact path="" component={HomeView} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route path="/dashboard/:parcelId" component={Parcel} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/chat" component={Chat} />
            <Route path="/contacts" component={Contacts} />
            <Route path="/profile-page" component={ProfilePage} />
          </div>
        </div>
      </Router>
    );
  }
}

export default Root;
