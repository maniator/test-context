import React from 'react';
import { ContentConsumer as C } from "@wework/content-utils";

class Thing extends React.Component {
  render() {
    return (
      <C Component="table" render={({id, fruit, ...data} = {}) => (
        <React.Fragment>
          <td>{id}</td>
          <td>{fruit}</td>
          <td>{JSON.stringify(data)}</td>
        </React.Fragment>
      )}/>
    );
  }
}

export default Thing;
