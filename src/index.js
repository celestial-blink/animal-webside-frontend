import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './views/home';
import Layout from './views/layout';
import Information from './views/information';
import Login from './views/login';
import Galery from './views/galery';
import Contact from './views/contact';
import Error404 from './views/notfound';
import Animalform from './components/animalform/Animalform';

import Systemadmin from './views/Systemadmin';

ReactDOM.render(
  <React.StrictMode>
    <>
      <BrowserRouter>
        <Switch>
            <Route exact path="/system/admin" component={Systemadmin}/>
            <Route exact path="/login" component={Login}/>
            <Layout>
              <Switch>
                  <Route exact path="/">
                      <Home/>
                  </Route>
                  <Route exact path="/galery">
                      <Galery/>
                  </Route>
                  <Route exact path="/contact">
                      <Contact/>
                  </Route>
                  <Route exact path="/animal/information" component={Information}/>
                  <Route exact path="/animal/new" component={Animalform}/>
                  <Route exact path="*">
                      <Error404/>
                  </Route>
              </Switch>
            </Layout>
        </Switch>
      </BrowserRouter>
    </>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
