import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

// Pages
import Home from '../../pages/LandingPage/Home';
import About from '../../pages/About/About';
import Streamer from '../../pages/Browse/Streamer';
import JoinLeague from '../../pages/Browse/JoinLeague';
import Tournament from '../../pages/Browse/Tournament';
import Profile from '../../pages/Profile/Profile';
import KothService from '../../pages/KothService/KothService';
import Dashboard from '../../pages/Dashboard/Dashboard';
import VerifyModal from '../../components/Modal/VerifyModal';

/**
 * Site Router
 */
const Router = () => {
  return (
    <Switch>
      {/* HOME PAGE */}
      <Route path="/" exact component={Home} />

      {/* ABOUT PAGE */}
      <Route path="/about" component={About} />

      {/* Verify Email */}
      <Route path='/verify-email' component={VerifyModal} />
      <Redirect from='*' to='/' />

      {/* PROFILE PAGE */}
      <Route path="/profile" component={Profile} />

      {/* BROWSE PAGE */}
      <Route path="/streamer" component={Streamer} />
      <Route path="/tournament" component={Tournament} />
      <Route path="/join-league" component={JoinLeague} />

      {/* DASHBOARD PAGE */}
      <Route path="/dashboard" component={Dashboard} />

      {/* KOTH SERVICE PAGE */}
      <Route path="/koth-service" component={KothService} />
    </Switch>
  );
};

export default Router;
