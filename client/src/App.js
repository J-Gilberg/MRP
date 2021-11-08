import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Analyze from './views/Analyze';
import Dashboard from './views/Dashboard';
import CriticalItems from './views/CriticalItems';
import Planning from './views/Planning';
import Receiving from './views/Receiving';
import Tabs from './components/Tabs';
import {generateCREquation} from './components/GenerateForecast';


import './App.css';

function App() {
  useEffect(() => {
    generateCREquation({start:'2014/01/01', end:'2015/01/01', product_id: 228});

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
