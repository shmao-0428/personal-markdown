// index.js
const program = require('commander');
program
	.version('1.0.0')
	.option('-a, --add <fileName>', 'add a file')
  .parse(process.argv);

console.log('add a file named: ' + program.add)
