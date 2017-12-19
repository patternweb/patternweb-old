import Parser from ".";

const code = `
function greet(name,greeting='hello') { return [greeting, " ", name].join(" ") }
/**
* adds two numbers
* @param a first number
* @param b last number
*/
function add(a:number,b=1) { return a+b }
`;

it("can parse code", () => {
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
          name: undefined,
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
          name: undefined,
          type: "any"
        }
      ]
    }
  };
  expect(subject).toEqual(result);
});
