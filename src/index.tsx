import * as React from "react";
import * as ReactDOM from "react-dom";

import Code from "./views/code";
import Graph from "./views/graph";
import Debug from "./views/debug";

import Parser from "./lib/parser";

interface IState {
  code: string;
  components: any;
}

class App extends React.Component<{}, IState> {
  state = {
    components: {
      components: {},
      nodes: []
    },
    code: `/**
* adds two numbers
* @param a first number
* @param b last number
*/
function add(a:number,b:number=1) {
  return {x:1,y:2}
}`
  };

  handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const code = e.target.value;
    this.setState((prevState: IState) => {
      prevState.code = code;
      prevState.components = new Parser({ "foo.ts": code }).parse();
      return prevState;
    });
  }

  render() {
    const { code, components } = this.state;
    return (
      <div id="ui">
        <Code code={code} handleCodeChange={this.handleChange.bind(this)} />
        <Graph data={components} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
