module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profile: {
            type: DataTypes.STRING,
            allowNull: true
        },
        profilePic: {
            type: DataTypes.STRING,
            allowNull: true
        },
        friends: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true
        },
        liked: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true
        }
    })
}