import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {Navbar, Nav} from "react-bootstrap"
import State from './State'
import Date from './Date'
import Home from './Home'
import SingleState from './SingleState'
import SingleCase from './SingleCase'
import SingleDate from "./SingleDate";

export default function App() {
  return (
    <Router>
      <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/states">State</Nav.Link>
          <Nav.Link href="/dates">Date</Nav.Link>
        </Nav>
      </Navbar>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/states">
            <State />
          </Route>
          <Route exact path="/state/:state" component={SingleState} />
          <Route exact path="/state/:state/:date" component={SingleCase} />
          <Route path="/dates">
            <Date />
          </Route>
          <Route exact path="/date/:date" component={SingleDate} />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}