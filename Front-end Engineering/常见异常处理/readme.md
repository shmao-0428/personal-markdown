# 1. npm WARN Local package.json exists, but node_modules missing, did you mean to install?

- npm install

#  2. npm 报错This is probably not a problem with npm. There is likely additional logging output above.

可能是版本的问题

- 重新 npm install
- 然后 npm i -D webpack-dev-server@3.0.0
- 再 npm run dev

重新安装一次，如果还是不可以的话，在把之前装的都清空

- rm -rf node_modules
- rm package-lock.json
- npm cache clear --force
- npm install