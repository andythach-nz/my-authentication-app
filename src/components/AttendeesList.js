import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import { GoTrashcan, GoStar, GoMail } from "react-icons/go";
import { FaLink } from "react-icons/fa";
import firebase from "../Firebase";

class AttendeesList extends React.Component {
  constructor(props) {
    super(props);
    this.deleteAttendee = this.deleteAttendee.bind(this);
  }

  deleteAttendee = (e, whichMeeting, whichAttendee) => {
    e.preventDefault();
    const adminUser = this.props.adminUser;
    const ref = firebase
      .database()
      .ref(`meetings/${adminUser}/${whichMeeting}/attendees/${whichAttendee}`);
    ref.remove();
  };

  //give user a star next to their name/attendee
  toggleStar = (e, star, whichMeeting, whichAttendee) => {
    e.preventDefault();
    const adminUser = this.props.adminUser;
    const ref = firebase
      .database()
      .ref(
        `meetings/${adminUser}/${whichMeeting}/attendees/${whichAttendee}/star`
      );
    console.log("star", star);
    //ensure star is not clicked yet
    if (star === undefined) {
      //set star to true
      ref.set(true);
    } else {
      //set the opposite of what it is already is
      ref.set(!star);
    }
  };

  render() {
    //only admin can remove attendees
    const admin = this.props.adminUser === this.props.userId ? true : false;
    const attendees = this.props.attendees;
    const myAttendees = attendees.map((item) => {
      return (
        <div
          className="col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1"
          key={item.attendeeId}
        >
          <div className="card ">
            <div
              className={
                "card-body px-3 py-2 d-flex align-items-center " +
                (admin ? "" : "justify-content-center")
              }
            >
              {admin && (
                <div className="btn-group pr-2">
                  <button
                    className={
                      "btn btn-sm " +
                      (item.star ? "btn-info" : "btn-outline-secondary")
                    }
                    title="Give star"
                    onClick={(e) =>
                      this.toggleStar(
                        e,
                        item.star,
                        this.props.meetingId,
                        item.attendeeId
                      )
                    }
                  >
                    <GoStar />
                  </button>
                  <a
                    href={`mailto:${item.attendeeEmail}`}
                    className="btn btn-sm btn-outline-secondary"
                    title="Mail Attendee"
                  >
                    <GoMail />
                  </a>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    title="Delete Attendee"
                    onClick={(e) =>
                      this.deleteAttendee(
                        e,
                        this.props.meetingId,
                        item.attendeeId
                      )
                    }
                  >
                    <GoTrashcan />
                  </button>
                </div>
              )}
              <div>{item.attendeeName}</div>
            </div>
          </div>
        </div>
      );
    });

    return <div className="row justify-content-center">{myAttendees}</div>;
  }
}

export default AttendeesList;
