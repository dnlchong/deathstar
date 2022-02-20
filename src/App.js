import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Scraper from "./scraper";
import Scaffold from "./scaffold";

export default function App() {
  return (
    <Router>
      <div className="">
        <Switch>
        <Route path="/scaffold">
            <Scaffold/>
          </Route>
          <Route path="/">
            <Scraper/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}