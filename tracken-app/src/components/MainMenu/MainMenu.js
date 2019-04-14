import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Menu, Button, Responsive, Icon } from "semantic-ui-react";
import image from "./trackenLogo.svg";
import firebase from "firebase";
import "./MainMenu.css";
import Auth from "../Auth/Auth";
import ProfilePage from "../ProfilePage";
import { withAuth } from "../../contexts/AuthContext";

const NavItem = ({ to, children, exact }) => (
  <Menu.Item to={to} as={NavLink} exact={exact}>
    {children}
  </Menu.Item>
);

class MainMenu extends Component {
  state = {
    user: null,
    isOpen: false
  };

  componentDidMount() {
    window.addEventListener("click", this.closeMenu);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.closeMenu);
  }

  closeMenu = () => {
    this.setState({ isOpen: false });
  };

  handleToggle = event => {
    event.stopPropagation();
    this.setState({ isOpen: !this.state.isOpen });
  };

  renderMenu(isTogglable = false) {
    const { isOpen } = this.state;
    const user  = this.props.authContext.user;

    return (
      <div>
        <Menu stackable>
          <Menu.Item id="mainMenuHeaderContainer">
            <img className="mainMenuLogo" src={image} alt="tracken-logo" />
            <div id="mainMenuTextContainer">TRACKEN</div>

            {isTogglable && (
              <Button id="mainMenuButton" onClick={this.handleToggle}>
                <Icon id="hamburgerIcon"name="bars" size="big" color="black" />
              </Button>
            )}
          </Menu.Item>
          {((isTogglable === true && isOpen) || isTogglable === false) && (
            <div
              style={
                isTogglable
                  ? {
                      display: "block",
                      position: "absolute",
                      zIndex: 9999,
                      top: 70,
                      background: "white",
                      boxShadow: "0 3px 5px rgba(0, 0, 0, 0.5)",
                      width: 353
                    }
                  : { display: "inherit" }
              }
            >
              <NavItem exact to="/" as={NavLink}>
                Home
              </NavItem>
              <NavItem to="/dashboard" as={NavLink}>
                Dashboard
              </NavItem>
              <Auth>
                <NavItem to="/contacts" as={NavLink}>
                  My Contacts
                </NavItem>
                <NavItem to="/chat" as={NavLink}>
                  Chat
                </NavItem>
                <NavItem to="/profile-page" as={ProfilePage}>
                  My Profile
                </NavItem>

                <Menu.Item id="mainMenuUser">
                  {user && (
                    <p>
                      <span id="loggenInAs">Logged in as:</span>
                      <span id="loggedInUser">{user.email} </span>
                      <Button
                        id="signOutButton"
                        negative
                        size="mini"
                        onClick={() =>
                          firebase
                            .auth()
                            .signOut()
                            .then(() => this.props.history.push("/"))
                        }
                      >
                        Sign out
                      </Button>
                    </p>
                  )}
                </Menu.Item>
              </Auth>
            </div>
          )}
        </Menu>
      </div>
    );
  }

  render() {
    const threshold = Responsive.onlyMobile.maxWidth;
    return (
      <div>
        <Responsive maxWidth={threshold}>{this.renderMenu(true)}</Responsive>
        <Responsive minWidth={threshold + 1}>{this.renderMenu()}</Responsive>
      </div>
    );
  }
}
export default withAuth(withRouter(MainMenu));
