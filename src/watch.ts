import { readFileSync, watchFile } from "fs";
import { NginxLogParser } from "./parser";
import { WatcherOptions } from "./types";

export class WatchFile {
  private line = 0;
  private parser: NginxLogParser;
  private separator: string | RegExp;

  constructor(private readonly options: WatcherOptions) {
    const {
      persistent = true,
      interval = 1000,
      filePath,
      separator = "\r\n",
      format,
    } = options;
    this.parser = new NginxLogParser(format);
    this.separator = separator;
    this.readLines();
    this.stream(filePath, persistent, interval);
  }

  private readLines() {
    const logs = readFileSync(this.options.filePath, { encoding: "utf-8" });
    const lines = logs.split(this.separator);
    const result: Record<string, any>[] = [];
    for (let i = this.line; i < lines.length; i++) {
      this.options.onFileChange(this.parser.parse(lines[i]));
    }
    this.line = lines.length;
  }

  private stream(filePath: string, persistent: boolean, interval: number) {
    watchFile(filePath, { persistent, interval }, (curr, prev) => {
      this.readLines();
    });
  }
}
