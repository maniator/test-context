import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Home from './Home';
import {Theme} from "@wework/rivendell-components/Theme";
import styledReset from 'styled-reset';
import {injectGlobal} from "styled-components";

injectGlobal`${styledReset}`;
const App = () => (
  <Theme reset={false}>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </Theme>
);

export default App;
