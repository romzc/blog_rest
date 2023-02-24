const express = require('express')
const router = express.Router()
const ArticleController = require('../controlers/article.js')

// rutas de pruebas
router.get("/ruta1", ArticleController.test)
router.get("/curso", ArticleController.curso)

module.exports = {router}