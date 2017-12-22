import Parser from ".";
import { readFileSync } from "fs";

it("can parse code", () => {
  const code = readFileSync(
    "support/tests/fixtures/parser/components_and_nodes.ts"
  ).toString();
  const subject = new Parser({ "foo.ts": code }).parse();
  const result = {
    components: {
      add: {
        name: "add",
        docs: "",
        type: "(a: any, b: any) => any",
        inputs: [
          {
            docs: "",
            name: "a",
            type: "any"
          },
          {
            docs: "",
            name: "b",
            type: "any"
          }
        ],
        outputs: [{ type: "any" }]
      },
      sub: {
        name: "sub",
        docs: "",
        type: "(x: any, y: any) => number",
        inputs: [
          {
            docs: "",
            name: "x",
            type: "any"
          },
          {
            docs: "",
            name: "y",
            type: "any"
          }
        ],
        outputs: [{ type: "number" }]
      }
    },
    nodes: [
      {
        name: "$$82",
        component: "add",
        inputs: [10, 20]
      },
      {
        name: "$$108",
        component: "add",
        inputs: [5, "$$first"]
      },
      {
        name: "$$122",
        component: "sub",
        inputs: ["$$first", "$$second"]
      }
    ]
  };
  expect(subject).toEqual(result);
});
