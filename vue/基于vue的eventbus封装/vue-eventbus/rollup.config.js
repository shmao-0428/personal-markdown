import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
const production = !process.env.ROLLUP_WATCH;
export default {
    input: './src/index.js',
    output: {
        format: 'esm',// 模块化类型
        file: 'dist/esm/index.js',
        // file: 'dist/umd/index.js',
        name: 'vueEventBus',// 打包后的全局变量的名字
        // sourcemap: true
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
		production && terser() // minify, but only in production
    ]
}