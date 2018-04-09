const path = require('path');
const express = require('express');
const app = express();
const postsRouter = require('./server/controllers/posts.js');
const usersModule = require('./server/controllers/users');

const router = express.Router();
router.route('/:params*').get((req, res) => res.sendFile(path.resolve(`public/${req.path}`)));

app.use('/users', usersModule);
app.use('/posts', postsRouter);
app.use('/', router);


app.listen(3000, () => console.log('App listening on port 3000!'));