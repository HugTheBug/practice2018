let userName = 'Author 1';

let photoPosts = [
    {
        id : "0",
        description : "description for id 0",
        createdAt : new Date("2018-02-23T23:00:00"),
        author : "Author 0",
        photoLink : "http://via.placeholder.com/150x150",
        likes : ["Author 0", "Author 1", "Author 2"],
        hashTags : ["one", "three"],
    },
    {
        id : "1",
        description : "description for id 1",
        createdAt : new Date("2018-02-23T23:00:00"),
        author : "Author 1",
        photoLink : "http://via.placeholder.com/250x250",
        likes : ["Author 1", "Author 2", "Author 3"],
        hashTags : ["two", "four"],
    },
    {
        id : "2",
        description : "description for id 2",
        createdAt : new Date("2018-02-23T23:00:00"),
        author : "Author 2",
        photoLink : "http://via.placeholder.com/350x350",
        likes : ["Author 2", "Author 3", "Author 0"],
        hashTags : ["three", "five"],
    },
    {
        id : "3",
        description : "description for id 3",
        createdAt : new Date("2018-02-23T23:00:00"),
        author : "Author 3",
        photoLink : "http://via.placeholder.com/450x450",
        likes : ["Author 3", "Author 0", "Author 1"],
        hashTags : ["four", "one"],
    },
    {
        id : "4",
        description : "description for id 4",
        createdAt : new Date("2018-02-23T23:00:00"),
        author : "Author 0",
        photoLink : "http://via.placeholder.com/550x550",
        likes : ["Author 4", "Author 1", "Author 2"],
        hashTags : ["five", "two"],
    },
    {
        id : "5",
        description : "description for id 5",
        createdAt : new Date("2018-02-23T23:00:00"),
        author : "Author 1",
        photoLink : "http://via.placeholder.com/650x650",
        likes : ["Author 5", "Author 2", "Author 3"],
        hashTags : ["one", "three"],
    },
    {
        id : "6",
        description : "description for id 6",
        createdAt : new Date("2018-02-23T23:00:00"),
        author : "Author 2",
        photoLink : "http://via.placeholder.com/750x750",
        likes : ["Author 6", "Author 3", "Author 0"],
        hashTags : ["two", "four"],
    },
    {
        id : "7",
        description : "description for id 7",
        createdAt : new Date("2018-02-23T23:00:00"),
        author : "Author 3",
        photoLink : "http://via.placeholder.com/850x850",
        likes : ["Author 7", "Author 0", "Author 1"],
        hashTags : ["three", "five"],
    },
    {
        id : "8",
        description : "description for id 8",
        createdAt : new Date("2018-02-23T23:00:00"),
        author : "Author 0",
        photoLink : "http://via.placeholder.com/950x950",
        likes : ["Author 8", "Author 1", "Author 2"],
        hashTags : ["four", "one"],
    },
    {
        id : "9",
        description : "description for id 9",
        createdAt : new Date("2018-02-23T23:00:00"),
        author : "Author 1",
        photoLink : "http://via.placeholder.com/1050x1050",
        likes : ["Author 9", "Author 2", "Author 3"],
        hashTags : ["five", "two"],
    },
    {
        id : "10",
        description : "description for id 10",
        createdAt : new Date("2018-02-23T23:00:00"),
        author : "Author 2",
        photoLink : "http://via.placeholder.com/150x150",
        likes : ["Author 10", "Author 3", "Author 0"],
        hashTags : ["one", "three"],
    },
    {
        id : "11",
        description : "description for id 11",
        createdAt : new Date("2018-02-23T23:00:00"),
        author : "Author 3",
        photoLink : "http://via.placeholder.com/250x250",
        likes : ["Author 11", "Author 0", "Author 1"],
        hashTags : ["two", "four"],
    },
    {
        id : "12",
        description : "description for id 12",
        createdAt : new Date("2018-02-23T23:00:00"),
        author : "Author 0",
        photoLink : "http://via.placeholder.com/350x350",
        likes : ["Author 12", "Author 1", "Author 2"],
        hashTags : ["three", "five"],
    },
    {
        id : "13",
        description : "description for id 13",
        createdAt : new Date("2018-02-23T23:00:00"),
        author : "Author 1",
        photoLink : "http://via.placeholder.com/450x450",
        likes : ["Author 13", "Author 2", "Author 3"],
        hashTags : ["four", "one"],
    },
    {
        id : "14",
        description : "description for id 14",
        createdAt : new Date("2018-02-23T23:00:00"),
        author : "Author 2",
        photoLink : "http://via.placeholder.com/550x550",
        likes : ["Author 14", "Author 3", "Author 0"],
        hashTags : ["five", "two"],
    },
    {
        id : "15",
        description : "description for id 15",
        createdAt : new Date("2018-02-23T23:00:00"),
        author : "Author 3",
        photoLink : "http://via.placeholder.com/650x650",
        likes : ["Author 15", "Author 0", "Author 1"],
        hashTags : ["one", "three"],
    },
    {
        id : "16",
        description : "description for id 16",
        createdAt : new Date("2018-02-23T23:00:00"),
        author : "Author 0",
        photoLink : "http://via.placeholder.com/750x750",
        likes : ["Author 16", "Author 1", "Author 2"],
        hashTags : ["two", "four"],
    },
    {
        id : "17",
        description : "description for id 17",
        createdAt : new Date("2018-02-23T23:00:00"),
        author : "Author 1",
        photoLink : "http://via.placeholder.com/850x850",
        likes : ["Author 17", "Author 2", "Author 3"],
        hashTags : ["three", "five"],
    },
    {
        id : "18",
        description : "description for id 18",
        createdAt : new Date("2018-02-23T23:00:00"),
        author : "Author 2",
        photoLink : "http://via.placeholder.com/950x950",
        likes : ["Author 18", "Author 3", "Author 0"],
        hashTags : ["four", "one"],
    },
    {
        id : "19",
        description : "description for id 19",
        createdAt : new Date("2018-02-23T23:00:00"),
        author : "Author 3",
        photoLink : "http://via.placeholder.com/1050x1050",
        likes : ["Author 19", "Author 0", "Author 1"],
        hashTags : ["five", "two"],
    },
];

let dataModule = (function (photoPosts) {
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

        let posts = photoPosts;
        if (filterConfig) {
            posts = posts.filter(obj => {
                if ((filterConfig.author && obj.author !== filterConfig.author) ||
                    (filterConfig.date && obj.createdAt.getTime() !== filterConfig.date.getTime())) {
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

        return posts.slice(skip, skip + top);
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
    console.log(dataModule.getPhotoPosts(0, 1));
    console.log('get second post');
    console.log(dataModule.getPhotoPosts(1, 1));
    console.log('get all posts of "Author 1"');
    console.log(dataModule.getPhotoPosts(0, photoPosts.length, {author: 'Author 1'}));
    console.log('get first three posts with date ' + new Date('2018-02-23T23:00:00'));
    console.log(dataModule.getPhotoPosts(0, 3, {date: new Date('2018-02-23T23:00:00')}));
    console.log('get first five posts with tag "two"');
    console.log(dataModule.getPhotoPosts(0, 5, {tags: ['two']}));

    console.log('\n    getPhotoPosts');
    console.log('get first post');
    console.log(dataModule.getPhotoPost(photoPosts[0].id));
    console.log('get nonexistent post');
    console.log(dataModule.getPhotoPost('invalid id'));

    console.log('\n    validatePhotoPost');
    let post = Object.assign({}, photoPosts[0]);
    console.log('validate valid post');
    console.log(dataModule.validatePhotoPost(post));
    post.id = 123;
    console.log('validate post with invalid id');
    console.log(dataModule.validatePhotoPost(post));
    post.id = '1';
    post.description = 123;
    console.log('validate post with invalid description');
    console.log(dataModule.validatePhotoPost(post));
    post.description = 'desc';
    post.author = '';
    console.log('validate post with empty author');
    console.log(dataModule.validatePhotoPost(post));
    post.author = 'auth';
    post.createdAt = 'today';
    console.log('validate post with invalid creation date');
    console.log(dataModule.validatePhotoPost(post));
    post.createdAt = new Date;
    post.photoLink = '';
    console.log('validate post with invalid photo link');
    console.log(dataModule.validatePhotoPost(post));

    console.log('\n    addPhotoPost');
    let newPost = Object.assign({}, photoPosts[0]);
    newPost.id = '-1';
    console.log('add valid post');
    console.log(dataModule.addPhotoPost(newPost));
    console.log('check that the post was added');
    console.log(dataModule.getPhotoPost(newPost.id) === newPost);
    delete newPost.author;
    console.log('add invalid post');
    console.log(dataModule.addPhotoPost(newPost));

    console.log('\n    editPhotoPost');
    let newDesc = photoPosts[0].description + "!";
    console.log('edit first post\'s description');
    console.log(dataModule.editPhotoPost(photoPosts[0].id, {description: newDesc}));
    console.log('check that the description was edited');
    console.log(photoPosts[0].description === newDesc);
    console.log('edit nonexistent post');
    console.log(dataModule.editPhotoPost('invalid id', {description: 'new description'}));
    console.log('edit post to make it invalid');
    console.log(dataModule.editPhotoPost(photoPosts[0].id, {description: undefined}));

    console.log('\n    removePhotoPost');
    let id = photoPosts[0].id;
    console.log('remove first post');
    console.log(dataModule.removePhotoPost(id));
    console.log('get removed post');
    console.log(dataModule.getPhotoPost(id));
    console.log('remove nonexistent post');
    console.log(dataModule.removePhotoPost('invalid id'));

}

runTests();


let domModule = (function() {
    let self = {};

    self.displayPosts = function (posts) {
        document.getElementById('posts-container').innerHTML='';
        for (let i = posts.length - 1; i >= 0; i--) {
            self.displayPost(posts[i]);
        }
    };

    self.displayPost = function (post) {
        let container = document.getElementById('posts-container');
        container.insertBefore(self.getPostHTML(post), container.firstElementChild);
    };

    self.getPostHTML = function getPostHTML(post) {
        const div = document.createElement('div');
        div.id = `post-${post.id}`;
        div.className = 'image-post';
        div.innerHTML = `
            <div>
                <div class="post-name">${post.author}</div>
                <div class="post-date">${post.createdAt.toLocaleDateString()}</div>
            </div>
            <img width="100%" src="${post.photoLink}"/>
            <div>
                <div class="dropdown">
                    ${userName == post.author ? `
                    <i class="material-icons btn-like">more_vert</i>
                    <div class="dropdown-content">
                        <a href="#"><i class="material-icons">edit</i>Edit</a>
                        <a href="#"><i class="material-icons">close</i>Delete</a>
                    </div>` : ''}
                </div>
                <i class="material-icons btn-like" ${post.likes.includes(userName) ? `style="color:yellow">star` : `>star_border`}</i>
                <div class="star-counter">${post.likes.length}</div>
            </div>
            <div class="desc">${post.description}</div>
            <div class="tags">${post.hashTags.map(p => '#' + p).join(' ')}</div>
        `;
        return div;
    };

    self.editPhotoPost = function(id, post) {
        const postElem = document.getElementById(`post-${id}`);
        if (postElem) {
            document.getElementById('posts-container').replaceChild(self.getPostHTML(post), postElem);
        }
    };

    self.removePhotoPost = function(id) {
        const childNode = document.getElementById(`post-${id}`);
        if (childNode) {
            document.getElementById('posts-container').removeChild(childNode);
        }
    };

    self.displayHeader = function () {
        let ul = document.getElementById('header').firstElementChild;
        ul.innerHTML = `<li><a class="company-name" href="#">PhotoShare</a></li>
        ${userName ? `<li class="right"><a href="#" class="btn">Sign out</a></li>
            <li class="right"><a href="#" id="add-post-btn" class="btn">Add New Photo</a></li>
            <li class="right"><a href="#" id="user-name">${userName}</a></li>` :
            `<li class="right"><a href="#" class="btn">Sign in</a></li>`}`;
    };

    return self;
})();

function displayAllPosts() {
    domModule.displayPosts(dataModule.getPhotoPosts(0, 100));
}

function addPost(post) {
    if (dataModule.addPhotoPost(post)) {
        domModule.displayPost(post);
    }
}

function removePhotoPost(id) {
    if (dataModule.removePhotoPost(id)) {
        domModule.removePhotoPost(id);
        return true;
    }
    return false;
}

function editPhotoPost(id, post) {
    if (dataModule.editPhotoPost(id, post)) {
        domModule.editPhotoPost(id, dataModule.getPhotoPost(id));
    }
}

function displayHeader() {
    domModule.displayHeader();
}

displayHeader();
displayAllPosts();