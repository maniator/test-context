import React from 'react';
import { ContentConsumer as C } from "@wework/content-utils";

class Id extends React.Component {
  render() {
    return (
      <C Component="span" render={({ id } = {}) => id }/>
    );
  }
}

export default Id;
