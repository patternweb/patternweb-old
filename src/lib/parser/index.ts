import * as ts from "typescript";
import * as fs from "fs";
import { PatternCompilerHost } from "./hosts";

interface DocEntry {
  name?: string;
  docs?: string;
  args?: DocEntry[];
}

export default class Parser {
  private program;
  private checker;
  private output = {};

  constructor(private files = {}, private host = new PatternCompilerHost()) {
    const filenames = Object.keys(files);
    filenames.forEach(filename => {
      this.host.addFile(filename, files[filename]);
    });
    this.program = ts.createProgram(
      filenames,
      host.getCompilationSettings(),
      host
    );
    this.checker = this.program.getTypeChecker();
  }

  parse() {
    for (const sourceFile of this.program.getSourceFiles()) {
      // if (!sourceFile.isDeclarationFile) {
      ts.forEachChild(sourceFile, this.visit.bind(this));
      // }
    }
    return this.output;
  }

  private visit(node: ts.Node): void {
    if (ts.isFunctionDeclaration(node) && node.name) {
      const symbol = this.checker.getSymbolAtLocation(node.name);
      if (symbol) {
        const fn = this.serializeFunction(symbol);
        this.output[fn.name] = fn;
      }
    }
  }

  private serializeFunction(symbol: ts.Symbol): DocEntry {
    return {
      name: symbol.getName()
    };
  }
}

new Parser(new PatternCompilerHost());
