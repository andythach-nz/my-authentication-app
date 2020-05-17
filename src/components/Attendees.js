import React, { Component } from "react";
import firebase from "../Firebase";
import AttendeesList from "./AttendeesList";
import { FaUndo, FaRandom } from "react-icons/fa";

class Attendees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      allAttendees: [],
      displayAttendees: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.resetQuery = this.resetQuery.bind(this);
  }

  componentDidMount() {
    const ref = firebase
      .database()
      .ref(`meetings/${this.props.userId}/${this.props.meetingId}/attendees`);

    ref.on("value", (snapshot) => {
      let attendees = snapshot.val();
      let attendeesList = [];
      for (let item in attendees) {
        attendeesList.push({
          attendeeId: item,
          attendeeName: attendees[item].attendeeName,
          attendeeEmail: attendees[item].attendeeEmail,
          star: attendees[item].star,
        });
      }
      this.setState({
        allAttendees: attendeesList,
        displayAttendees: attendeesList,
      });
    });
  }

  //search queries
  handleChange(e) {
    const itemName = e.target.name;
    const itemValue = e.target.value;
    console.log("itemName", itemName);
    console.log("itemValue", itemValue.toLowerCase());
    this.setState({ [itemName]: [itemValue] });
  }

  //reset search query
  resetQuery() {
    this.setState({displayAttendees:this.state.allAttendees,searchQuery:""});
  }

  //pick random attendees
  pickRandom() {
    const randomAttendee = Math.floor(Math.random()*this.state.allAttendees.length);
    console.log(randomAttendee)
    this.resetQuery();
    this.setState({
      displayAttendees: [this.state.allAttendees[randomAttendee]]
    })
  }

  render() {
    const dataFilter = (item) =>
      item.attendeeName
        .toLowerCase()
        .match(this.state.searchQuery.toString().toLowerCase()) && true;
        const filteredAttendees = this.state.displayAttendees.filter(dataFilter);

    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="font-weight-light text-center">Attendees</h1>
            <div className="card bg-light mb-4">
              <div className="card-body text-center">
                <div className="input-group input-group-lg">
                <input
                  className="form-control"
                  type="text"
                  name="searchQuery"
                  value={this.state.searchQuery}
                  placeholder="Search Attendees"
                  onChange={this.handleChange}
                ></input>
                <div className="input-group-append">
                  <button className="btn btn-sm btn-outline-info" title="Reset Search" onClick={() => this.resetQuery()}>
                    <FaUndo />
                  </button>
                  <button className="btn btn-sm btn-outline-info" title="Pick a random Attendee" onClick={() => this.pickRandom()}>
                    <FaRandom />
                  </button>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AttendeesList
          userId={this.props.userId}
          meetingId={this.props.meetingId}
          adminUser={this.props.adminUser}
          attendees={filteredAttendees}
        />
      </div>
    );
  }
}

export default Attendees;
