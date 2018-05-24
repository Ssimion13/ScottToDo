import React, { Component } from 'react';
import FrontPage from "./FrontPage";
import {Switch, Route} from "react-router-dom";
import Navbar from "./Navbar";
import ToDoList from "./ToDos/ToDoList.js"
import LongTerm from "./LongTerm/LongTerm.js"
import HobbyList from "./Hobby/HobbyList.js"
import GhostRacer from "./GhostRacer/GhostRacer.js"


class App extends Component {


  render() {
    return (
      <div className="App">
      <Navbar />
      <Switch>
      <Route path="/GhostRacer" component={GhostRacer} />
      <Route path="/ToDoList" component={ToDoList} />
      <Route path="/LongTerm" component={LongTerm} />
      <Route path="/HobbyList" component={HobbyList} />
      <Route path="/" component={FrontPage} />
      </Switch>
      </div>
    );
  }
}

export default App;
