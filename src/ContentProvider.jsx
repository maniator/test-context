import * as React from 'react';
import { ServerConsumer } from "./serverContext";
import { ContentStateProvider } from "./ContentStateProvider";

const renderChildrenWithServerData = (props) => (state, ...rest) => {
  return (
    <ContentStateProvider currentState={state} {...props} />
  );
};

export class ContentProvider extends React.Component {
  render() {
    if (ServerConsumer._currentValue) {
      console.log('load consumer');
      return (
        <ServerConsumer>{renderChildrenWithServerData(this.props)}</ServerConsumer>
      );
    } else {
      console.log('load state');
      return <ContentStateProvider currentState={null} {...this.props} />;
    }
  }
}
