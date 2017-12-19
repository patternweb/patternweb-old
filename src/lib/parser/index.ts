import * as ts from "typescript";
import * as fs from "fs";
import { PatternCompilerHost } from "./hosts";

interface DocEntry {
  name?: string;
  docs?: string;
  args?: DocEntry[];
  type?: string;
  inputs?: DocEntry[];
  outputs?: DocEntry[];
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

    this.visit = this.visit.bind(this);
    this.parse = this.parse.bind(this);
    this.serializeSymbol = this.serializeSymbol.bind(this);
    this.serializeSignature = this.serializeSignature.bind(this);
    this.serializeFunction = this.serializeFunction.bind(this);
  }

  parse() {
    for (const sourceFile of this.program.getSourceFiles()) {
      // if (!sourceFile.isDeclarationFile) {
      ts.forEachChild(sourceFile, this.visit);
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

  private serializeSymbol(symbol: ts.Symbol): DocEntry {
    return {
      name: symbol.getName(),
      type: this.checker.typeToString(
        this.checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!)
      )
    };
  }

  private serializeSignature(signature: ts.Signature) {
    return {
      inputs: signature.parameters.map(this.serializeSymbol),
      outputs: [
        {
          name: undefined,
          type: this.checker.typeToString(signature.getReturnType())
        }
      ]
    };
  }

  private serializeFunction(symbol: ts.Symbol): DocEntry {
    const details = this.serializeSymbol(symbol);
    const constructorType = this.checker.getTypeOfSymbolAtLocation(
      symbol,
      symbol.valueDeclaration!
    );
    return {
      ...details,
      ...constructorType.getCallSignatures().map(this.serializeSignature)[0]
    };
  }
}

new Parser(new PatternCompilerHost());
