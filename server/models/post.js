let post = (function () {
    const fs = require('fs');
    const path = require('path');
    const dataPath = path.join(__dirname, '../data', 'posts.json');

    let self = {};

    function readPosts() {
        let posts = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        posts.forEach((value, index, ar) => ar[index].createdAt = new Date(value.createdAt));
        return posts;
    }

    function writePosts(posts) {
        fs.writeFileSync(dataPath, JSON.stringify(posts), 'utf-8');
    }

    let lastId = (function () {
        let posts = readPosts();
        if (posts.length === 0) {
            return 0;
        } else {
            return posts[posts.length - 1].id + 1;
        }
    })();

        /**
     * Get array of posts sorted by creation date.
     * @param {number} skip=0 number of posts to skip
     * @param {number} top=10 number of posts to get
     * @param {Object} filterConfig={} filters
     * @param {string} [filterConfig.author] author's name
     * @param {Date} [filterConfig.date] creation date
     * @param {Array} [filterConfig.tags] hash tags
     * @returns {Object[]} posts
     */
    self.getPhotoPosts = function(skip = 0, top = 10, filterConfig = null) {
        if (filterConfig)
            filterConfig = JSON.parse(filterConfig);
        if (typeof skip !== 'number' || typeof top !== 'number' || typeof filterConfig !== 'object') {
            return [];
        }

        let posts = readPosts();
        if (filterConfig) {
            if (filterConfig.date) {
                filterConfig.date = new Date(filterConfig.date);
            }
    
            posts = posts.filter(obj => {
                if ((filterConfig.author && obj.author !== filterConfig.author) ||
                    (filterConfig.date && (
                        obj.createdAt.getFullYear() !== filterConfig.date.getFullYear() ||
                        obj.createdAt.getMonth() !== filterConfig.date.getMonth() ||
                        obj.createdAt.getDate() !== filterConfig.date.getDate()))) {
                    return false;
                }

                if (filterConfig.tags) {
                    if (!filterConfig.tags.every(tag => obj.hashTags.includes(tag))) {
                        return false;
                    }
                }
                return true;
            });
        }
        return posts.sort((a, b) => b.createdAt - a.createdAt).slice(skip, skip + top);
    };

    /**
     * Get post with specified id
     * @param {string} id id of the post
     * @returns {*} post
     */
    self.getPhotoPost = function (id) {
        if (!id || typeof id !== 'string') {
            return undefined;
        }
        return readPosts().find(obj => obj.id === id);
    };

    /**
     * Validates post
     * @param {Object} photoPost post
     * @param {string} photoPost.id unique required property
     * @param {string} photoPost.description length < 200, required property
     * @param {Date} photoPost.createdAt required property
     * @param {string} photoPost.author nonempty required property
     * @param {string} photoPost.photoLink nonempty required property
     * @param {Array} photoPost.likes names of users who 'like' the post
     * @param {Array} photoPost.hashTags hash tags
     * @returns {boolean} true if the post is valid otherwise false
     */
    self.validatePhotoPost = function(photoPost) {
        if (typeof photoPost.id !== 'string' ||
            typeof photoPost.description !== 'string' || photoPost.description.length >= 200 ||
            !photoPost.createdAt || !(photoPost.createdAt instanceof Date) ||
            typeof photoPost.author !== 'string' || photoPost.author.length === 0 ||
            typeof photoPost.photoLink !== 'string' || photoPost.photoLink.length === 0 ||
            !Array.isArray(photoPost.likes) || !Array.isArray(photoPost.hashTags))
        {
            return false;
        }
        return true;
    };

    /**
     * Adds new post after validation
     * @param {Object} photoPost new post
     * @returns {boolean} true if the post was added otherwise false
     */
    self.addPhotoPost = function (photoPost) {
        if (!photoPost || typeof photoPost !== 'object') {
            return false;
        }
        
        photoPost.id = '0';
        if (typeof photoPost.createdAt === 'string')
            photoPost.createdAt = new Date(photoPost.createdAt);
        if (self.validatePhotoPost(photoPost)) {
            photoPost.id = getNewId();
            let posts = readPosts();
            posts.push(photoPost);
            writePosts(posts);
            return photoPost.id;
        }
    };

    /**
     * Edits post with specified id
     * photoPost contains only properties that need to be changed
     * id, author, createdAt cannot be changed
     * @param {string} id id of the post that would be edited
     * @param {Object} photoPost contains new value for the post properties
     * @returns {boolean} true if the post was edited otherwise false
     */
    self.editPhotoPost = function(id, photoPost) {
        if (typeof id !== 'string' || !photoPost || typeof photoPost !== 'object') {
            return false;
        }
        let posts = readPosts();
        let post = posts.find(obj => obj.id === id);
        if (!post) {
            return false;
        }
        photoPost = Object.assign({}, photoPost);
        delete photoPost.id;
        delete photoPost.author;
        delete photoPost.createdAt;
        let newPost = Object.assign({}, post);
        newPost = Object.assign(newPost, photoPost);

        if (!self.validatePhotoPost(newPost)) {
            return false;
        }
        Object.assign(post, newPost);

        writePosts(posts);
        return true;
    };

    /**
     * Removes post with specified id
     * @param {string} id id of the post to be removed
     * @returns {boolean} true if the post was removed otherwise false
     */
    self.removePhotoPost = function(id) {
        if (typeof id !== 'string') {
            return false;
        }
        let posts = readPosts();
        let index = posts.findIndex(obj => obj.id === id);
        if (index === -1) {
            return false;
        }
        posts.splice(index, 1);
        writePosts(posts);
        return true;
    };

    function getNewId() {
        return String(lastId++);
    }

    return self;

})();

module.exports = post;