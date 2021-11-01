import React, { useEffect, useState } from 'react';
import { Socket } from './service/Socket';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Dashboard } from './views/Dashboard';


import './App.css';

function App() {

  useEffect(() => {
  }, []);

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
