const program = require("commander");
program
  .version(require("./package.json").version, "-v, --version")
  .description('how to use commander')
  .command('my-cli <path>') // 自定义命令
  .option("-a, --add <fileName>", "add a file") //flag后面可以跟参数，<>定义必需参数，[]定义可选参数
  .option("-u, --update", "update Something")
  .option("-r, --remove", "remove Something")
  .option("--add-file", "add a file")
  .option("--no-add", "not add a file")
  .action(function(path, program) {
        console.log('path', path);
        console.log('program', program.add);
  })
//   .parse(process.argv); // 使用自定义command action 不能点语法
program.parse(process.argv);
console.log("You choose: ",);
if (program.add || program.a) console.log("  add a file name" , program.add);
if (program.update) console.log("  update Something");
if (program.remove) console.log("  remove Something");
if (program.addFile) console.log("add a file");
if(program.noAdd) console.log("not add a file");
