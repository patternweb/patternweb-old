import * as React from "react";

function calculateJoin(startX, startY, endX, endY) {
  const curve = Math.abs(startX - endX) / 2;
  return [
    ["M"],
    [startX, startY],
    ["C"],
    [startX + curve, startY],
    [endX - curve, endY],
    [endX, endY]
  ]
    .map(x => x.join(","))
    .join(" ");
}

export default function Edge({ fromX, fromY, toX, toY }) {
  return <path d={calculateJoin(fromX, fromY, toX, toY)} className="edge" />;
}
