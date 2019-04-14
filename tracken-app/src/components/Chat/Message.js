import React, { Component } from "react";
import "./Message.css";
class Message extends Component {
  render() {
    return (
      <div className="MainMessage">
        <span className="message__author"> {this.props.message.userName}:</span>{" "}
        {this.props.message.content}{" "}
      </div>
    );
  }
}
export default Message;