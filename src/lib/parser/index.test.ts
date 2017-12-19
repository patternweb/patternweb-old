import Parser from ".";

const code = `
function add(a:number,b=1) { return a+b }
function greet(name,greeting='hello') { return [greeting, " ", name].join(" ") }
`;

it("can parse code", () => {
  const subject = new Parser({ "foo.ts": code }).parse();
  const result = {
    add: {
      name: "add",
      type: "(a: number, b?: number) => number",
      inputs: [
        {
          name: "a",
          type: "number"
        },
        {
          name: "b",
          type: "number"
        }
      ],
      outputs: [
        {
          name: undefined,
          type: "number"
        }
      ]
    },
    greet: {
      name: "greet",
      type: "(name: any, greeting?: string) => any",
      inputs: [
        {
          name: "name",
          type: "any"
        },
        {
          name: "greeting",
          type: "string"
        }
      ],
      outputs: [
        {
          name: undefined,
          type: "any"
        }
      ]
    }
  };
  expect(subject).toEqual(result);
});
