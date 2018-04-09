let express = require('express');
let userModule = require('../models/user.js');
let router = express.Router();

router.route('/')
    .get(function (req, res) {
        if (userModule.getUser(req.query.name, req.query.password)) {
            res.status(200).send();
        } else {
            res.status(400).send('User not found');
        }
    });

module.exports = router;