import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCreditCard, faCashRegister,
  faUser, faTachometerAlt
} from '@fortawesome/free-solid-svg-icons';
import Dashboard from './Dashboard';
import Debit from './Debit';
import Credit from './Credit';
import FlagProfiles from './FlagProfiles';

class AppShell extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="sidebar">
          <div className="sidebar-header">
            <big><span style={{color: '#d7063d'}}>MARLIANS</span> Detector</big>
          </div>
          <div className="sidebar-nav">
            <ul>
              <NavLink exact to="/">
                <li>
                  <FontAwesomeIcon icon={faTachometerAlt} style={{marginRight: '8px'}} />{"  "}Dashboard
                </li>
              </NavLink>
              <NavLink exact to="/debit">
                <li>
                  <FontAwesomeIcon icon={faCreditCard} style={{marginRight: '8px'}} />{"  "}Simulate Debit
                </li>
              </NavLink>
              <NavLink exact to="/credit">
                <li>
                  <FontAwesomeIcon icon={faCashRegister} style={{marginRight: '8px'}} />{"  "}Simulate Credit
                </li>
              </NavLink>
              <NavLink exact to="/flag-profiles">
                <li>
                  <FontAwesomeIcon icon={faUser} style={{marginRight: '8px'}} />{"  "}Flag Profiles
                </li>
              </NavLink>
            </ul>
          </div>
        </div>
        <div className="main">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/debit" component={Debit} />
            <Route exact path="/credit" component={Credit} />
            <Route exact path="/flag-profiles" component={FlagProfiles} />
          </Switch>
        </div>
      </React.Fragment>
    )
  }
}

export default AppShell