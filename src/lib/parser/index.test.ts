import Parser from ".";

const code = `function add(a,b) { return a+b }`;

it("can parse code", () => {
  const subject = new Parser({ "foo.ts": code }).parse();
  const result = {
    add: {
      inputs: [["a", "number"], ["b", "number"]],
      outputs: [[undefined, "number"]]
    }
  };
  expect(subject).toEqual(result);
});
