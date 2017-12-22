import Parser from ".";
import { readFileSync } from "fs";

it("can parse code", () => {
  const code = readFileSync(
    "support/tests/fixtures/parser/object_outputs.ts"
  ).toString();
  const subject = new Parser({ "foo.ts": code }).parse();
  const result = {
    components: {
      distance: {
        name: "distance",
        docs: "",
        type: "(origin: string, target?: string) => number",
        inputs: [
          {
            docs: "",
            name: "origin",
            type: "string"
          },
          {
            docs: "",
            name: "target",
            type: "string"
          }
        ],
        outputs: [{ type: "number" }]
      },
      milesTo: {
        name: "milesTo",
        docs: "",
        type: "(miles: number) => { km: number; m: number; }",
        inputs: [
          {
            docs: "",
            name: "miles",
            type: "number"
          }
        ],
        outputs: [
          { name: "km", docs: "", type: "number" },
          { name: "m", docs: "", type: "number" }
        ]
      },
      log: {
        name: "log",
        docs: "",
        type: "(toLog: any, unit: any) => void",
        inputs: [
          {
            docs: "",
            name: "toLog",
            type: "any"
          },
          {
            docs: "",
            name: "unit",
            type: "any"
          }
        ],
        outputs: []
      }
    },
    nodes: [
      {
        name: "$$233",
        component: "distance",
        inputs: ["MAN"]
      },
      {
        name: "milesTo",
        inputs: ["$$233"]
      },
      {
        name: "log",
        component: "log",
        inputs: ["$$milesTo", "km"]
      }
    ]
  };
  // console.log(JSON.stringify(subject, null, 2))
  expect(subject).toEqual(result);
});
