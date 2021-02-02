var express = require('express');
var router = express.Router();

//module a ajouter
const multer = require('multer');
const path = require('path');
//


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', file: ""});
});

//gestion du stockage de notre fichier
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
 
//on indique a multer d'utiliser notre systeme de stockage
var upload = multer({ storage: storage })

//route pour gerer l'envoie en post des elements du formulaire
router.post('/upload', upload.single('myFile'), function (req, res, next) {


  //console.log(req.file)

  //console.log(req.body)

  // verifie que le fichier existe
  if( req.file){
    res.render('index', { title: "express", file: `/uploads/${req.file.filename}`})
  }
  
  
})

module.exports = router;
