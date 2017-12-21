import Parser from ".";
import { readFileSync } from "fs";

it("can parse code", () => {
  const code = readFileSync(
    "support/tests/fixtures/parser/object_return.ts"
  ).toString();
  const subject = new Parser({ "foo.ts": code }).parse();
  const result = {
    mmTo: {
      docs: "converts millimeters to different units",
      name: "mmTo",
      type: "(mm?: number) => { cm: number; inches: number; }",
      inputs: [
        {
          name: "mm",
          docs: "millimeters",
          type: "number"
        }
      ],
      outputs: [
        {
          name: "cm",
          docs: "",
          type: "number"
        },
        {
          name: "inches",
          docs: "",
          type: "number"
        }
      ]
    }
  };
  expect(subject).toEqual(result);
});
