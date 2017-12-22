import * as ts from "typescript";
import Parser from ".";
import { readFileSync } from "fs";

it("can parse code", () => {
  const code = readFileSync(
    "support/tests/fixtures/parser/async.ts"
  ).toString();
  const subject = new Parser({ "foo.ts": code }).parse();
  const result = {
    components: {
      add1: {
        thing: "asyncFunction",
        name: "add1",
        type: "(x: any) => any",
        docs: "",
        inputs: [
          {
            docs: "",
            name: "x",
            type: "any"
          }
        ],
        outputs: [
          {
            type: "unknown"
          }
        ]
      },
      resolveAfter2Seconds: {
        thing: "function",
        name: "resolveAfter2Seconds",
        type: "(x: any) => any",
        docs: "",
        inputs: [
          {
            docs: "",
            name: "x",
            type: "any"
          }
        ],
        outputs: [
          {
            type: "unknown"
          }
        ]
      }
    },
    nodes: [
      {
        component: "console.log",
        inputs: ["$$v"],
        name: "$$289"
      }
    ]
  };
  expect(subject).toEqual(result);
});

console.log(ts.SyntaxKind[182]);
