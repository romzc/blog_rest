const { dataValidator } = require('../helpers/validator')
const Article = require('../models/Articles')
const fs = require('fs');
const path = require('path');

const test = (req, res) => {
    return res.status(200).json({
        mensage: "Soy una accion dt test"
    })
}

const curso = (req, res) => {
    return res.status(200).json({hello:" adasd "})
}


// Metodo que permite cear y almacenar un articulo 
// escrito por nuestros usuarios.
const create = (req, res) => {

    // Recoger los datos
    const params = req.body;
    // Validar los datos
    try {
        dataValidator(params)
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mesage: error.message
        })
    }
    // Crear el objeto basado en el modelo y asignar valores.
    const article = new Article(params);

    // la asignacion se puede hacer manualmete o automaticamente

    // Guadar el articulo en la base de datos.
    article.save(( error, savedArticle ) => {
        if ( error || !savedArticle ) {
            return res.status(400).json({
                status: "error",
                mesage: `no se guardo el article`
            })
        }

        // Devolver un mensage de la accion realizada.
        return res.status(200).json({
            status: "success",
            articulo: savedArticle,
            message: "article was saved"
        })
    })
}


// consultar el objeto para obtener la lista de articles
const getAllArticles = (req, res) => {
    let query = Article.find({});

    if( req.params.ultimos ) {
        query.limit(3);
    }

    query.sort({fecha: -1}).exec((error, articles) => {
        if( error || !articles) {
            return res.status(404).json({
                status: "error",
                mesage: `no se encontro articles`
            });
        }

        return res.status(200).json({
            status: "succedd",
            contador: articles.length,
            articles
        });
    })

}

const getArticle = (req, res) => {

    // para obtener el article, we need to get its id from the request.
    const id = req.params.id;

    // then we have to call findById function to get the article
    Article.findById(id, (error, article) => {
        // if the article is not found return error
        if( error ||!article) {
            return res.status(404).json({
                status: "error",
                mesage: `no se encontro el articulo`
            })
        }
        // otherwise return the article
        return res.status(200).json({
            status: "success",
            article
        })
    })
}


// method to remove article from database, we need to get its id from the request
const deleteArticle = (req, res) => {
    const id = req.params.id;

    Article.findByIdAndDelete(id, (error, articleDeleted) => {
        if( error || !articleDeleted) {
            return res.status(404).json({
                status: "error",
                mesage: `no se encontro el articulo`
            });
        }
        return res.status(200).json({
            status: "success",
            articleDeleted,
            mensage: "Article deleted"
        })
    });
}

const updateArticle = (req, res) => {
    // we get the id from the request params
    const idArticle = req.params.id;

    // also get information from the body of the request and also validate it
    const params = req.body;

    // data validation
    try {
        dataValidator(params)
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mesage: error.message
        })
    }

    Article.findOneAndUpdate({_id: idArticle},params,{new: true},(error, articleUpdated) => {
        if (error || !articleUpdated) {
            return res.status(500).json({
                status: "error",
                mesage: `no se actualizo el article`
            })
        }

        return res.status(200).json({
            status: "success",
            article: articleUpdated,
            message: "article was updated"
        })
    });
}


const uploadImage = (req, res) => {

    // configrar multer to upload image

    // get picture from request params
    if ( !req.file && !req.files ) {
        return res.status(404).json({
                status: "error",
                message: "invalid request"
        })
    }

    // get file name 
    const originalFileName = req.file.originalname;
    
    // set file extension
    const fileSplit = originalFileName.split("\.");
    // get file extension
    const fileExt = fileSplit[fileSplit.length - 1];

    // validate extension name
    if( fileExt !== "png" && fileExt !== "jpg" && fileExt !== "jpeg") {
        // borrar wrong file.
        fs.unlink(req.file.path, (error) => {
            return res.stats(400).json({
                status: "error",
                message: "wrong image extension"
            })
        });
    }
    else {

        const idArticle = req.params.id;

        Article.findOneAndUpdate({_id: idArticle},{imagen: req.file.filename},{new: true},(error, articleUpdated) => {
            if (error || !articleUpdated) {
                return res.status(500).json({
                    status: "error",
                    mesage: `no se actualizo el article`
                })
            }

            return res.status(200).json({
                status: "success",
                article: articleUpdated,
                message: "article was updated"
            })
        });

    }
};


const getImage = (req, res) => {
    let file = req.params.file;
    const diskRoute = "./imagenes/articles/"+file;

    fs.stat(diskRoute, (error, exists) => {
        if(exists) {
            return res.sendFile(path.resolve(diskRoute));
        }
        else {
            return res.status(404).json({
                status: "error",
                mesage: `image doesn't exist`
            })
        }
    })
}


const searcher = (req, res) => {
    // get string to be searched in database.
    const busqueda = req.params.busqueda;

    // find RE
    Article.find({"$or": [
        // query
        { "titulo": {"$regex": busqueda, "$options": "i"}},
        { "contenido": {"$regex": busqueda, "$options": "i"}}
    ]})
    // sort
    .sort({fecha: -1})
    // response answer
    .exec((error, articles) => {
        if(error ||!articles || articles.length <= 0) {
            return res.status(404).json({
                status: "error",
                mesage: `no se encontro articles con esa busqueda`
            });
        }
        return res.status(200).json({
            status: "success",
            contador: articles.length,
            articles
        });
    })
}

module.exports = {
    test,
    curso, 
    create, 
    getAllArticles, 
    getArticle, 
    deleteArticle, 
    updateArticle,
    uploadImage,
    getImage,
    searcher
}