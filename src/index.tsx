import * as React from "react";
import * as ReactDOM from "react-dom";

import Code from "./views/code";
import Graph from "./views/graph";
import Debug from "./views/debug";

interface IState {
  code: string;
}

class App extends React.Component<{}, IState> {
  state = {
    code: `function(a:number,b:number=1):number {
  return a+b
}`
  };

  handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const code = e.target.value;
    this.setState((prevState: IState) => {
      prevState.code = code;
      return prevState;
    });
  }

  render() {
    const { code } = this.state;
    return (
      <div id="ui">
        <Code code={code} handleCodeChange={this.handleChange.bind(this)} />
        <Graph />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
