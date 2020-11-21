import React from 'react'
import { Route, Switch } from 'react-router-dom';
import { Home } from './View/pages'

const App = () => {
  return (
      <div id='content'>
        <Switch>
          <Route path='/' component={Home} />
        </Switch>
      </div>
  );
}

export default App;
