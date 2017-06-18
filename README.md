 `$ npm install --save @mime-type`

### Description

Read on the browser request stream and returns the mime-type of an uploaded file.

### Usage Example

**html form**
```
<form 
    action="/upload" <!-- route -->
    enctype="multipart/form-data"
    method="POST">
    <input type="file" name="fileUploaded">
    <button type="submit">Upload</button>
 </form>
```

**nodejs server**
```
const http     = require('http');
const mimeType = require('@mime-type');

http.createServer((req, res) => {

  if(req.url === '/upload') {

    req.once('data', (chunk) => {

      console.log(mimeType(req, chunk));

    });
    .
    .
    .
  }
  .
  .
  .

}).listen(3000)
```