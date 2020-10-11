const fs = require('fs');

fs.readFile('./words.txt', 'utf-8', (err, data) => {
  if (err) return console.log(err);
  console.log(typeof data);
  const array = data.split(',').sort();
  const content = array.join(' ');
  console.log(content);
  fs.writeFile('./readme.md', content, (err) => {
    console.log(err);
  });
});
