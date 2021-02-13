import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    devServer: {
        proxy: {
            "/api": {
                target: 'http://localhost:3000',
                pathRewrite: { '^/api': '' },
            },
            "/server": {
                target: 'http://localhost:9001',
                pathRewrite: { '^/server': '' },
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'Music Pwa'
        })
    ]
}