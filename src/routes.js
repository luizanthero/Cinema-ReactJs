import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./components/Header";

import FilmMain from "./pages/film/main";
import FilmDetails from "./pages/film/details";
import FilmSearch from "./pages/film/search";

const Routes = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/films" component={FilmMain} />
      <Route path="/films/:id" component={FilmDetails} />
      <Route path="/searchfilms" component={FilmSearch} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
