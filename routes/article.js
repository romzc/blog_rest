const express = require('express');
const multer = require('multer');
const ArticleController = require('../controlers/article.js')


const router = express.Router();


const storageFiles = multer.diskStorage({
    destination: function(req, file, cb)  {
        cb(null, './imagenes/articles/')
    },
    filename: function (req, file, cb) {
        cb(null, "article"+Date.now()+file.originalname);
    }
});


const uploads = multer({storage: storageFiles});

// rutas de pruebas
router.get("/ruta1", ArticleController.test)
router.get("/curso", ArticleController.curso)

// util route
// ruta para almacenar un nuevo documento
router.post("/crear", ArticleController.create)

// ruta para consultar todos los aritculos
router.get("/articulos/:ultimos?", ArticleController.getAllArticles)
router.get("/articulo/:id", ArticleController.getArticle)
router.get("/buscar/:busqueda", ArticleController.searcher)

router.get("/imagen/:file", ArticleController.getImage)
router.delete("/articulo/:id", ArticleController.deleteArticle)
router.put("/articulo/:id", ArticleController.updateArticle)
router.post("/articulo/:id",[uploads.single("file0")],ArticleController.uploadImage)

// retornamos el router.
module.exports = {router}