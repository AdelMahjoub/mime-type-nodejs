const fs = require('fs');

const MIME_EXT = JSON.parse(fs.readFileSync('./mime-to-ext.json', 'utf8'));  

const filterOctetStream = function(chunk) {
  const types = {
   "bin": "SP01",
   "dmg": "x.s.bb`",
  }
  let extensions = [];
  Object.keys(types).forEach(ext => {
    let isoSign = types[ext];
    if(chunk.toString('latin1').includes(isoSign)) {
      extensions.push(ext);
    }
  });
  return extensions;
}

module.exports = function(req, chunk) {

  if(!Buffer.isBuffer(chunk) || (typeof req !== 'object') || !req.headers['content-type']) {
    return null;
  }

  let byteLength = req.headers['content-length'];
  let contentType = req.headers['content-type'];
  let metaData = chunk.toString('utf8');

  if(!contentType.includes('multipart/form-data')) {
    return null;
  }
  
  let mime = metaData.split('\r').slice(0, 3)[2].split(':')[1].replace(' ', '');

  let ext = [];

  if(MIME_EXT[mime] && mime !== 'application/octet-stream') {
    Array.isArray(MIME_EXT[mime]) ? ext = MIME_EXT[mime] : ext.push(MIME_EXT[mime]); 
  } else {
    ext = filterOctetStream(chunk);
  }

  return {mime, ext, byteLength};
}