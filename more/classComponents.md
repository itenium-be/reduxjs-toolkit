Class Components
================

You still have `class` components that are maybe not so easy to convert to a fn.

See redux-modern/src/layout/Footer.tsx for live example.

```ts
import { Component } from 'react';
import { connect, ConnectedProps } from "react-redux";
import { sliceAction, sliceActionAsync } from './someSlice';


class YourComponent extends Component<PropsFromRedux> {
  render() {
    const click = () => this.props.sliceAction();
    const clickAsync = () => this.props.sliceActionAsync();
    return <button onClick={click}>{this.props.value}</button>;
  }
}

const mapDispatch = {
  sliceAction,
  sliceActionAsync,
};

const mapStateToProps = (state: RootState) => ({
  value: state.value,
});

const connector = connect(mapStateToProps, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const Footer = connector(YourComponent);
```
