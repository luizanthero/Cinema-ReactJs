import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./styles.css";

export default class Sidebar extends Component {
  render() {
    return (
      <ul id="main-menu">
        <li>
          <Link to="/">CineAPI</Link>
        </li>
        <li>
          <Link to="/films">Filmes</Link>
        </li>
        <li>
          <Link to="/rooms">Salas</Link>
        </li>
        <li>
          <Link to="/screens">Telas</Link>
        </li>
      </ul>
    );
  }
}
