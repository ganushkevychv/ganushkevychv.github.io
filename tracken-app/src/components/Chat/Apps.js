import React, { Component } from "react";
import "./Apps.css";
import Form from "../Chat/Form.js";
import { Dropdown, Menu } from 'semantic-ui-react'
import firebase from "firebase";
import MainMenu from "../MainMenu";
import { withAuth } from "../../contexts/AuthContext";
import moment from "moment";


class Apps extends Component {
  state = {
    user: null,
    adminIds: null,
    users: null,
    currentChatId: null
  };

  readAdmins = snapshot => {
    this.setState({
      adminIds: Object.keys(snapshot.val() || {})
    });
  };

  readUsers = snapshot => {
    this.setState({
      users: snapshot.val()
    });
  };

  readChats = snapshot => {
    this.setState({
      chats: snapshot.val()
    })
  }

  getChats = () => {
    const { chats, users } = this.state
    const user = this.props.authContext.user
    if (!chats || !users || !user) {
      return []
    }

    const chatIdsAsObject = this.state.users[user.uid].chatIds
    const chatIdsAsArray = Object.keys(chatIdsAsObject || {})

    const presentedChats = chatIdsAsArray
      .map(chatId => {
        if (chatId) {
          return {
            ...chats[chatId],
            id: chatId
          }
        } else {
          return null
        }
      })
      .filter(chat => chat !== null)
      .filter(chat => {
        const { firstUserId, secondUserId } = chat
        const loggedInUserId = user.uid
        
        return firstUserId !== loggedInUserId || secondUserId !== loggedInUserId 
      })
      .map(chat => {
        const { firstUserId, secondUserId } = chat
        const loggedInUserId = user.id
        return {
          chatId: chat.id,
          userName: loggedInUserId === firstUserId ? users[secondUserId].name : users[firstUserId].name 
        }
      })

    return presentedChats
  }

  componentDidMount() {
    
    firebase
      .database()
      .ref("admins")
      .on("value", this.readAdmins);
    firebase
      .database()
      .ref("users")
      .on("value", this.readUsers);
    firebase
      .database()
      .ref("chats")
      .on("value", this.readChats)
  }

  componentWillUnmount() {
    firebase
      .database()
      .ref("admins")
      .off("value", this.readAdmins);
    firebase
      .database()
      .ref("users")
      .off("value", this.readUsers);
    firebase
      .database()
      .ref("users")
      .off("value", this.readChats);
  }

  startChat = chatBuddyId => {
    const myId = this.props.authContext.user && this.props.authContext.user.uid;

    if (myId === null || chatBuddyId === null) {
      return;
    }

    const chatId = firebase
      .database()
      .ref("chats")
      .push().key;

    const updates = {
      [`/chats/${chatId}`]: {
        firstUserId: myId,
        secondUserId: chatBuddyId,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      },
      [`/users/${myId}/chatIds/${chatId}`]: true,
      [`/users/${chatBuddyId}/chatIds/${chatId}`]: true,
      
    }
    
    firebase
      .database()
      .ref().update(updates)

    this.setState({
      currentChatId: chatId
    });
  };

  handleSignIn() {
    firebase
      .auth()
      .signInWithEmailAndPassword()
      .then(data => {
        this.setState({ error: null, success: "Sign in successful" });
      })
      .catch(error => this.setState({ error: error, success: null }));
  }
  handleLogOut() {
    firebase.auth().signOut();
  }
  render() {
    const users =
      this.state.adminIds &&
      this.state.adminIds
        .map(
          userId =>
            this.state.users &&
            this.state.users[userId] && {
              id: userId,
              ...this.state.users[userId]
            }
        )
        .filter(user => (user === undefined || user === null ? false : true));

    return (
      <div className="app">
        <div
          className="mainMenuChat"
          style={{ width: "100%", background: "#eee" }}
        >
          <MainMenu />
        </div>
        <div>
          <h1>Welcome to Tracken Chat</h1>
          <ul>
            {users &&
              users.map(user => (
                <li key={user.id}>
                  
                  <button  className="ui button active" onClick={() => this.startChat(user.id)}>Start Chat with Admin </button>
                </li>
              ))}
          </ul>
          
       
          
        </div>
        <div className="app__list">
        <Menu horizontal="true">
            <Dropdown item text={(this.state.currentChatUserName)} style={{
              textAlign: "center"
            }}>
              <Dropdown.Menu>
          {this.props.authContext.user && this.state.users && this.getChats().map(
            chat => {
              return (<Dropdown.Item key={chat.chatId} onClick={() => this.setState({
                currentChatId: chat.chatId,
                currentChatUserName: chat.userName 
                
              })}>{chat.userName} {moment(chat.createdAt).fromNow()}</Dropdown.Item>)
            })}
              </Dropdown.Menu>
            </Dropdown>
          </Menu>
          {this.state.currentChatId && (
            <Form user={this.props.authContext.user} users={this.state.users} key={this.state.currentChatId} chatId={this.state.currentChatId} />
          )}
        </div>
      </div>
    );
  }
}
export default withAuth(Apps);
