import React, { Component } from "react";
import api from "../../services/Api";

import "./styles.css";

export default class Film extends Component {
  state = {
    film: {},
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    const response = await api.get("/films/" + id);

    this.setState({ film: response.data });
  }

  render() {
    const { film } = this.state;

    return (
      <div className="film-info">
        <h1>{film.Name}</h1>
        <p>{film.ApiCode}</p>
      </div>
    );
  }
}
