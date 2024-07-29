const PRODUCT = require('./controllers/product')
const  USER = require('./controllers/user')
const  VENDOR = require('./controllers/vendor')
const   AUTH  = require('./controllers/auth')

module.exports = function(app){
    app.use('/products',PRODUCT)
    app.use('/users',USER)
    app.use('/vendors',VENDOR)
    app.use('/auth',AUTH)
}    