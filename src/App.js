import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Settings from './containers/Settings/Settings';
import Checkout from './containers/Checkout/Checkout';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div >
          <Layout>
            <Route path='/' exact render={()=><BurgerBuilder />} />
            <Route path='/settings' component={Settings} />
            <Route path='/checkout' component={Checkout} />
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
