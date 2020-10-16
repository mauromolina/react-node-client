import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './components/layout/Header';
import Nav from './components/layout/Nav';
import Clients from './components/clients/Clients';
import Products from './components/products/Products';
import Orders from './components/orders/Orders';
import NewClient from './components/clients/newClient';
import EditClient from './components/clients/editClient';

function App() {
  return (
    <Router>
      <>
      <Header/>
      <div className="grid contenedor contenido-principal">
        <Nav/>
        <main className="caja-contenido col-9">
          <Switch>
            <Route exact path="/" component={Clients}/>
            <Route exact path="/clients/new" component={NewClient}/>
            <Route exact path="/clients/edit/:id" component={EditClient}/>
            <Route exact path="/products" component={Products}/>
            <Route exact path="/orders" component={Orders}/>
          </Switch>
        </main>
      </div>
      </>
    </Router>
  )
}

export default App;
