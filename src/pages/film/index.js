import React, { Component } from "react";
import api from "../../services/Api";
import apiOmdb from "../../services/Omdb-Api";
import { Link } from "react-router-dom";

import "./styles.css";

export default class Film extends Component {
  state = {
    film: {},
    filmOmdb: {},
    apiKey: "?apikey=f2396906",
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await api.get("/films/" + id);
    const responseOmdb = await apiOmdb.get(
      this.state.apiKey + "&i=" + response.data.ApiCode
    );
    this.setState({ film: response.data, filmOmdb: responseOmdb.data });
  }

  render() {
    const { film, filmOmdb } = this.state;

    return (
      <div className="film-info">
        <h1>{film.Name}</h1>

        <img src={filmOmdb.Poster} alt={film.Name} title={film.Name} />

        <p>Ano: {filmOmdb.Year}</p>
        <p>Gênero: {filmOmdb.Genre}</p>
        <p>Diretor: {filmOmdb.Director}</p>
        <p>Idiomas: {filmOmdb.Language}</p>
        <p>Resumo: {filmOmdb.Plot}</p>
        <p>Paises: {filmOmdb.Country}</p>
        <p>Prêmios: {filmOmdb.Awards}</p>

        <Link to="/">Voltar</Link>
      </div>
    );
  }
}
