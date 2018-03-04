/**
 * Generates random integer from [min; max)
 * @param {number} min min value inclusive
 * @param {number} max max value exclusive
 * @returns {number} random integer
 */
function randomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}

let tags = ['one', 'two', 'three', 'four', 'five'];

/**
 * Generates specified number of photo posts
 * @param {number} number number of posts to be generated
 * @returns {Array} generated posts
 */
function generatePosts(number) {
    let posts = [];
    for (let id = 0; id < number; id++) {
        let post = {};
        post.id = id.toString();
        post.description = 'description for id ' + id;
        post.createdAt = new Date('2018-02-23T23:00:00');
        post.author = 'Author ' + id;
        post.photoLink = 'http://websitename.com/photoPosts/' + id + '.jpg';
        let likes = [];
        for (let j = 0; j < 3; j++) {
            likes.push('Author ' + randomInt(0, number));
        }
        post.likes = likes;
        post.hashTags = [tags[id % tags.length], tags[(id+2) % tags.length]];

        posts.push(post);
    }

    return posts;
}

let photoPosts = generatePosts(20);

let postsModule = (function (photoPosts) {
    let self = {};

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
        if (typeof skip !== 'number' || typeof top !== 'number' || typeof filterConfig !== 'object') {
            return [];
        }

        let posts = [];
        if (filterConfig) {
            posts = photoPosts.filter(obj => {
                if ((filterConfig.author && obj.author !== filterConfig.author) ||
                    (filterConfig.date && obj.createdAt.getTime() !== filterConfig.date.getTime())) {
                    return false;
                }

                if (filterConfig.tags) {
                    if (filterConfig.tags.every(tag => obj.hashTags.includes(tag)));
                }
                return true;
            });
        }

        top = Math.min(skip + top, photoPosts.length);
        return posts.slice(skip, top);
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
        return photoPosts.find(obj => obj.id === id);
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
        if (self.validatePhotoPost(photoPost)) {
            photoPosts.push(photoPost);
            return true;
        } else {
            return false;
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
        let post = self.getPhotoPost(id);
        if (post === undefined) {
            return false;
        }
        delete photoPost.id;
        delete photoPost.author;
        delete photoPost.createdAt;
        let newPost = Object.assign({}, post);
        newPost = Object.assign(newPost, photoPost);

        if (!self.validatePhotoPost(newPost)) {
            return false;
        }
        Object.assign(post, newPost);
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
        let index = photoPosts.findIndex(obj => obj.id === id);
        if (index === -1) {
            return false;
        }
        photoPosts.splice(index, 1);
        return true;
    };


    return self;

})(photoPosts);

function runTests() {
    console.log('\n    getPhotoPosts');
    console.log('get first post');
    console.log(postsModule.getPhotoPosts(0, 1));
    console.log('get second post');
    console.log(postsModule.getPhotoPosts(1, 1));
    console.log('get all posts of "Author 1"');
    console.log(postsModule.getPhotoPosts(0, photoPosts.length, {author: 'Author 1'}));
    console.log('get first three posts with date ' + new Date('2018-02-23T23:00:00'));
    console.log(postsModule.getPhotoPosts(0, 3, {date: new Date('2018-02-23T23:00:00')}));
    console.log('get first five posts with tag "two"');
    console.log(postsModule.getPhotoPosts(0, 5, {tags: ['two']}));

    console.log('\n    getPhotoPosts');
    console.log('get first post');
    console.log(postsModule.getPhotoPost(photoPosts[0].id));
    console.log('get nonexistent post');
    console.log(postsModule.getPhotoPost('invalid id'));

    console.log('\n    validatePhotoPost');
    let post = Object.assign({}, photoPosts[0]);
    console.log('validate valid post');
    console.log(postsModule.validatePhotoPost(post));
    post.id = 123;
    console.log('validate post with invalid id');
    console.log(postsModule.validatePhotoPost(post));
    post.id = '1';
    post.description = 123;
    console.log('validate post with invalid description');
    console.log(postsModule.validatePhotoPost(post));
    post.description = 'desc';
    post.author = '';
    console.log('validate post with empty author');
    console.log(postsModule.validatePhotoPost(post));
    post.author = 'auth';
    post.createdAt = 'today';
    console.log('validate post with invalid creation date');
    console.log(postsModule.validatePhotoPost(post));
    post.createdAt = new Date;
    post.photoLink = '';
    console.log('validate post with invalid photo link');
    console.log(postsModule.validatePhotoPost(post));

    console.log('\n    addPhotoPost');
    let newPost = Object.assign({}, photoPosts[0]);
    newPost.id = '-1';
    console.log('add valid post');
    console.log(postsModule.addPhotoPost(newPost));
    console.log('check that the post was added');
    console.log(postsModule.getPhotoPost(newPost.id) === newPost);
    delete newPost.author;
    console.log('add invalid post');
    console.log(postsModule.addPhotoPost(newPost));

    console.log('\n    editPhotoPost');
    let newDesc = photoPosts[0].description + "!";
    console.log('edit first post\'s description');
    console.log(postsModule.editPhotoPost(photoPosts[0].id, {description: newDesc}));
    console.log('check that the description was edited');
    console.log(photoPosts[0].description === newDesc);
    console.log('edit nonexistent post');
    console.log(postsModule.editPhotoPost('invalid id', {description: 'new description'}));
    console.log('edit post to make it invalid');
    console.log(postsModule.editPhotoPost(photoPosts[0].id, {description: undefined}));

    console.log('\n    removePhotoPost');
    let id = photoPosts[0].id;
    console.log('remove first post');
    console.log(postsModule.removePhotoPost(id));
    console.log('get removed post');
    console.log(postsModule.getPhotoPost(id));
    console.log('remove nonexistent post');
    console.log(postsModule.removePhotoPost('invalid id'));

}

runTests();
