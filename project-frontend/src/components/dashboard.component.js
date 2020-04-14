import React, { Component } from "react";
import NavHeader from "./navbar.component";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <NavHeader />
        <h1>Dashboard</h1>
      </div>
    );
  }
}

export default () => (
  <div>
    <Dashboard />
  </div>
);
