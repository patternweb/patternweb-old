import { parseCode } from ".";

const code = `function add(a,b) { return a+b }`;

it("can parse code", () => {
  const subject = parseCode(code);
  const result = {
    add: {
      inputs: [["a", "number"], ["b", "number"]],
      outputs: [[undefined, "number"]]
    }
  };
  expect(subject.components).toEqual(result);
});
