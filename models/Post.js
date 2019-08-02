module.exports = function (sequelize, DataTypes) {
    return sequelize.define('post', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        text: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        likes: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        likedBy: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: true
        }
    })
}