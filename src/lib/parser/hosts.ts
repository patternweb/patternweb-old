import * as ts from "typescript";

export class PatternLanguageServiceHost implements ts.LanguageServiceHost {
  files: {
    [fileName: string]: {
      file: ts.IScriptSnapshot;
      ver: number;
    };
  } = {};

  log = _ => {};
  trace = _ => {};
  error = _ => {};

  getCompilationSettings = ts.getDefaultCompilerOptions;

  getCurrentDirectory = () => "";
  getDefaultLibFileName = _ => "lib";

  getScriptVersion = fileName => this.files[fileName].ver.toString();
  getScriptSnapshot = fileName => {
    console.log(this.files, { fileName });
    return this.files[fileName].file;
  };

  getScriptFileNames(): string[] {
    const names: string[] = [];
    for (const name in this.files) {
      if (this.files.hasOwnProperty(name)) {
        names.push(name);
      }
    }
    return names;
  }

  fileExists(path: string): boolean {
    return !!this.files[path];
  }

  readFile(fileName: string): string {
    return this.files[fileName].file.toString();
  }

  addFile(fileName: string, body: string) {
    // console.log("ADD", fileName)
    const snap = ts.ScriptSnapshot.fromString(body);
    snap.getChangeRange = _ => undefined;
    const existing = this.files[fileName];
    if (existing) {
      this.files[fileName].ver++;
      this.files[fileName].file = snap;
    } else {
      this.files[fileName] = { ver: 1, file: snap };
    }
  }

  // getCompilationSettings(): CompilerOptions;
  // getNewLine?(): string;
  // getProjectVersion?(): string;
  // getScriptFileNames(): string[];
  // getScriptKind?(fileName: string): ScriptKind;
  // getScriptVersion(fileName: string): string;
  // getScriptSnapshot(fileName: string): IScriptSnapshot | undefined;
  // getLocalizedDiagnosticMessages?(): any;
  // getCancellationToken?(): HostCancellationToken;
  // getCurrentDirectory(): string;
  // getDefaultLibFileName(options: CompilerOptions): string;
  // log?(s: string): void;
  // trace?(s: string): void;
  // error?(s: string): void;
  // useCaseSensitiveFileNames?(): boolean;
  // readDirectory?(path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>, depth?: number): string[];
  // readFile?(path: string, encoding?: string): string | undefined;
  // fileExists?(path: string): boolean;
  // getTypeRootsVersion?(): number;
  // resolveModuleNames?(moduleNames: string[], containingFile: string, reusedNames?: string[]): ResolvedModule[];
  // resolveTypeReferenceDirectives?(typeDirectiveNames: string[], containingFile: string): ResolvedTypeReferenceDirective[];
  // getDirectories?(directoryName: string): string[];
  // /**
  //  * Gets a set of custom transformers to use during emit.
  //  */
  // getCustomTransformers?(): CustomTransformers | undefined;
  // isKnownTypesPackageName?(name: string): boolean;
  // installPackage?(options: InstallPackageOptions): Promise<ApplyCodeActionCommandResult>;
}

export class PatternCompilerHost extends PatternLanguageServiceHost
  implements ts.CompilerHost {
  getSourceFile(
    fileName: string,
    languageVersion: ts.ScriptTarget,
    onError?: (message: string) => void,
    shouldCreateNewSourceFile?: boolean
  ): ts.SourceFile | undefined {
    const f = this.files[fileName];
    if (!f) return undefined;
    const sourceFile = ts.createLanguageServiceSourceFile(
      fileName,
      f.file,
      ts.ScriptTarget.ES5,
      f.ver.toString(),
      true
    );
    return sourceFile;
  }
  writeFile(
    fileName: string,
    data: string,
    writeByteOrderMark: boolean,
    onError: ((message: string) => void) | undefined,
    sourceFiles: ReadonlyArray<ts.SourceFile>
  ): void {}
  getCanonicalFileName = (fileName: string) => fileName;
  useCaseSensitiveFileNames = () => true;
  getDirectories = (path: string): string[] => [];
  getNewLine = () => "\n";

  // getSourceFile(fileName: string, languageVersion: ScriptTarget, onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean): SourceFile | undefined;
  // getSourceFileByPath?(fileName: string, path: Path, languageVersion: ScriptTarget, onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean): SourceFile | undefined;
  // getCancellationToken?(): CancellationToken;
  // getDefaultLibFileName(options: CompilerOptions): string;
  // getDefaultLibLocation?(): string;
  // writeFile: WriteFileCallback;
  // getCurrentDirectory(): string;
  // getDirectories(path: string): string[];
  // getCanonicalFileName(fileName: string): string;
  // useCaseSensitiveFileNames(): boolean;
  // getNewLine(): string;
  // resolveModuleNames?(moduleNames: string[], containingFile: string, reusedNames?: string[]): ResolvedModule[];
  // /**
  //  * This method is a companion for 'resolveModuleNames' and is used to resolve 'types' references to actual type declaration files
  //  */
  // resolveTypeReferenceDirectives?(typeReferenceDirectiveNames: string[], containingFile: string): ResolvedTypeReferenceDirective[];
  // getEnvironmentVariable?(name: string): string;
}
