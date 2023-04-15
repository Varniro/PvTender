const path = require('path')

module.exports = {
    mode: 'development',
    entry:{
        index: './src/index.js',
        login: './src/login.js',
        userReg: './src/userReg.js',
        contReg: './src/contReg.js',
        createAuc: './src/createAuc.js',
        auction: './src/auction.js',
        conProf: './src/conProf.js',
        tender: './src/tender.js',
        pay: './src/pay.js',
        cnf: './src/cnf.js',
        contBids: './src/contBids.js',
        contractAct: './src/contractAct.js',
        browse: './src/browse.js'
    },
    output:{
        path: path.resolve(__dirname, 'dist/js'),
        filename: '[name].js'
    },
    watch: true,
    devtool: false, 
}