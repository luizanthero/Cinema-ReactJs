import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import "./styles.css";

import Sidebar from "../Sidebar";

export default class Header extends Component {
  state = {
    isActive: false,
  };

  handleOpenMenu = () => {
    const { isActive } = this.state;

    if (isActive) {
      this.setState({ isActive: false });
    } else {
      this.setState({ isActive: true });
    }
  };

  render() {
    const { isActive } = this.state;

    return (
      <>
        <header id="main-header">
          <IconButton
            onClick={this.handleOpenMenu}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </header>
        <>{isActive ? <Sidebar /> : ""}</>
      </>
    );
  }
}
