import * as React from "react";
import Node from "./components/node";
import Edge from "./components/edge";
import ToolTip from "./components/tool_tip";

export default function Graph({ data }) {
  console.clear();
  console.log(JSON.stringify(data, null, 2));
  return (
    <svg id="graph">
      {Object.keys(data.components).map((component, i) => (
        <Node
          key={data.components[component].name}
          x={50 + 200 * i}
          y={100}
          component={data.components[component]}
        />
      ))}
      {/* <Edge fromX={100} fromY={100} toX={300} toY={250} /> */}
      {/* <ToolTip x={100} y={100} /> */}
    </svg>
  );
}
