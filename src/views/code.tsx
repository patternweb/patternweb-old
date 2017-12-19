import * as React from "react";

export default function Code({ code, handleCodeChange }) {
  return (
    <textarea
      id="code"
      autoCapitalize="off"
      autoCorrect="off"
      spellCheck={false}
      onChange={handleCodeChange}
      value={code}
    />
  );
}
