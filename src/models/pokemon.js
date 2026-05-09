/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const validTypes = [
  'Plante',
  'Poison',
  'Feu',
  'Eau',
  'Insecte',
  'Vol',
  'Normal',
  'Electrik',
  'Fée'
]

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: `le nom est déjà pris`
      },
      validate: {
        notEmpty: { msg: `le nom ne dait pas etre vide` },
        notNull: { msg: `lenom est une propriété requise` }
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: `utilisez uniquement des nombres pour les points de vie` },
        notNull: { msg: `les points de vie sont une propriété requise` },
        min: {
          args: [0],
          msg: `les points de vie doit être supérieur à 0`
        },
        max: {
          args: [999],
          msg: `les points de vie doivent être inférieur ou égale à 999`
        }
      }
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: `utilisez uniquement des nombres pour les pointde dégats` },
        notNull: { msg: `les point de dégats est une propriété requise` },
        min: {
          args: [0],
          msg: `les point de dégats doit être supérieur à 0`
        },
        max: {
          args: [99],
          msg: `le spoint de dégats doivent être inférieur ou égale à 99`
        }
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: { msg: `l'url de l'image doit etre valide` },
        notNull: { msg: `l'image est une propriété requise` }
      }
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('types').split(',')
      },
      set(types) {
        this.setDataValue('types', types.join())
      },
      validate:{
        isTypeValide(value){
          if(!value){
            throw new Error(`un pokemon doit au moin avoir un type`)
          }
          if(value.split(',').lenght > 3){
            throw new Error(`Pokemon ne peux pas avoir plus de trois types.`)
          }
          value.split(',').forEach(type => {
            if (!validTypes.includes(type)){
              throw new Error(`le type du pokemon doit appartenir à la liste suivante : ${validTypes}`)
            }
          })
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}