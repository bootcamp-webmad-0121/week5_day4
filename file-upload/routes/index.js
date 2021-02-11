module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/galeria', require('./gallery.routes.js'))
}