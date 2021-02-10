import path from 'path';
// import { RollupOptions } from 'rollup'
import rollupTypescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';
const paths = {
    input: path.join(__dirname, '/src/index.ts'),
    output: path.join(__dirname, '/lib')
}

const production = process.env.ROLLUP_WATCH ? false : true;
const sourcemap = production ? false : true;

const rollupConfig = {
    input: paths.input,
    output: [
        {
            file: path.join(paths.output, 'index.cjs.js'),
            format: 'cjs',
            name: pkg.name,
            sourcemap
        },
        {
            file: path.join(paths.output, 'index.esm.js'),
            format: 'es',
            name: pkg.name,
            sourcemap
        },
        {
            file: path.join(paths.output, 'index.js'),
            format: 'umd',
            name: pkg.name,
            sourcemap
        },
    ],
    plugins: [
        rollupTypescript(),
        production && terser()
    ]
}
export default rollupConfig