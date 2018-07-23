import React from 'react';
import { ContentEntryProvider, ContentConsumer as C } from "@wework/content-utils";
import {Helmet} from "react-helmet";

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ContentEntryProvider entryId="2RACCLmIcwGmWqQ0UOWGig">
          <C Component="h1" render={({ fruit }) => (
            <React.Fragment>
              <Helmet>
                <title>{fruit}</title>
              </Helmet>
              Fruit: {fruit}
            </React.Fragment>
          )} />
          <C Component={props => JSON.stringify(props)}/>
        </ContentEntryProvider>
      </React.Fragment>
    );
  }
}

export default Home;
