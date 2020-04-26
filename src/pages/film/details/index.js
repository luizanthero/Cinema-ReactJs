import React, { Component } from "react";
import { Link } from "react-router-dom";

import cineAPi from "../../../services/CineApi";
import apiOmdb from "../../../services/Omdb-Api";

export default class Film extends Component {
  state = {
    film: {},
    filmOmdb: {},
    apiKey: "?apikey=f2396906",
    plotFilm: "&plot=full",
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await cineAPi.get("/films/" + id);
    const responseOmdb = await apiOmdb.get(
      this.state.apiKey + this.state.plotFilm + "&i=" + response.data.ApiCode
    );
    this.setState({ film: response.data, filmOmdb: responseOmdb.data });
  }

  render() {
    const { film, filmOmdb } = this.state;

    return (
      <div className="show-box show-box-info">
        <h1>{film.Name}</h1>

        <div className="show-box-info-image">
          <img src={filmOmdb.Poster} alt={film.Name} title={film.Name} />
          <div className="show-box-info-info">
            <p>
              <strong>Duração:</strong> {filmOmdb.Runtime}
            </p>
            <p>
              <strong>Tipo:</strong> {filmOmdb.Type}
            </p>
            <p>
              <strong>Ano:</strong> {filmOmdb.Year}
            </p>
            <p>
              <strong>Gênero:</strong> {filmOmdb.Genre}
            </p>
            <p>
              <strong>Produção:</strong> {filmOmdb.Production}
            </p>
            <p>
              <strong>Diretor:</strong> {filmOmdb.Director}
            </p>
            <p>
              <strong>Idiomas:</strong> {filmOmdb.Language}
            </p>
            <p>
              <strong>Paises:</strong> {filmOmdb.Country}
            </p>
            <p>
              <strong>Prêmios:</strong> {filmOmdb.Awards}
            </p>
            <p>
              <strong>DVD:</strong> {filmOmdb.DVD}
            </p>
            <p>
              <strong>Nota IMDb:</strong> {filmOmdb.imdbRating}
            </p>
            <p>
              <strong>Votos:</strong> {filmOmdb.imdbVotes}
            </p>
          </div>
        </div>

        <div className="show-box-info-resume">
          <p>{filmOmdb.Plot}</p>
        </div>

        <Link to="/films" className="button button-default button-back">
          Voltar
        </Link>
      </div>
    );
  }
}
