import React from 'react';
import { ContentConsumer as C } from "@wework/content-utils";

class Lemon extends React.Component {
  render() {
    return (
      <C>
        {(items) => <h1>Number Of Items: {JSON.stringify(items)}</h1>}
      </C>
    );
  }
}

export default Lemon;
