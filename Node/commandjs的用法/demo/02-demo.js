const program = require('commander');
program
	.version('1.0.0')
	.command('my-cli <path>')
	.option('-a, --add <fileName>', 'add a file')
	.option('-u, --update <fileName>', 'update a file')
	.option('-r, --remove <fileName>', 'remove a file')
	.action(function(path, cmd) {
		console.log(path)
        console.log(cmd.add)
        // console.log(cmd);
	})

program.parse(process.argv);
