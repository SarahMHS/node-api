const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', auth, (req, res) => {
    Pokemon.findByPk(req.params.id)// findByPk est native a sequelize pour recupérer un element dans la table avec sa PRIMARY KEY
      .then(pokemon => {
        if( pokemon === null){
        const message = `le pokemon n'existe pas`
        return res.status(404).json({message})
        }
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        const message = `le pokemon n'a pas été récupéré,merci d'essayer plutard`
        res.status(500).json({message, data: error})
      })
  })
}