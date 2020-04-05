import React, { Component } from "react";
import { FaUserPlus } from "react-icons/fa";
import Button from "react-bootstrap/Button";

export default class Login extends Component {
  state = {
    emailId: "",
    password: "",
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.myChangeHandler = this.myChangeHandler.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let formdata = {
      emailId: this.state.emailId,
      password: this.state.password,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formdata),
    };
    var baseUrl = process.env.REACT_APP_API_URL;
    fetch(baseUrl + "/users/loginuser", requestOptions).then(function (
      response,
      error
    ) {
      if (error) alert(error);
      if (response.statusText === "OK") {
        window.location.pathname = "/dashboard";
      } else {
        alert(response.statusText);
      }
    });
  }

  myChangeHandler = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={this.handleSubmit}>
            <h3>Sign In</h3>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="emailId"
                value={this.state.emailId}
                onChange={this.myChangeHandler}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
                value={this.state.password}
                onChange={this.myChangeHandler}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Sign In
            </button>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
            <hr />
            <Button href="/register" className="btn btn-warning btn-block">
              <FaUserPlus /> Register
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
