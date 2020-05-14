import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Router, navigate } from "@reach/router";
import firebase from "./Firebase";

import Home from "./components/Home";
import Welcome from "./components/Welcome";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Register from "./components/Register";
import Meetings from "./components/Meetings";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      displayName: null,
      userId: null,
    };
  }

  //react life cycle function
  //after all the elements of the page is rendered correctly, this method is called.
  componentDidMount() {
    //telling firebase we want the user object.
    // const ref = firebase.database().ref("user");
    //access the reference and ask for the event "value" e.g. whenever we get a new value for this "ref"
    // ref.on("value", (snapshot) => {
    //   let FBUser = snapshot.val();
    //   this.setState({ user: FBUser });
    // });
    firebase.auth().onAuthStateChanged((FBUser) => {
      if (FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userId: FBUser.uid,
        });
      }
    });
  }

  //@param username passed from Register component.
  registerUser = (userName) => {
    //whatever something changes about the registration this event onAuthStateChanged gets generate by the application.
    //we can track and do something whenever the registration changes (when register button is clicked)
    //the onAuthStateChanged will give us the user object e.g. FBUser
    firebase.auth().onAuthStateChanged((FBUser) => {
      //then update the profile (in firebase) with username.
      FBUser.updateProfile({
        displayName: userName,
      }).then(() => {
        //once it is updated in firebase, we can update the state.
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userId: FBUser.uid,
        });
        //redirect user to /meetings
        navigate("/meetings");
      });
    });
  };

  logOutUser = (e) => {
    e.preventDefault();
    //clear out the state/info
    this.setState({
      user: null,
      displayName: null,
      userId: null,
    });
    //redirect user to login route/page
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate("./login");
      });
  };

  render() {
    return (
      <div>
        <Navigation user={this.state.user} logOutUser={this.logOutUser} />
        {this.state.user && (
          <Welcome
            userName={this.state.displayName}
            logOutUser={this.logOutUser}
          />
        )}
        <Router>
          <Home path="/" user={this.state.user} />
          <Login path="/login" />
          <Meetings path="/meetings" />
          <Register path="/register" registerUser={this.registerUser} />
        </Router>
      </div>
    );
  }
}

export default App;
