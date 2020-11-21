import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Grid } from '@material-ui/core'
import { Main, Search, Login, User } from '../pages';
import { Footer } from '../components';
import './pages.css';

const Home = () => {
  return (
    <>
      <div className='wrapper'> 
        <Route path='/main' component={Main} />
        <Route path='/search' component={Search} />
        <Route path='/login' component={Login} />
        <Route path='/user' component={User} />
      </div>
      <Footer />
    </>
  )
}

export default Home;