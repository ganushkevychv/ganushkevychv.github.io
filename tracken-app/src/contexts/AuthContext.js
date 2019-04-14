import React, { Component } from "react";
import firebase from "firebase";

// The argument passed to `createContext` is being used only
// if given context provider is not available within VDOM
// tree above the Consumer.
export const AuthContext = React.createContext({ user: null });
const { Provider, Consumer } = AuthContext;

export default class AuthContextProvider extends Component {
  state = {
    user: null,
    userData: {
      company_name: "",
      name: "",
      surname: "",
      nip: "",
      phone: "",
      city: "",
      postalcode: "",
      street: "",
      number: "",
      contactsBook:[]
    },
    signOut: () => firebase.auth().signOut(),
    signIn: (email, password) =>
      firebase.auth().signInWithEmailAndPassword(email, password)
  };

  userDbRef = null;

  readUserData = snapshot => {
    const person = snapshot.val();

    if (person === null) {
      return;
    }

    this.setState({
      userData: {
        name: person.name,
        surname: person.surname,
        company_name: person.company_name,
        nip: person.nip,
        phone: person.phone,
        city: person.city,
        postalcode: person.postalcode,
        street: person.street,
        number: person.number,
        contactsBook: Object.entries(person.contactsBook|| {}).map(([id, value]) => ({
          id,
          ...value
        }))
      }
    });
  };

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
      if (user !== null) {
        this.userDbRef = firebase.database().ref(`users/${user.uid}`);

        this.userDbRef.on("value", this.readUserData);
      } else {
        this.userDbRef && this.userDbRef.off("value", this.readUserData);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

// HOC - Higher Order Component
export const withAuth = Component => props => (
  <Consumer>{value => <Component {...props} authContext={value} />}</Consumer>
);
