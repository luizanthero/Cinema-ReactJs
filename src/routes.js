import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./components/Header";

import FilmMain from "./pages/film/main";
import FilmDetails from "./pages/film/details";

const Routes = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/films" component={FilmMain} />
      <Route path="/films/:id" component={FilmDetails} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
