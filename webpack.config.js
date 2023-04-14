const path = require('path')

module.exports = {
    mode: 'development',
    entry:{
        index: './src/index.js',
        login: './src/login.js',
        userReg: './src/userReg.js'
    },
    output:{
        path: path.resolve(__dirname, 'dist/js'),
        filename: '[name].js'
    },
    watch: true,
    devtool: false, 
}