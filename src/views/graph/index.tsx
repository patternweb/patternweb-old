import * as React from "react";
import Node from "./components/node";

export default function Graph() {
  const components = [
    {
      name: "test",
      inputs: [{ name: "a" }, { name: "b" }],
      outputs: [{ name: "test" }]
    }
  ];
  return (
    <svg id="graph">
      {components.map(component => (
        <Node key={component.name} x={100} y={100} component={component} />
      ))}
    </svg>
  );
}
