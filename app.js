require("dotenv").config();
const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')
const express = require("express")
const cors = require("cors");

app.use(cors());
app.use(express.json());
const app = express()
const port = 5000

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

sequelize.initDb()

// Point de terminaison

require('./src/route/findAllPokemons')(app)
require('./src/route/findPokemonByPk')(app)
require('./src/route/createPokemon')(app)
require('./src/route/updatePokemon')(app)
require('./src/route/deletePokemon')(app)
require('./src/route/login')(app)
// Gestion des erreurs
app.use(({res}) => {
    const message = `impossible de trouver la ressource.`
    res.status(404).json({message})
})

app.get("/", (req, res) => {
  res.send("API Railway OK");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serveur lancé sur ${PORT}`);
});