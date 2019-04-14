import React, { Component } from "react";
import MainMenu from "../MainMenu";
import firebase from 'firebase'
import { Link } from "react-router-dom";
import moment from "moment";


import { Select, Button } from "semantic-ui-react";

import "./Dashboard.css";
import { getPackagesPromise } from "../../services";
import SendParcel from "../SendParcel/SendParcel";
import Auth from "../Auth/Auth";
import { withAuth } from "../../contexts/AuthContext";

class Dashboard extends Component {
  state = {
    packages: [],
    searchPhrase: "",
    pagination: 0,
    option: "all",
    showSendParcel: false,
    user: {
      name: "",
      surname: "",
      uid: "",
      email: ""
    },
    admin:'8Bs4aOt02UM4pih740Ql0dviPJC3'
  };

  syncPackages = () =>
    getPackagesPromise().then(packages => this.setState({ packages }));

  componentDidMount() {
    this.syncPackages();
  }

  handleChange = event => {
    this.setState({
      searchPhrase: event.target.value
    });
  };
  handlePaginationChange = event => {
    const paginationPage = event.target.value;
    this.setState({
      pagination: paginationPage * 10
    });
  };
  handleOptionChange = (event, data) => {
    this.setState({
      option: data.value
    });
  };

  toggleShowSendParcel = () => {
    this.setState({ showSendParcel: !this.state.showSendParcel });
  };

  handleChangeStatus = (event, data) => {
    const packageId = data.dataid;
    const packageName = data.name;
    const date = packageName === 'send' ? {date_send:moment(new Date()).format("YYYY-MM-DD")} : {date_delivery:moment(new Date()).format("YYYY-MM-DD")}
    firebase
      .database()
      .ref("packages")
      .child(packageId)
      .update({
        status:packageName,
        ...date
      })

      this.syncPackages()
  }

  render() {
    const { user, userData } = this.props.authContext;
    const {
      packages,
      pagination,
      option,
      searchPhrase,
      showSendParcel,
      admin
    } = this.state;
    const paginationButton = pagination === 0 ? pagination : pagination/10 -1;
    const filteredPackages = packages
      .slice()
      .filter(pack =>  (user.uid === admin ? true : pack.client_id === user.uid))
      .sort((a, b) => (moment(a.date_send).isAfter(b.date_send) ? -1 : 1))
      .map(pack => ({
        ...pack,
        searchData: (
          pack.delivery.name +
          pack.delivery.city +
          pack.delivery.street
        ).toLowerCase()
      }))
      .filter(pack => pack.searchData.includes(searchPhrase.toLowerCase()))
      .filter(pack => (option === "all" ? true : pack.status === option));
    return (
      <div className="Dashboard">
        <div style={{ width: "100%", background: "#eee" }}>
        <MainMenu />
        </div>
        <Auth
          cover={() => <p>Dashboard is available for logged in users only.</p>}
        >
          <h1>Dashboard</h1>
          <h4>{user ? `Witaj, ${userData.name} ${userData.surname}` : ""}</h4>
          <div className="dashboard-interface">
            <div className="ui input">
              <input
                placeholder="Search..."
                value={searchPhrase}
                onChange={this.handleChange}
              />
            </div>
            <Select
              placeholder="Select status"
              options={[
                { key: 1, value: "all", text: "All" },
                { key: 2, value: "received", text: "Received" },
                { key: 3, value: "send", text: "Send" },
                { key: 4, value: "pending", text: "Pending" }
              ]}
              onChange={this.handleOptionChange}
            />
            <div>
              <Button onClick={() => this.toggleShowSendParcel(showSendParcel)}>
                {showSendParcel ? "Cancel" : "Send new parcel"}
              </Button>
            </div>
          </div>
          <br />
          <br />
          {showSendParcel && (
            <SendParcel
              clientID={user.uid}
              closeSendParcel={() => this.toggleShowSendParcel(showSendParcel)}
              refreshView={() => this.syncPackages()}
            />
          )}

          <table className="ui celled table">
            <thead>
              <tr>
                <th>Date order</th>
                <th>Date send</th>
                <th>Status</th>
                <th>Delivery Name</th>
                <th>Delivery address</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredPackages
                .map(pack => (
                  <tr key={pack.id}>
                    <td><span className="span__title--td">Date order:&nbsp;&nbsp; </span>{pack.date_order}</td>
                    <td><span className="span__title--td">Date send:&nbsp;&nbsp; </span>{pack.date_send}</td>
                    <td
                      style={{
                        color:
                          pack.status === "received"
                            ? "#21ba45"
                            : pack.status === "send"
                            ? "#2185d0"
                            : "#e68a00"
                      }}
                    >
                      <span className="span__title--td">Status:&nbsp;&nbsp; </span>{pack.status}
                    </td>
                    <td><span className="span__title--td">Delivery name:&nbsp;&nbsp; </span>{pack.delivery.name}</td>
                    <td><span className="span__title--td">Delivery address:&nbsp;&nbsp; </span><span className="span__content--td">
                      {pack.delivery.city} {pack.delivery.postalcode},{" "}
                      {pack.delivery.street} {pack.delivery.number}</span>
                    </td>
                    <td className="td_buttons"><span className="span__title--td">Details:&nbsp;&nbsp; </span>
                      <Link to={`/dashboard/${pack.id}`}>
                        <Button circular color='grey' icon='info' />
                      </Link>
                      {user.uid === admin && 
                      (<>
                      <Button dataid={pack.id} name="send" onClick={this.handleChangeStatus} circular color='blue' icon='send'/>
                      <Button dataid={pack.id} name="received" onClick={this.handleChangeStatus} circular color='green' icon='check'/>
                      </>)}
                    </td>
                  </tr>
                ))
                .slice(pagination, pagination + 10)}
            </tbody>
          </table>
          <div className="pagination">
            {Array.from({
              length: Math.ceil(filteredPackages.length / 10)
            }).map((button, index) => (
              <button
                className="ui button"
                key={index}
                value={index}
                onClick={this.handlePaginationChange}
              >
                {index + 1}
              </button>
            )).slice(paginationButton, paginationButton +5)}
          </div>
        </Auth>
      </div>
    );
  }
}

export default withAuth(Dashboard);
