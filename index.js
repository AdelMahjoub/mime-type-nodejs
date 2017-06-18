module.exports = function(req, chunk) {

  if(!Buffer.isBuffer(chunk) || (typeof req !== 'object') || !req.headers['content-type']) {
    return null;
  }

  let contentType = req.headers['content-type'];
  let metaData = chunk.toString();

  if(!contentType.includes('multipart/form-data')) {
    return null;
  }
  return metaData.split('\r').slice(0, 3)[2].split(':')[1];
}