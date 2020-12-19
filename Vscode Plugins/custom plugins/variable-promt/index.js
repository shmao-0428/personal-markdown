const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
/**
 * 鼠标悬停提示，当鼠标停在package.json的dependencies或者devDependencies时，
 * 自动显示对应包的名称、版本号和许可协议
 * @param {*} document
 * @param {*} position
 * @param {*} token
 */
function provideHover(document, position, token) {
  const fileName = document.fileName;
  const workDir = path.dirname(fileName);
  const word = document.getText(document.getWordRangeAtPosition(position));
  const rootPath = vscode.workspace.workspaceFolders[0].uri['_fsPath'] + '/promt.variable.json';
  if (rootPath) {
    const ctx = fs.readFileSync(rootPath, 'utf-8');
    const data = JSON.parse(ctx);
    console.log('data', data);
    return new vscode.Hover(`${word}`);
  }
}

module.exports = function (context) {
  // 注册鼠标悬停提示
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(['json', 'javascript', 'typescript', 'vue'], {
      provideHover,
    })
  );
};
