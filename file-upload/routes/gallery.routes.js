const express = require('express')
const router = express.Router()

const Picture = require('./../models/picture.model')

const localUpload = require('./../configs/local-upload.config')
const cdnUpload = require('./../configs/cloudinary-upload.config')



// Local upload
router.get('/subida-local', (req, res) => res.render('gallery/local-upload'))
router.post('/subida-local', localUpload.single('imageFile'), (req, res, next) => {

    console.log('Este es el objeto que crea multer:', req.file)

    const { imageName } = req.body
    const { filename, originalname } = req.file

    Picture
        .create({ name: imageName, path: `/uploads/${filename}`, originalName: originalname })
        .then(() => res.redirect('/galeria'))
        .catch(err => next(new Error(err)))
})


// Gallery
router.get('/', (req, res) => {

    Picture
        .find()
        .then(pictures => res.render('gallery/gallery-index', { pictures }))
        .catch(err => next(new Error(err)))
})


// CDN Upload
router.get('/subida-cdn', (req, res) => res.render('gallery/cdn-upload'))
router.post('/subida-cdn', cdnUpload.single('imageFile'), (req, res) => {

    const { imageName } = req.body
    const { path, originalname } = req.file

    Picture
        .create({ name: imageName, path, originalName: originalname })
        .then(() => res.redirect('/galeria'))
        .catch(err => next(new Error(err)))
})


module.exports = router
