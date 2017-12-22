import * as React from "react";
import Node from "./components/node";
import Edge from "./components/edge";

export default function Graph({ components }) {
  console.clear();
  console.log(JSON.stringify(components, null, 2));
  return (
    <svg id="graph">
      {Object.keys(components).map((component, i) => (
        <Node
          key={components[component].name}
          x={50 + 200 * i}
          y={100}
          component={components[component]}
        />
      ))}
      <Edge fromX={100} fromY={100} toX={300} toY={250} />
    </svg>
  );
}
