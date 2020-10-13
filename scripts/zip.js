const fs = require('fs');
const archiver = require('archiver');

const pluginName = 'passwordless-wp';

try {
  fs.unlinkSync(`./${pluginName}.zip`);
} catch (r) {}

// create a file to stream archive data to.
const output = fs.createWriteStream(`./${pluginName}.zip`);
const archive = archiver('zip', {
  zlib: { level: 9 },
});

output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

output.on('end', function() {
  console.log('Data has been drained');
});
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    // log warning
  } else {
    // throw error
    throw err;
  }
});
archive.on('error', function(err) {
  throw err;
});
archive.pipe(output);

[
  'classes',
  'build',
  'includes',
  'languages',
  'vendor',
  'index.php',
  'passwordless-wp.php',
  'assets',
  // 'client',
  // 'package.json',
  // 'composer.json',
  'readme.md',
].forEach((path) => {
  const p = fs.statSync(path);
  if (p.isFile()) {
    archive.file(path, { name: pluginName + '/' + path });
  } else if (p.isDirectory()) {
    archive.directory(path, pluginName + '/' + path);
  }
});

archive.finalize();
