const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'germanalvarez0121@gmail.com',
        pass: 'germangerman'
    }
})