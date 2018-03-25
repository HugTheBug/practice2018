const path = require('path');
const express = require('express');
const app = express();

const router = express.Router();
router.route('/:params*').get((req, res) => res.sendFile(path.resolve(`public/${req.path}`)));
app.use('/', router);

app.listen(3000, () => console.log('App listening on port 3000!'));