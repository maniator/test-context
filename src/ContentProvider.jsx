import * as React from 'react';
import { ServerConsumer } from "./serverContext";
import { ContentStateProvider } from "./ContentStateProvider";

const renderChildrenWithServerData = (props) => (state, ...rest) => {
  console.log({ state, props, rest }, 'I AM DATA', ServerConsumer);

  return (
    <ContentStateProvider currentState={state} {...props} />
  );
};

export class ContentProvider extends React.Component {
  render() {
    // console.log({ Consumer }, 'CONTEXT is cool');
    return (
      <ServerConsumer>{renderChildrenWithServerData(this.props)}</ServerConsumer>
    );
  }
}
