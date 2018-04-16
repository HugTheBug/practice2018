let express = require('express');
let bodyParser = require('body-parser');
let postModule = require('../models/post.js');
let router = express.Router();
const fs = require('fs');

const host = 'localhost:3000';

router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

let multer  = require('multer');

let storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/images");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

let upload = multer({
    storage: storage
});

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
    .put(upload.single('photo'), function (req, res) {
        if (req.file) {
            req.body.photoLink = req.protocol + "://" + host + '/' + req.file.path;
        }
        req.body.hashTags = req.body.hashTags.match(/#\w+/g);

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
    .post(upload.single('photo'), function (req, res) {
        req.body.photoLink = req.protocol + "://" + host + '/' + req.file.path;
        req.body.likes = [];
        req.body.hashTags = req.body.hashTags.match(/#\w+/g);

        let id = postModule.addPhotoPost(req.body);
        if (id) {
            res.status(200).send(id);
        } else {
            fs.unlink(req.file.path);
            res.status(400).send('Cannot add post');
        }
    });

module.exports = router;