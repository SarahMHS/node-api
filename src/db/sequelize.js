/* L’API Rest et la Base de données : Créer un modèle Sequelize */
require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')
const bcrypt = require('bcrypt')

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQLDATABASE,
  process.env.MYSQLUSER,
  process.env.MYSQLPASSWORD,
  {
    host: process.env.MYSQLHOST,
    dialect: "mysql",
    port: process.env.MYSQLPORT
  }
);

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
    return sequelize.sync({
        alter: true
    })
        .then(_ => {//force seulement pour le developpement pour facilité les corrections sur les modèle
            pokemons.map(pokemon => {
                Pokemon.create({
                    name: pokemon.name,
                    hp: pokemon.hp,
                    cp: pokemon.cp,
                    picture: pokemon.picture,
                    types: pokemon.types,
                }).then(pokemon => console.log(pokemon.toJSON()))// vue que creat() return une promise "then" permet de voir le resultat de l'action efectuée ; toJSON affiche correctement les informations des instance de sequelize avec seulement les informations utiles
            })
            bcrypt.hash('pikachu', 10)
                .then(hash => {
                    return User.create({
                        userName: 'pikachu',
                        password: hash
                    })
                })
                .then(user => console.log(user.toJSON()))
            console.log('La base de donnée a bien été initialisée !')
        })
}


module.exports = {
    initDb, Pokemon, User
}