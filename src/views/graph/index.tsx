import * as React from "react";
import Node from "./components/node";
import Edge from "./components/edge";
import ToolTip from "./components/tool_tip";

export default function Graph({ data }) {
  console.clear();
  console.log(JSON.stringify(data, null, 2));
  return (
    <svg id="graph">
      {data.nodes
        .filter(
          ({ component }) => data.components[component] /*!!component ||*/
        )
        .map((node, i) => (
          <Node
            key={`node${i}`}
            x={50 + 200 * i}
            y={100}
            component={data.components[node.component]}
            inputs={node.inputs}
          />
        ))}
    </svg>
  );
}
