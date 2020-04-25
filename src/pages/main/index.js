import React, { Component } from "react";
import api from "../../services/Api";
import { Link } from "react-router-dom";

import "./styles.css";

export default class Main extends Component {
  state = {
    films: [],
    filmInfo: {},
    page: 1,
  };

  componentDidMount() {
    this.loadFilms();
  }

  loadFilms = async (page = 1) => {
    const response = await api.get("/films/" + page + "/1");

    const { data, ...filmInfo } = response.data;

    this.setState({ films: data, filmInfo: filmInfo, page });
  };

  prevPage = () => {
    const { page } = this.state;

    if (page === 1) return;

    const pageNumber = page - 1;

    this.loadFilms(pageNumber);
  };

  nextPage = () => {
    const { page, filmInfo } = this.state;

    if (page === filmInfo.lastPage) return;

    const pageNumber = page + 1;

    this.loadFilms(pageNumber);
  };

  render() {
    const { films, filmInfo, page } = this.state;

    return (
      <div className="film-list">
        {films.map((film) => (
          <article key={film.id}>
            <strong>{film.Name}</strong>
            <p>{film.ApiCode}</p>

            <Link to={"/films/" + film.id}>Acessar</Link>
          </article>
        ))}
        <div className="actions">
          <button disabled={page === 1} onClick={this.prevPage}>
            Anterior
          </button>
          <button disabled={page === filmInfo.lastPage} onClick={this.nextPage}>
            Próximo
          </button>
        </div>
      </div>
    );
  }
}
