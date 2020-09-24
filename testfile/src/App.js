import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import { BrowserRouter, Switch,Route, Link } from 'react-router-dom';
import ProductDetails from './Components/ProductDetails';

function App() {
  return (
    <BrowserRouter>
    <Switch> 
      <div className="App">
      <Route path="/"  exact={true} component={Home} />
      <Route path="/product/:id"  exact={true} component={ProductDetails} />
      </div>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
