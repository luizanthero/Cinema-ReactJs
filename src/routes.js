import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./pages/main";
import Film from "./pages/film";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/films/:id" component={Film} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
