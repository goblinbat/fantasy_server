const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.DATABASE_URL, {
        dialect: 'postgres'
    }
);

const User = sequelize.import('./models/User');
const Post = sequelize.import('./models/Post');
const Comment = sequelize.import('./models/Comment');

sequelize.authenticate()
.then(() => console.log('postgres is connected'))
.catch(err => console.log(err))

Post.belongsTo(User, {onDelete: 'CASCADE'});
Comment.belongsTo(Post, {onDelete: 'CASCADE'});
Comment.belongsTo(User, {onDelete: 'CASCADE'});

module.exports = sequelize;
