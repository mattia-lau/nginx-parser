# Installation

```
# use yarn
yarn add nginx-logging-parser
# use npm
npm install nginx-logging-parser
```

# Description

Used to parse the log file line by line into object

# Usage

```typescript
new WatchFile({
  filePath: "example/access_log.txt",
  onFileChange: (result) => {
    console.log(result);
  },
  //
  // Optional Parameters
  // separator: '\r\n',
  // persistent: true,
  // interval: 1000,
  // format: '$http_client_ip $remote_addr $remote_user [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent" "$upstream_response_time" $request_time $host $upstream_status $upstream_addr $http_deviceType $http_productId $http_appVersion $http_market'
});

// Result
/*
{
  http_client_ip: '-',
  remote_addr: '-',
  remote_user: '-',
  time_local: '[25/Feb/2016:03:28:25 +0800]',
  request: '"GET /regions/7 HTTP/1.1"',
  status: '200',
  body_bytes_sent: '6385',
  http_referer: '"-"',
  http_user_agent: '"xxx/4.1.2 (iPhone; iOS 9.2.1; Scale/3.00)"',
  upstream_response_time: '"0.006"',
  request_time: '0.006',
  host: 'api.xxx.com',
  upstream_status: '200',
  upstream_addr: '10.0.0.38:5101'
}
*/
```
