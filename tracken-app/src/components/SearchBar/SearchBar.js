import React, { Component } from "react";
import { Input, Form } from "semantic-ui-react";
import "./SearchBar.css";
import { getPackagesPromise } from "../../services";

class SearchBar extends Component {
  state = {
    searchPhrase: "",
    parcel: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    getPackagesPromise().then(data => {
      this.setState({
        parcel:
          data.find(parcel => parcel.id === this.state.searchPhrase) || null
      });
    });
  };
  handleChange = event => {
    this.setState({
      searchPhrase: "-" + event.target.value
    });
  };

  render() {
    const { parcel } = this.state;
    return (
      <>
        
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Input
                onChange={this.handleChange}
                className="search-bar"
                action="Search"
                placeholder="Enter package number"
              />
            </Form.Field>
          </Form>
        
        <div id="detailsParcel" >
          {parcel === "" && <p style={{ textAlign: "center" }} />}
          {parcel === null && (
            <p style={{ "padding":"5px", color:"red" }}>Package not found. Please check package number</p>
          )}
          {parcel && (
            <div className="detailsTable">
              <div>
                <h4>Send Date</h4>
                <p>{parcel.date_send || ""}</p>
              </div>
              <div>
                <h4>Status</h4>
                <p
                  style={{
                    color:
                      parcel.status === "received"
                        ? "#006622"
                        : parcel.status === "send"
                        ? "#0099ff"
                        : "#e68a00"
                  }}
                >
                  {parcel.status || "-"}
                </p>
              </div>
              <div>
                <h4>Courier ID</h4>
                <p>{parcel.courier_id || "-"}</p>
              </div>
              <div>
                <h4>Delivery Date</h4>
                <p>{parcel.date_delivery || "-"}</p>
              </div>
              <div>
                <h4>Dimensions</h4>
                <p>
                  depth(mm): {parcel.dimensions.depth || "-"}
                  <br />
                  height(mm): { parcel.dimensions.height || "-"}
                  <br />
                  width(mm): {parcel.dimensions.width || "-"}
                  <br />
                  weight(kg): {parcel.dimensions.weight || "-"}
                  <br />
                </p>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}



export default SearchBar;
