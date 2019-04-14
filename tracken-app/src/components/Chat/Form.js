import React, { Component } from "react";
import "./Form.css";
import Message from "../Chat/Message";
import firebase from "firebase";
class Form extends Component {
  
   state = {
      userName: "not registered",
      message: "",
      list: []
    };
    messageRef = firebase
      .database()
      .ref('chats').child(this.props.chatId)
      .child("messages");
    

  
  handleChange = (event) => {
    this.setState({ message: event.target.value });
  }
  handleSend = () => {
    if (this.state.message) {
      let newItem = {
        authorId: this.props.user.uid,
        content: this.state.message
      };
      this.messageRef.push(newItem);
      this.setState({ message: "" });
    }
  }
  handleKeyPress = (event) => {
    if (event.key !== "Enter") return;
    this.handleSend();
  }
  componentDidMount() {
    this.messageRef.limitToLast(100).on("value", message => {
      this.setState({
        list: Object.values(message.val() || {}).map(message => ({ ...message, userName: this.props.users[message.authorId].name}))
      });
    });
  }

  componentWillUnmount(){
    this.messageRef.off('value');
  }

  render() {
    return (
      <div className="form">
        <div className="form__message">
          {" "}
          {this.state.list.map((item, index) => (
            <Message key={index} message={item} />
          ))}{" "}
        </div>{" "}
        <div className="form__row">
          <input
            className="form__input"
            type="text"
            placeholder="Type message"
            value={this.state.message}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />{" "}
          <button className="form__button" onClick={this.handleSend}>
            send{" "}
          </button>{" "}
        </div>{" "}
      </div>
    );
  }
}
export default Form;