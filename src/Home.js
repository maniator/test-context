import React from 'react';
import {ContentProvider} from "./ContentProvider";

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ContentProvider> I am a child </ContentProvider>
      </React.Fragment>
    );
  }
}

export default Home;
