let dataModule = (function (photoPosts) {
    let self = {};

    self.photoPosts = JSON.parse(localStorage.getItem('photoPosts'));
    if (!self.photoPosts) {
        localStorage.setItem('photoPosts', []);
        self.photoPosts = [];
    } else {
        self.photoPosts.forEach(a => a.createdAt = new Date(a.createdAt));
    }

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

        let posts = self.photoPosts;
        if (filterConfig) {
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
        return self.photoPosts.find(obj => obj.id === id);
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
            self.photoPosts.push(photoPost);
            localStorage.setItem("photoPosts", JSON.stringify(self.photoPosts));
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
        localStorage.setItem("photoPosts", JSON.stringify(self.photoPosts));
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
        let index = self.photoPosts.findIndex(obj => obj.id === id);
        if (index === -1) {
            return false;
        }
        self.photoPosts.splice(index, 1);
        localStorage.setItem("photoPosts", JSON.stringify(self.photoPosts));
        return true;
    };

    self.getNewId = function () {
        if (self.photoPosts.length > 0) {
            return String(parseInt(self.photoPosts[self.photoPosts.length - 1].id) + 1);
        } else {
            return "0";
        }
    };

    return self;

})();

let domModule = (function() {
    let self = {};
    self.displayedPosts = 0;

    self.clearPosts = function() {
        self.displayedPosts = 0;
        document.getElementById('posts-container').innerHTML='';
    };

    self.displayNewPost = function (post) {
        self.displayedPosts++;
        let container = document.getElementById('posts-container');
        container.insertBefore(getPostHTML(post), container.firstElementChild);
    };

    self.displayPosts = function (posts) {
        for (let i = 0; i < posts.length; i++) {
            self.displayPost(posts[i]);
        }
    };

    self.displayPost = function (post) {
        self.displayedPosts++;
        let container = document.getElementById('posts-container');
        container.appendChild(getPostHTML(post));
    };

    function getPostHTML(post) {
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
                <i onclick="like('${post.id}')" class="material-icons btn-like ${post.likes.includes(authModule.userName) ? `color-yellow">star` : `">star_border`}</i>
                <div class="like-counter">${post.likes.length}</div>
                <div class="dropdown">
                    ${authModule.userName === post.author ? `
                    <i class="material-icons btn-like">more_vert</i>
                    <div class="dropdown-content">
                        <a onclick="showPostEditor('${post.id}')"><i class="material-icons">edit</i>Edit</a>
                        <a onclick="removePhotoPost('${post.id}')"><i class="material-icons">close</i>Delete</a>
                    </div>` : ''}
                </div>
            </div>
            <div class="desc">${post.description}</div>
            <div class="tags">${post.hashTags.join(' ')}</div>
        `;
        return div;
    };

    self.editPhotoPost = function(id, post) {
        const postElem = document.getElementById(`post-${id}`);
        if (postElem) {
            document.getElementById('posts-container').replaceChild(getPostHTML(post), postElem);
        }
    };

    self.removePhotoPost = function(id) {
        self.displayedPosts--;
        const childNode = document.getElementById(`post-${id}`);
        if (childNode) {
            document.getElementById('posts-container').removeChild(childNode);
        }
    };

    self.displayHeader = function () {
        let ul = document.getElementById('header').firstElementChild;
        ul.innerHTML = `<li><a class="company-name">PhotoShare</a></li>
        ${authModule.userName ? `<li class="right"><a onclick="signOut()" class="btn">Sign out</a></li>
            <li class="right"><a onclick="showPostEditor()" id="add-post-btn" class="btn">Add New Photo</a></li>
            <li class="right"><a id="user-name">${authModule.userName}</a></li>` :
            `<li class="right"><a onclick="showSignIn()" class="btn">Sign in</a></li>`}`;
    };

    return self;
})();

let authModule = (function () {
    let self = {};

    self.users = JSON.parse(localStorage.getItem('users'));
    if (!self.users) {
        localStorage.setItem('users', []);
        self.users = [];
    }

    self.userName = '';

    self.signIn = function (name, password) {
        let user = self.users.find(a => a.name === name);
        if (user && user.password === password) {
            self.userName = user.name;
            return true;
        }
        return false;
    };

    self.signOut = function () {
        self.userName = '';
    };

    return self;
})();

function like(id) {
    if (authModule.userName) {
        let button = document.getElementById('post-' + id).getElementsByClassName('btn-like')[0];
        let likes = dataModule.getPhotoPost(id).likes;
        let counter = document.getElementById('post-' + id).getElementsByClassName('like-counter')[0];
        if (button.innerHTML === 'star') {
            button.innerHTML = 'star_border';
            button.classList.remove('color-yellow');
            let index = likes.indexOf(authModule.userName);
            if (index !== -1) {
                likes.splice(index, 1);
            }

        } else {
            button.innerHTML = 'star';
            button.classList.add('color-yellow');
            likes.push(authModule.userName);
        }
        counter.innerHTML = likes.length;
        dataModule.editPhotoPost(id, {likes: likes});
    }
}

function showMore() {
    let button = document.getElementById('btn-more');
    button.style.display = 'inline-block';
    let posts = dataModule.getPhotoPosts(domModule.displayedPosts, 10, currentFilter);
    if (posts.length < 10) {
        button.style.display = 'none';
    }
    domModule.displayPosts(posts);
    let container = document.getElementById('posts-container');
    if (container.childElementCount === 0) {
        container.innerHTML = '<h1>No posts found</h1>';
    }
}

function removePhotoPost(id) {
    if (dataModule.removePhotoPost(id)) {
        domModule.removePhotoPost(id);
        return true;
    }
    return false;
}

function toggleModal(id) {
    document.querySelector(id).classList.toggle("show-modal");
}

function signOut() {
    authModule.signOut();
    domModule.clearPosts();
    domModule.displayHeader();
    showMore();
}

function showSignIn() {
    document.querySelector('.sign-in .error').style.display = 'none';
    toggleModal('#sign-modal');
}

function signIn() {
    let data = new FormData(document.querySelector('.sign-in'));
    if (authModule.signIn(data.get('name'), data.get('password'))) {
        toggleModal('#sign-modal');
        domModule.clearPosts();
        domModule.displayHeader();
        showMore();
    } else {
        document.querySelector('.sign-in .error').style.display = 'inline-block';
    }
}

function showPostEditor(id) {
    let post = dataModule.getPhotoPost(id);
    let modal = document.getElementById("edit-modal");
    if (post) {
        modal.innerHTML = `<form class="modal-content edit-post">
        <label class="error">Incorrect input</label>
        <i onclick="toggleModal('#edit-modal')" class="close-button material-icons">close</i>

        <input type="hidden" name="id" value="${id}"/>
        <input type="url" maxlength="256" name="link" placeholder="Photo link" value="${post.photoLink}"/>
        <textarea rows="5" name="description" placeholder="Photo description">${post.description}</textarea>
        <textarea rows="3" name="hashtags" placeholder="Hash tags">${post.hashTags.join(' ')}</textarea>
        <a onclick="submitPost()" class="btn">Save post</a>
        </form>`;
    } else {
        modal.innerHTML = `<form class="modal-content edit-post">
        <label class="error">Incorrect input</label>
        <i onclick="toggleModal('#edit-modal')" class="close-button material-icons">close</i>

        <input type="hidden" name="id"/>
        <input type="url" maxlength="64" name="link" placeholder="Photo link"/>
        <textarea rows="5" name="description" placeholder="Photo description"></textarea>
        <textarea rows="3" name="hashtags" placeholder="Hash tags"></textarea>
        <a onclick="submitPost()" class="btn">Save post</a>
        </form>`;
    }
    toggleModal("#edit-modal");
}

function submitPost() {
    if (authModule.userName) {
        let data = new FormData(document.querySelector('.edit-post'));
        let post = {
            id: data.get('id'),
            photoLink: data.get('link'),
            description: data.get('description'),
            hashTags: data.get('hashtags').match(/#\w+/g),
        };
        if (post.id) {
            if (dataModule.editPhotoPost(post.id, post)) {
                toggleModal("#edit-modal");
                domModule.editPhotoPost(post.id, dataModule.getPhotoPost(post.id));
            } else {
                document.querySelector('.edit-post .error').style.display = 'inline-block';
            }
        } else {
            post.id = dataModule.getNewId();
            post.createdAt = new Date();
            post.author = authModule.userName;
            post.likes = [];
            if (dataModule.addPhotoPost(post)) {
                toggleModal("#edit-modal");
                domModule.displayNewPost(post);
            } else {
                document.querySelector('.edit-post .error').style.display = 'inline-block';
            }
        }
    }
}

function searchPosts() {
    let data = new FormData(document.querySelector('#search-form'));
    currentFilter = {
        author: data.get('author'),
        date: data.get('date'),
        tags: data.get('hashtags').match(/#\w+/g)
    };
    if (currentFilter.date) {
        currentFilter.date = new Date(currentFilter.date);
    }
    domModule.clearPosts();
    showMore();
}

window.onload = function() {
    window.currentFilter = {};
    domModule.displayHeader();
    showMore();
};


