import { NginxParserOptions } from "./types";

const defaultFormat =
  '$http_client_ip $remote_addr $remote_user [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent" "$upstream_response_time" $request_time $host $upstream_status $upstream_addr $http_deviceType $http_productId $http_appVersion $http_market';

export class NginxLogParser {
  private factors: RegExpMatchArray;

  constructor(private format: string = defaultFormat) {
    this.factors = format.match(/(\")?(\$)?[a-zA-Z_-]+(\")?/g);
  }

  public parse(log: string): Record<string, string> {
    const data = {};
    var mark = false;
    let line = log.replace(/[ ]{2,}/g, "");

    const text = line
      .split("")
      .map((char: string) => {
        if (char == '"' || /[\[\]]/.test(char)) mark = !mark;

        if (mark && char == " ") {
          return "\u0000";
        }

        return char;
      })
      .join("");

    text.split(" ").map((str, i) => {
      if (!this.factors[i]) return "";

      const key = this.factors[i].replace(/[\$\"]/g, "");

      data[key] = str.replace(/\u0000/g, " ");
    });

    return data;
  }
}
