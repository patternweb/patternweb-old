import * as React from "react";
import * as ReactDOM from "react-dom";

import Code from "./views/code";
import Graph from "./views/graph";

class App extends React.Component {
  render() {
    return (
      <div id="ui">
        <Code />
        <Graph />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
