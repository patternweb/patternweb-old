import Parser from ".";
import { readFileSync } from "fs";

it("can parse code", () => {
  const code = readFileSync(
    "support/tests/fixtures/parser/no_return.ts"
  ).toString();
  const subject = new Parser({ "foo.ts": code }).parse();
  const result = {
    log: {
      docs: "logs a value",
      name: "log",
      thing: "function",
      type: "(toLog: any) => void",
      inputs: [
        {
          name: "toLog",
          docs: "value to log",
          type: "any"
        }
      ],
      outputs: []
    }
  };
  expect(subject.components).toEqual(result);
});
