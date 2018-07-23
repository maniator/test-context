import * as React from 'react';

const ServerContext = React.createContext(null);

export class ServerProvider extends React.Component {
  render () {
    console.log('Providing data', { props: this.props });

    return (
      <ServerContext.Provider value={{ ...this.props.data }}>
        {this.props.children}
      </ServerContext.Provider>
    );
  }
}
export const ServerConsumer = ServerContext.Consumer;
