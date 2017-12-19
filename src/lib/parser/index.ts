import * as ts from "typescript";
import * as fs from "fs";
import { PatternCompilerHost } from "./hosts";

interface DocEntry {
  name?: string;
  docs?: string;
  args?: DocEntry[];
}

export function parseCode(
  code,
  options: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS
  }
): any {
  const host = new PatternCompilerHost();
  host.addFile("foo.ts", code);
  const program = ts.createProgram(
    ["foo.ts"],
    host.getCompilationSettings(),
    host
  );
  const checker = program.getTypeChecker();
  const output = {};

  function serializeFunction(symbol: ts.Symbol): DocEntry {
    return {
      name: symbol.getName()
    };
  }

  function visit(node: ts.Node): void {
    // console.log(ts.SyntaxKind[node.kind]);
    if (ts.isFunctionDeclaration(node) && node.name) {
      const symbol = checker.getSymbolAtLocation(node.name);
      if (symbol) {
        const fn = serializeFunction(symbol);
        output[fn.name] = serializeFunction(symbol);
      }
    }
  }

  for (const sourceFile of program.getSourceFiles()) {
    // if (!sourceFile.isDeclarationFile) {
    ts.forEachChild(sourceFile, visit);
    // }
  }

  console.log(output);

  return {
    components: {
      add: {
        inputs: ["a", "number"]
      }
    }
  };
}
