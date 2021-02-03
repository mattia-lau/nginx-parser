import { WatchFile } from "../src";

new WatchFile({
  filePath: "example/access_log.txt",
  onFileChange: (result) => {
    console.log(result);
  },
});
