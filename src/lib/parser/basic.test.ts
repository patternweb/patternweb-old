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
      thing: "function",
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
          docs: "last number",
          defaultValue: 1
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
      thing: "function",
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
          docs: "",
          defaultValue: "hello"
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
