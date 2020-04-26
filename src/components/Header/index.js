import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import "./styles.css";

import Sidebar from "../Sidebar";

export default class Header extends Component {
  state = {
    isActive: false,
  };

  render() {
    return (
      <>
        <header id="main-header">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </header>
        <>
          <Sidebar />
        </>
      </>
    );
  }
}
