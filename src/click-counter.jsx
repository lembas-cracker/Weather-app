import React, { Component } from "react";

export class ClickCounter extends Component {
  state = {
    count: 0
  };

  incrementCount = () => {
    const nextCount = this.state.count + 1;
    this.setState({
      count: nextCount
    });
  };

  render() {
    return (
      <div>
        <ClickCounterButton onIncrementRequest={this.incrementCount} />
        <ClickCounterNumber number={this.state.count} />
      </div>
    );
  }
}

// =========================================================

class ClickCounterNumber extends Component {
  render() {
    const n = this.props.number;
    return <ClickCounterNumberInner number={n} />;
  }
}

class ClickCounterNumberInner extends Component {
  render() {
    return <span>You've clicked {this.props.number} times</span>;
  }
}

class ClickCounterButton extends Component {
  render() {
    return (
      <ClickCounterButtonInner
        onIncrementRequest={this.props.onIncrementRequest}
      />
    );
  }
}

class ClickCounterButtonInner extends Component {
  render() {
    return <button onClick={this.props.onIncrementRequest}>Click me</button>;
  }
}
