import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import Home from './Home';
import { setupContentUtils } from '@wework/content-utils';
import {Theme} from "@wework/rivendell-components/Theme";
import styledReset from 'styled-reset';
import {injectGlobal} from "styled-components";

injectGlobal`${styledReset}`;

setupContentUtils({
  space: '1rbvukm23hvz',
  accessToken: '9925b1f7b7765f13450fda5cef765f921f806aecc6f5c927368dcbb0c944a8cb',
  logHandler: (...args) => console.warn('ERROR HAPPENED', ...args),
});

const App = () => (
  <Theme reset={false}>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </Theme>
);

export default App;
