import Parser from ".";
import { readFileSync } from "fs";

it("can parse code", () => {
  const code = readFileSync(
    "support/tests/fixtures/parser/basic.ts"
  ).toString();
  const subject = new Parser({ "foo.ts": code }).parse();
  const result = {
    add: {
      name: "add",
      type: "(a: number, b?: number) => number",
      docs: "adds two numbers",
      inputs: [
        {
          name: "a",
          type: "number",
          docs: "first number"
        },
        {
          name: "b",
          type: "number",
          docs: "last number"
        }
      ],
      outputs: [
        {
          type: "number"
        }
      ]
    },
    greet: {
      name: "greet",
      type: "(name: any, greeting?: string) => any",
      docs: "",
      inputs: [
        {
          name: "name",
          type: "any",
          docs: ""
        },
        {
          name: "greeting",
          type: "string",
          docs: ""
        }
      ],
      outputs: [
        {
          type: "unknown"
        }
      ]
    }
  };
  expect(subject.components).toEqual(result);
});
