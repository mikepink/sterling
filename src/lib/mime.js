/*
  Helps Sterling identify Mime types.
*/

var exts = {
  '7z': 'application/x-7z-compressed',
  'css': 'text/css',
  'flv': 'video/x-flv',
  'gif': 'image/gif',
  'html': 'text/html',
  'jpg': 'image/jpeg',
  'js': 'text/javascript',
  'mp3': 'audio/mp3',
  'mp4': 'video/mp4',
  'pdf': 'application/pdf',
  'png': 'image/png',
  'rar': 'application/x-rar-compressed',
  'svg': 'image/svg+xml',
  'swf': 'application/x-shockwave-flash',
  'tar': 'application/x-tar',
  'tbz': 'application/x-bzip-compressed-tar',
  'tgz': 'application/x-compressed',
  'torrent': 'application/x-bittorrent',
  'txt': 'text/plain',
  'wav': 'audio/x-wav',
  'webm': 'video/webm',
  'zip': 'application/zip'
}

exports.get = function(file) {
  var ext = file.toLowerCase().match(/\.([a-z0-9]+)$/);

  if (ext && exts.hasOwnProperty(ext[1])) {
    return exts[ext[1]];
  } else {
    return 'application/octet-stream';
  }
}

