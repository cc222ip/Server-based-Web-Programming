var express = require('express');
var mongoose = require('mongoose');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var multer = require('multer');

var upload = multer({ // Pour les images
    dest: __dirname + '/uploads'
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/pokedex', {
    useMongoClient: true
});

require('./models/Pokemon');
require('./models/Type');

var app = express();

app.use(bodyParser.urlencoded());
app.use(upload.single('file')); // Pour les images

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // Chemin vers le fichier bootstrap css

app.use('/', require('./routes/pokemons'));
app.use('/types', require('./routes/types'));

app.use('/uploads', express.static(__dirname + '/uploads')); // Pour les images

nunjucks.configure('views', { // Moteur de templates
    autoescape: true, // Échape tous les caractères HTML des variables
    express: app
});

console.log('Pokédex lancé sur le port 3000');
app.listen(3000);