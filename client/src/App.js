import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Analyze from './views/Analyze';
import Dashboard from './views/Dashboard';
import CriticalItems from './views/CriticalItems';
import Planning from './views/Planning';
import Receiving from './views/Receiving';
import Tabs from './components/Tabs';


import './App.css';

function App() {
  return (
      <div className="App background">
        <Tabs />
        <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path='/criticalitems'>
              <CriticalItems />
            </Route>
            <Route exact path="/planning">
              <Planning />
            </Route>
            <Route exact path="/receiving">
              <Receiving />
            </Route>
            <Route exact path="/analyze">
              <Analyze />
            </Route>
          </Switch>
        </BrowserRouter>
        </div>
      </div>
  );
}

export default App;
