import * as React from "react";

const PORT_HEIGHT = 24;
const CONNECTOR_RADIUS = 8;
const NODE_PADDING = 7;

function InPort({ i, name, id, type, defaultValue }) {
  return (
    <g
      transform={`translate(0, ${i * PORT_HEIGHT})`}
      onMouseOver={() => console.log(id)}
      className={type}
    >
      <circle
        cx={-CONNECTOR_RADIUS}
        cy={-CONNECTOR_RADIUS / 2}
        r={CONNECTOR_RADIUS}
      />
      <text className="default" x={-18}>
        {defaultValue}
      </text>
      <text>{name}</text>
    </g>
  );
}

function OutPort({ i, name = "", id, type }) {
  return (
    <g
      transform={`translate(0, ${i * PORT_HEIGHT})`}
      onMouseOver={() => console.log(id)}
      className={type}
    >
      <circle
        cx={CONNECTOR_RADIUS}
        cy={-CONNECTOR_RADIUS / 2}
        r={CONNECTOR_RADIUS}
      />
      <text>{name}</text>
    </g>
  );
}

export default function Node({ x, y, component, inputs = [] }) {
  const width = 100;
  const height =
    (Math.max(
      (component.inputs || []).length,
      (component.outputs || []).length
    ) +
      2) *
    PORT_HEIGHT;

  return (
    <g className="node" transform={`translate(${x}, ${y})`}>
      <rect
        x={-NODE_PADDING}
        y={0}
        width={width + NODE_PADDING * 2}
        height={height}
      />
      <text
        className="node-name"
        x={width / 2}
        y={PORT_HEIGHT}
        onMouseOver={() => console.log(component.docs)}
      >
        {component.name}
      </text>
      <g className="inports" transform={`translate(0, ${PORT_HEIGHT * 2})`}>
        {(component.inputs || []).map((arg, i) => {
          const id = [component.name, arg.name].join("<");
          return (
            <InPort
              key={id}
              id={id}
              name={arg.name}
              i={i}
              type={arg.type}
              defaultValue={inputs[i] || arg.defaultValue}
            />
          );
        })}
      </g>
      <g
        className="outports"
        transform={`translate(${width}, ${PORT_HEIGHT * 2})`}
      >
        {(component.outputs || []).map((arg, i) => {
          const id = [component.name, arg.name].join(">");
          return (
            <OutPort key={id} id={id} name={arg.name} i={i} type={arg.type} />
          );
        })}
      </g>
    </g>
  );
}
