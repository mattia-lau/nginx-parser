export interface NginxParserOptions {
  format?: string;
}

export interface WatcherOptions {
  format?: string;
  separator?: string | RegExp;
  interval?: number;
  persistent?: boolean;
  filePath: string;
  onFileChange: (result: Record<string, string>) => void;
}
