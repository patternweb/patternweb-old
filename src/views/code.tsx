import * as React from "react";

function handleSelect(e: React.SyntheticEvent<HTMLTextAreaElement>) {
  const { selectionStart, selectionEnd } = e.target as HTMLTextAreaElement;
  // console.log({ start: selectionStart+1, end: selectionEnd+1 });
  console.log({ selectionStart, selectionEnd });
}

export default function Code({ code, handleCodeChange }) {
  return (
    <textarea
      id="code"
      autoCapitalize="off"
      autoCorrect="off"
      spellCheck={false}
      onChange={handleCodeChange}
      onSelect={handleSelect}
      value={code}
    />
  );
}
