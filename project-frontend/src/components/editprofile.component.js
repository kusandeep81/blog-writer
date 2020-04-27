import React, { Component } from "react";
import NavHeader from "./navbar.component";
import ReactHtmlParser from "react-html-parser";
import Cookies from 'js-cookie';
class EditProfile extends Component {
  state = {
    error: null,
    isLoaded: false,
    profile: {
      _id:"",
      email: Cookies.get("emailId"),
      //birthday: "",
      city: "",
      occupation: "",
      interest: "",
      bio: "",
    },
  };

  constructor() {
    super();
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  myChangeHandler = (event) => {
    var profile = { ...this.state.profile };
      let { name, value } = event.target;
      profile[name] = value;
    this.setState({ profile });
  };

  componentDidMount() {
    fetch(`${process.env.REACT_APP_API_URL}/profile/displayprofile`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        let profileObj = {};
        Object.keys(data).forEach(function (item) {
          profileObj[item] = data[item];
        });
        this.setState({ profile: profileObj });
      });
  }

  handleSubmit(event) {
    const { params } = this.props.match;
    this.profileId = params.id;
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.profile),
    };
    fetch(
      `${process.env.REACT_APP_API_URL}/profile/editprofile/${this.profileId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then(function (data) {
        const promise1 = new Promise(function (resolve, reject) {
          resolve();
        });
        promise1.then(function (value) {
          window.location.pathname = "/profile/displayprofile";
        });
      });
  }

  render() {
    return (
      <div>
        <NavHeader />
        <div className="conatiner">
          <h1> Edit Profile </h1>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="email"> Email</label>
              <input
                type="text"
                name="email"
                value={this.state.profile.email}
                className="form-control"
                placeholder="Email"
                onChange={this.myChangeHandler}
                disabled
              />
            </div>
             <div className="form-group">
              <label htmlFor="birthday">Birthday</label>
              <input
                type="text"
                name="birthday"
                value={this.state.profile.birthday}
                onChange={this.myChangeHandler}
                className="form-control"
                placeholder="Birthday"
              />
            </div> 
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                value={this.state.profile.city}
                onChange={this.myChangeHandler}
                className="form-control"
                placeholder="City"
              />
            </div>
            <div className="form-group">
              <label htmlFor="occupation">Occupation</label>
              <input
                type="text"
                name="occupation"
                value={this.state.profile.occupation}
                onChange={this.myChangeHandler}
                className="form-control"
                placeholder="Occupation"
              />
            </div>
            <div className="form-group">
              <label htmlFor="interest">Interest</label>
              <input
                type="text"
                name="interest"
                value={this.state.profile.interest}
                onChange={this.myChangeHandler}
                className="form-control"
                placeholder="Your interest"
              />
            </div>
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <input
                type="text"
                name="bio"
                value={this.state.profile.bio}
                onChange={this.myChangeHandler}
                className="form-control"
                placeholder="Say something about yourself"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditProfile;
