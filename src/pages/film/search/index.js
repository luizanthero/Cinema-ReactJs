import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import cineAPi from "../../../services/CineApi";
import apiOmdb from "../../../services/Omdb-Api";

export default class Search extends Component {
  state = {
    filmName: "",
    filmOmdb: [],
    apiKey: "?apikey=f2396906",
    totalResult: 0,
    result: false,
    error: "",
    page: 1,
    openDialog: false,
    dialogFilmName: "",
    dialogFilmId: "",
  };

  handleKeyEnter = (event) => {
    if (event.key === "Enter") {
      this.setState({ filmOmdb: [] });
      this.loadFilms(event.target.value);
    }
  };

  handleChange = (event) => {
    this.setState({ filmName: event.target.value });
  };

  searchFilm = () => {
    const { filmName } = this.state;

    this.setState({ filmOmdb: [] });
    this.loadFilms(filmName);
  };

  loadFilms = async (filmName, pageNumber = 1) => {
    const { result } = this.state;

    const response = await apiOmdb.get(
      `${this.state.apiKey}&page=${pageNumber}&s=${filmName}`
    );

    this.setState({
      filmName: filmName,
      filmOmdb: await this.validationFilm(response.data.Search),
      lastPage: Math.round(response.data.totalResults / 10),
      result: response.data.Response,
      error: response.data.Error,
    });

    if (!result) {
      this.setState({ lastPage: 1 });
    }
  };

  prevPage = () => {
    const { filmName, page } = this.state;

    if (page === 1) return;

    const pageNumber = page - 1;

    this.setState({ page: pageNumber });

    this.loadFilms(filmName, pageNumber);
  };

  nextPage = () => {
    const { filmName, page, lastPage } = this.state;

    if (page === lastPage) return;

    const pageNumber = page + 1;

    this.setState({ page: pageNumber });

    this.loadFilms(filmName, pageNumber);
  };

  validationFilm = async (filmOmdb) => {
    const promises = filmOmdb.map(async (film) => {
      const response = await cineAPi.get(`/films/apiCode/${film.imdbID}`);
      return { ...film, Actived: response.data };
    });

    return await Promise.all(promises);
  };

  addFilm = async (name, apiCode) => {
    const film = {
      Name: name,
      ApiCode: apiCode,
    };

    const request = await cineAPi.post("/films", film);

    if (request && request.status === 200) {
      this.setState({ openDialog: false });
      this.loadFilms(this.state.filmName, this.state.page);
    }
  };

  handleClickOpenDialog = (name, id) => {
    this.setState({
      openDialog: true,
      dialogFilmName: name,
      dialogFilmId: id,
    });
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  render() {
    const {
      filmOmdb,
      page,
      lastPage,
      result,
      error,
      filmName,
      dialogFilmName,
      dialogFilmId,
    } = this.state;

    return (
      <div className="film-list">
        <div className="film-search">
          <Link to="/films" className="button button-default">
            Voltar
          </Link>
          <input
            value={filmName}
            type="text"
            name="filmName"
            placeholder="Pesquisar..."
            className="search"
            onKeyDown={this.handleKeyEnter}
            onChange={this.handleChange}
          />
          <button className="button button-info" onClick={this.searchFilm}>
            Pesquisar
          </button>
        </div>

        <div className="show-film">
          {result && filmOmdb ? (
            filmOmdb.map((film) => {
              return (
                <div className="show-box-film" key={film.imdbID}>
                  <div>
                    <strong>{film.Title}</strong>
                  </div>
                  <div className="poster">
                    <img src={film.Poster} alt={film.Name} title={film.Name} />
                  </div>
                  <div className="film-info-short">
                    <p>Year: {film.Year}</p>
                    <p>Tipo: {film.Type}</p>
                  </div>
                  <div className="container-buttons">
                    {!film.Actived ? (
                      <div
                        className="button button-info"
                        onClick={() =>
                          this.handleClickOpenDialog(film.Title, film.imdbID)
                        }
                      >
                        Adicionar
                      </div>
                    ) : (
                      <strong>Filme já cadastrado!</strong>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <strong>{error}</strong>
          )}
        </div>

        <div className="actions-pagination">
          <button disabled={page === 1 || !result} onClick={this.prevPage}>
            Anterior
          </button>
          <button
            disabled={page === lastPage || !result}
            onClick={this.nextPage}
          >
            Próximo
          </button>
        </div>

        <Dialog
          open={this.state.openDialog}
          onClose={this.handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`Adicionar ${dialogFilmName}?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Vamos adicionar o filme '{dialogFilmName} ({dialogFilmId})'
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDialog} color="primary">
              Cancelar
            </Button>
            <Button
              onClick={() => this.addFilm(dialogFilmName, dialogFilmId)}
              color="primary"
              autoFocus
            >
              Adicionar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
