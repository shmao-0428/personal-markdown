#!/usr/bin/env node

// console.log('cli working')

const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

inquirer
  .prompt([
    {
      type: 'input', //指定问题的输入方式
      name: 'name', //指定问题返回值的键名
      message: 'Project name?', //给用户的提示
    },
  ])
  .then((answer) => {
    // console.log(answer);
    // 模板目录
    const tmplDir = path.join(__dirname, '../temp');
    // 目标目录
    const destDir = process.cwd();
    // 将模板下的文件全部转换到目标目录
    fs.readdir(tmplDir, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        // 通过模板引擎渲染文件
        ejs.renderFile(path.join(tmplDir, file), answer, (err, result) => {
          if (err) throw err;
          // 将结果写入目标文件路径
          fs.writeFileSync(path.join(destDir, file), result);
        });
      });
    });
  });
