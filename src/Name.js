import React from 'react';
import { ContentConsumer as C } from "@wework/content-utils";

class Name extends React.Component {
  render() {
    return (
      <C render={({ title } = '') => title }/>
    );
  }
}

export default Name;
