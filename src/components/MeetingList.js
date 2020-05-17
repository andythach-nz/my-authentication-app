import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import { GoTrashcan, GoListUnordered } from "react-icons/go";
import { FaLink } from "react-icons/fa";
import firebase from "../Firebase";

class MeetingList extends React.Component {
  constructor(props) {
    super(props);
    this.deleteMeeting = this.deleteMeeting.bind(this);
  }

  //@param event
  //@param meetingId
  //function is called when recycleButton is pressed.
  deleteMeeting = (e, whichMeeting) => {
    console.log("whichMeeting", whichMeeting);
    //stop page from loading
    e.preventDefault();
    //create reference to firebase for the meetings
    const ref = firebase
      .database()
      .ref(`meetings/${this.props.userId}/${whichMeeting}`);
    //remove the meeting
    ref.remove();
  };

  render() {
    const { meetings } = this.props;
    //loop through each meeting and render the HTML
    const myMeetings = meetings.map((item) => {
      console.log("item", item);
      return (
        <div className="list-group-item d-flex" key={item.meetingId}>
          <section
            className="btn-group align-self-center"
            role="group"
            aria-label="Meeting Options"
          >
            <button
              className="btn btn-sm btn-outline-secondary"
              title="Delete"
              onClick={(e) => this.deleteMeeting(e, item.meetingId)}
            >
              <GoTrashcan />
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              title="Check In"
              onClick={() =>
                navigate(`/checkin/${this.props.userId}/${item.meetingId}`)
              }
            >
              <FaLink />
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              title="Attendees List"
              onClick={() =>
                navigate(`/attendees/${this.props.userId}/${item.meetingId}`)
              }
            >
              <GoListUnordered />
            </button>
          </section>
          <section className="pl-3 text-left align-self-center">
            {item.meetingName}
          </section>
        </div>
      );
    });
    return <div>{myMeetings}</div>;
  }
}

export default MeetingList;
