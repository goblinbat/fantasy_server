module.exports = function (sequelize, DataTypes) {
    return sequelize.define('comment', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        text: {
            type: DataTypes.TEXT
        }
    })
}