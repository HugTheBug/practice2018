let postsModel = (function (photoPosts) {
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
    self.getPhotoPosts =
        function(skip = 0, top = 10, filterConfig = null, callback = function () {}) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'posts');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            if (xhr.status === 200) {
                callback(xhr.status, JSON.parse(xhr.responseText));
            }
            else {
                callback(xhr.status, null);
            }
        };
        xhr.send('skip=' + skip + '&number=' + top + '&filterConfig=' + JSON.stringify(filterConfig));
    };

    /**
     * Get post with specified id
     * @param {string} id id of the post
     * @returns {*} post
     */
    self.getPhotoPost = function (id, callback = function () {}) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'posts/post/' + id);
        xhr.onload = function() {
            if (xhr.status === 200) {
                callback(xhr.status, JSON.parse(xhr.responseText));
            }
            else {
                callback(xhr.status, null);
            }
        };
        xhr.send();
    };

    /**
     * Adds new post after validation
     * @param {Object} photoPost new post
     * @returns {boolean} true if the post was added otherwise false
     */
    self.addPhotoPost = function (photoPost, callback = function () {}) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'posts/add');
        xhr.onload = function() {
            if (xhr.status === 200) {
                callback(xhr.status, JSON.parse(xhr.responseText));
            }
            else {
                callback(xhr.status, null);
            }
        };
        xhr.send(photoPost);
    };

    /**
     * Edits post with specified id
     * photoPost contains only properties that need to be changed
     * id, author, createdAt cannot be changed
     * @param {string} id id of the post that would be edited
     * @param {Object} photoPost contains new value for the post properties
     * @returns {boolean} true if the post was edited otherwise false
     */
    self.editPhotoPost = function(id, photoPost, callback = function () {}) {
        let xhr = new XMLHttpRequest();
        xhr.open('PUT', 'posts/post/' + id);
        xhr.onload = function() {
            callback(xhr.status);
        };
        xhr.send(photoPost);
    };

    /**
     * Removes post with specified id
     * @param {string} id id of the post to be removed
     * @returns {boolean} true if the post was removed otherwise false
     */
    self.removePhotoPost = function(id, callback = function () {}) {
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', 'posts/post/' + id);
        xhr.onload = function() {
            callback(xhr.status);
        };
        xhr.send();
    };

    return self;

})();

let postsView = (function() {
    let self = {};
    self.displayedPosts = 0;

    self.clearPosts = function() {
        self.displayedPosts = 0;
        document.getElementById('posts-container').innerHTML='';
    };

    self.displayNewPost = function (post) {
        self.displayedPosts++;
        let container = document.getElementById('posts-container');
        if (self.displayedPosts === 1) {
            container.insertNode(getPostHTML(post));
        } else {
            container.insertBefore(getPostHTML(post), container.firstElementChild);
        }
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
        if (typeof post.createdAt === 'string')
            post.createdAt = new Date(post.createdAt);
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
                <i onclick="postController.like('${post.id}')" class="material-icons btn-like ${post.likes.includes(authController.userName) ? `color-yellow">star` : `">star_border`}</i>
                <div class="like-counter">${post.likes.length}</div>
                <div class="dropdown">
                    ${authController.userName === post.author ? `
                    <i class="material-icons btn-like">more_vert</i>
                    <div class="dropdown-content">
                        <a onclick="postController.showPostEditor('${post.id}')"><i class="material-icons">edit</i>Edit</a>
                        <a onclick="postController.removePhotoPost('${post.id}')"><i class="material-icons">close</i>Delete</a>
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
        ${authController.userName ? `<li class="right"><a onclick="postController.signOut()" class="btn">Sign out</a></li>
            <li class="right"><a onclick="postController.showPostEditor()" id="add-post-btn" class="btn">Add New Photo</a></li>
            <li class="right"><a id="user-name">${authController.userName}</a></li>` :
            `<li class="right"><a onclick="postController.showSignIn()" class="btn">Sign in</a></li>`}`;
    };

    return self;
})();


let authController = (function () {
    let self = {};

    self.userName = '';

    self.signIn = function (name, password, callback = function () {}) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'users?' + 'name=' + name + '&password=' + password);
        xhr.onload = function() {
            if (xhr.status === 200) {
                self.userName = name;
            }
            callback(xhr.status);
        };
        xhr.send();
    };

    self.signOut = function () {
        self.userName = '';
    };

    return self;
})();

let postController =  (function () {
    let self = {};

    self.like = function(id) {
        if (authController.userName) {
            let button = document.getElementById('post-' + id).getElementsByClassName('btn-like')[0];
            postsModel.getPhotoPost(
                id,
                function (status, post) {
                    if (status === 200) {
                        let likes = post.likes;
                        let counter = document.getElementById('post-' + id).getElementsByClassName('like-counter')[0];
                        if (button.innerHTML === 'star') {
                            button.innerHTML = 'star_border';
                            button.classList.remove('color-yellow');
                            let index = likes.indexOf(authController.userName);
                            if (index !== -1) {
                                likes.splice(index, 1);
                            }

                        } else {
                            button.innerHTML = 'star';
                            button.classList.add('color-yellow');
                            likes.push(authController.userName);
                        }
                        counter.innerHTML = likes.length;
                        postsModel.editPhotoPost(id, {likes: likes});
                    }
                });
        }
    };

    self.showMore = function() {
        let button = document.getElementById('btn-more');
        button.style.display = 'inline-block';

        postsModel.getPhotoPosts(
            postsView.displayedPosts,
            10,
            currentFilter,
            function (status, posts) {
                if (status === 200) {
                    if (posts.length < 10) {
                        button.style.display = 'none';
                    }
                    postsView.displayPosts(posts);
                    let container = document.getElementById('posts-container');
                    if (container.childElementCount === 0) {
                        container.innerHTML = '<h1>No posts found</h1>';
                    }
                }
            });
    };

    self.removePhotoPost = function(id) {
        postsModel.removePhotoPost(
            id,
            function (status) {
                if (status === 200)
                    postsView.removePhotoPost(id);
            });
    };

    self.toggleModal = function (id) {
        document.querySelector(id).classList.toggle("show-modal");
    };

    self.signOut = function() {
        authController.signOut();
        postsView.clearPosts();
        postsView.displayHeader();
        self.showMore();
    };

    self.showSignIn = function() {
        document.querySelector('.sign-in .error').style.display = 'none';
        self.toggleModal('#sign-modal');
    };

    self.signIn = function() {
        let data = new FormData(document.querySelector('.sign-in'));
        authController.signIn(
            data.get('name'),
            data.get('password'),
            function (status) {
                if (status === 200) {
                    self.toggleModal('#sign-modal');
                    postsView.clearPosts();
                    postsView.displayHeader();
                    self.showMore();
                } else {
                    document.querySelector('.sign-in .error').style.display = 'inline-block';
                }
            });
    };

    self.showPostEditor = function(id) {
        if (id) {
            postsModel.getPhotoPost(
                id,
                function (status, post) {
                    if (status === 200) {
                        let modal = document.getElementById("edit-modal");
                        modal.innerHTML = `<form class="modal-content edit-post">
                        <label class="error">Incorrect input</label>
                        <i onclick="postController.toggleModal('#edit-modal')" class="close-button material-icons">close</i>

                        <input type="hidden" name="id" value="${id}"/>
                        <input type="file" id="photo" name="photo" accept="image/*" multiple>
                        <textarea rows="5" name="description" placeholder="Photo description">${post.description}</textarea>
                        <textarea rows="3" name="hashTags" placeholder="Hash tags">${post.hashTags.join(' ')}</textarea>
                        <a onclick="postController.submitPost()" class="btn">Save post</a>
                        </form>`;
                        self.toggleModal("#edit-modal");
                    }
                });
        } else {
            let modal = document.getElementById("edit-modal");
            modal.innerHTML = `<form class="modal-content edit-post">
                <label class="error">Incorrect input</label>
                <i onclick="postController.toggleModal('#edit-modal')" class="close-button material-icons">close</i>

                <input type="hidden" name="id"/>
                <input type="file" id="photo" name="photo" accept="image/*" multiple>
                <textarea rows="5" name="description" placeholder="Photo description"></textarea>
                <textarea rows="3" name="hashTags" placeholder="Hash tags"></textarea>
                <a onclick="postController.submitPost()" class="btn">Save post</a>
                </form>`;
            self.toggleModal("#edit-modal");
        }

    };

    self.submitPost = function() {
        if (authController.userName) {
            let data = new FormData(document.querySelector('.edit-post'));
            let id = data.get('id');
            if (id) {
                postsModel.editPhotoPost(
                    id,
                    data,
                    function (status) {
                        if (status === 200) {
                            self.toggleModal("#edit-modal");
                            postsModel.getPhotoPost(
                                id,
                                function (status, post) {
                                    postsView.editPhotoPost(post.id, post);
                                });
                        } else {
                            document.querySelector('.edit-post .error').style.display = 'inline-block';
                        }
                    });
            } else {
                data.append("createdAt", new Date());
                data.append("author", authController.userName);

                postsModel.addPhotoPost(
                    data,
                    function (status, id) {
                        if (status === 200) {
                            self.toggleModal("#edit-modal");
                            postsModel.getPhotoPost(
                                id,
                                function (status, post) {
                                    postsView.displayNewPost(post);
                                });
                        } else {
                            document.querySelector('.edit-post .error').style.display = 'inline-block';
                        }
                    });
            }
        }
    };

    self.searchPosts = function() {
            let data = new FormData(document.querySelector('#search-form'));
            currentFilter = {
                author: data.get('author'),
                date: data.get('date'),
                tags: data.get('hashtags').match(/#\w+/g)
            };
            if (currentFilter.date) {
                currentFilter.date = new Date(currentFilter.date);
            }
            postsView.clearPosts();
            self.showMore();
        };

    return self;
})();


window.onload = function() {
    window.currentFilter = {};
    postsView.displayHeader();
    postController.showMore();
};


