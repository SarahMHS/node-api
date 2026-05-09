module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userName: {
            type: DataTypes.STRING,
            unique: {
                msg: `ce nom est déjà pris`
            }
        },
        password: {
            type: DataTypes.STRING
        }
    })
}