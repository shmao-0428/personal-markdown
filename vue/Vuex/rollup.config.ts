import rollupTypescript2 from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import path from 'path';

import pkg from './package.json';

const production = !process.env.ROLLUP_WATCH;
const outDir = production ? '/lib' : '/dev';

const rollupConfig = {
    input: path.join(__dirname, './src/index.ts'),
    output:
    {
        file: path.join(__dirname, outDir, 'index.js'),
        format: production ? 'umd' : 'es',
        name: pkg.name,
        sourcemap: !production
    },
    plugins: [
        rollupTypescript2(),
        production && terser()
    ]
}

export default rollupConfig