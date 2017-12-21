import * as React from "react";
import Node from "./components/node";

export default function Graph({ components }) {
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
    </svg>
  );
}
