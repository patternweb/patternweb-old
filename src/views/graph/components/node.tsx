import * as React from "react";

const PORT_HEIGHT = 24;
const CONNECTOR_RADIUS = 8;
const NODE_PADDING = 7;

function InPort({ i, name }) {
  return (
    <g transform={`translate(0, ${i * PORT_HEIGHT})`}>
      <circle
        cx={-CONNECTOR_RADIUS}
        cy={-CONNECTOR_RADIUS / 2}
        r={CONNECTOR_RADIUS}
      />
      <text>{name}</text>
    </g>
  );
}

function OutPort({ i, name = "" }) {
  return (
    <g transform={`translate(0, ${i * PORT_HEIGHT})`}>
      <circle
        cx={CONNECTOR_RADIUS}
        cy={-CONNECTOR_RADIUS / 2}
        r={CONNECTOR_RADIUS}
      />
      <text>{name}</text>
    </g>
  );
}

export default function Node({ x, y, component }) {
  const width = 100;
  const height =
    (Math.max(component.inputs.length, component.outputs.length) + 2) *
    PORT_HEIGHT;
  return (
    <g className="node" transform={`translate(${x}, ${y})`}>
      <rect
        x={-NODE_PADDING}
        y={0}
        width={width + NODE_PADDING * 2}
        height={height}
      />
      <text className="node-name" x={width / 2} y={PORT_HEIGHT}>
        {component.name}
      </text>
      <g className="inports" transform={`translate(0, ${PORT_HEIGHT * 2})`}>
        {component.inputs.map((arg, i) => (
          <InPort
            key={[component.name, arg.name].join("<")}
            name={arg.name}
            i={i}
          />
        ))}
      </g>
      <g
        className="outports"
        transform={`translate(${width}, ${PORT_HEIGHT * 2})`}
      >
        {component.outputs.map((arg, i) => (
          <OutPort
            key={[component.name, arg.name].join(">")}
            name={arg.name}
            i={i}
          />
        ))}
      </g>
    </g>
  );
}
