import React, { Component } from "react";
import { Link } from "react-router-dom";

import cineApi from "../../../services/CineApi";

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
    const response = await cineApi.get("/films/" + page + "/10");

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
      <div className="entity-list">
        <Link className="button button-default button-add">
          Adicionar novo Filme
        </Link>
        {films.map((film) => (
          <article key={film.id} className="show-box">
            <strong>{film.Name}</strong>
            <p>{film.ApiCode}</p>

            <div className="container-buttons">
              <Link to={"/films/" + film.id} className="button button-info">
                Acessar
              </Link>
              <Link className="button button-success">Alterar</Link>
              <Link className="button button-danger">Excluir</Link>
            </div>
          </article>
        ))}
        <div className="actions-pagination">
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
