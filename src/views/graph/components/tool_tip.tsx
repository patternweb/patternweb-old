import * as React from "react";

export default function ToolTip({ x, y }) {
  return <rect className="tool-tip" x={x} y={y} width={150} height={50} />;
}
