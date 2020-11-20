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
import Country from "./Country"
import SingleState from './SingleState'
import SingleCase from './SingleCase'
import SingleDate from "./SingleDate";
import SingleCountry from './SingleCountry'
import SingleDateCountry from './SingleDateCountry'
import WorldDate from './WorldDate'
import SingleWorldDate from './SingleWorldDate'

export default function App() {
  return (
    <Router>
      <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/states">State</Nav.Link>
          <Nav.Link href="/dates">Date (US)</Nav.Link>
          <Nav.Link href="/countries">Country</Nav.Link>
          <Nav.Link href="/worlddates">Date (World)</Nav.Link>
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
          <Route path="/countries">
            <Country />
          </Route>
          <Route exact path="/country/:state" component={SingleCountry} />
          <Route exact path="/country/:state/:date" component={SingleDateCountry} />
          <Route path="/worlddates">
            <WorldDate />
          </Route>
          <Route exact path="/worlddate/:date" component={SingleWorldDate} />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}