import React from "react";

export class ContentStateProvider extends React.Component {

  getData () {
    return {
      that: 'cool',
      cool: 'that',
    }
  }

  getId = () => 42;

  render () {
    const { children, ...props } = this.props;
    return (
      <div>
        {JSON.stringify(props)}
        { children }
      </div>
    );
  }
}