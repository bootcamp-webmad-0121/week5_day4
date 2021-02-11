const express = require('express')
const router = express.Router()

const transporter = require('./../configs/nodemailer.config')

// Endpoints
router.get('/', (req, res) => res.render('index'))

// Contact page
router.get('/contacto', (req, res) => res.render('contact'))
router.post('/contacto', (req, res, next) => {

    const { email, name, message } = req.body

    const options = {
        from: 'Contacto web <hola@whatever.com>',
        to: email,              // aquí iría tu email
        subject: 'Nuevo contacto de ' + name + ' desde la página web 💷',
        text: message,
        html: `<b>${message}</b>`
    }

    transporter
        .sendMail(options)
        .then(details => {
            console.log('Los detalles del envío son:', details)
            res.redirect('/')
        })
        .catch(err => next(new Error(err)))
})


module.exports = router
