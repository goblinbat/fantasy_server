require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./db');

sequelize.sync();
app.use(express.json());
app.use(require('./middleware/headers'));

const auth = require('./controllers/authcontroller');
const user = require('./controllers/usercontroller');
const post = require('./controllers/postcontroller');
const comment = require('./controllers/commentcontroller'); 

app.use('/auth', auth);     // signup, login
app.use(require('./middleware/validate-session'));
app.use('/user', user);     // update, delete, get
app.use('/post', post);     // CRUD
app.use('/comment', comment);   //CRUD

app.listen(process.env.PORT, function() {
    console.log(`App is listening on ${process.env.PORT}`)
})