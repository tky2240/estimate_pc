//https://qiita.com/IgnorantCoder/items/82d78f3369522f58511b
const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                loader: 'ts-loader',
                test: /\.tsx?$/,
                exclude: [
                    /node_modules/
                ],
                options: {
                    configFile: 'tsconfig.client.json'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: { "stream": require.resolve("stream-browserify") }
    },
    output: {
        filename: 'static/js/client.js',
        path: path.resolve(__dirname, 'dist/public')
    }
};