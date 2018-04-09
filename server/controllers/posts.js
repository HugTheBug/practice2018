let express = require('express');
let bodyParser = require('body-parser');
let postModule = require('../models/post.js');
let router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded())

router.route('/post/:postId')
    .get(function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        let post = postModule.getPhotoPost(req.params["postId"]);
        if (post) {
            res.status(200).send(post);
        } else {
            res.status(400).send('Cannot get post');
        }
    })
    .delete(function (req, res) {
        if (postModule.removePhotoPost(req.params["postId"])) {
            res.status(200).send();
        } else {
            res.status(400).send('Cannot delete post');
        }
    })
    .put(function (req, res) {
        if (postModule.editPhotoPost(req.params["postId"], req.body)) {
            res.status(200).send();
        } else {
            res.status(400).send('Cannot edit post');
        }
    });

router.route('/')
    .post(function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(postModule.getPhotoPosts(
            parseInt(req.body.skip),
            parseInt(req.body.number),
            req.body.filterConfig));
    });
router.route('/add')
    .post(function (req, res) {
        let id = postModule.addPhotoPost(req.body);
        if (id) {
            res.status(200).send(id);
        } else {
            res.status(400).send('Cannot add post');
        }
    });

module.exports = router;