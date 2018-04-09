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
    self.getPhotoPosts =
        function(skip = 0, top = 10, filterConfig = null, onsuccess = function () {}, onerror = function () {}) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'posts');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            if (xhr.status === 200) {
                onsuccess(JSON.parse(xhr.responseText));
            }
            else {
                onerror(xhr.status);
            }
        };
        xhr.send('skip=' + skip + '&number=' + top + '&filterConfig=' + JSON.stringify(filterConfig));
    };

    /**
     * Get post with specified id
     * @param {string} id id of the post
     * @returns {*} post
     */
    self.getPhotoPost = function (id, onsuccess = function () {}, onerror = function () {}) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'posts/post/' + id);
        xhr.onload = function() {
            if (xhr.status === 200) {
                onsuccess(JSON.parse(xhr.responseText));
            }
            else {
                onerror(xhr.status);
            }
        };
        xhr.send();
    };

    /**
     * Adds new post after validation
     * @param {Object} photoPost new post
     * @returns {boolean} true if the post was added otherwise false
     */
    self.addPhotoPost = function (photoPost, onsuccess = function () {}, onerror = function () {}) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'posts/add');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                onsuccess(JSON.parse(xhr.responseText));
            }
            else {
                onerror(xhr.status);
            }
        };
        xhr.send(JSON.stringify(photoPost));
    };

    /**
     * Edits post with specified id
     * photoPost contains only properties that need to be changed
     * id, author, createdAt cannot be changed
     * @param {string} id id of the post that would be edited
     * @param {Object} photoPost contains new value for the post properties
     * @returns {boolean} true if the post was edited otherwise false
     */
    self.editPhotoPost = function(id, photoPost, onsuccess = function () {}, onerror = function () {}) {
        let xhr = new XMLHttpRequest();
        xhr.open('PUT', 'posts/post/' + id);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                onsuccess();
            }
            else {
                onerror(xhr.status);
            }
        };
        xhr.send(JSON.stringify(photoPost));
    };

    /**
     * Removes post with specified id
     * @param {string} id id of the post to be removed
     * @returns {boolean} true if the post was removed otherwise false
     */
    self.removePhotoPost = function(id, onsuccess = function () {}, onerror = function () {}) {
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', 'posts/post/' + id);
        xhr.onload = function() {
            if (xhr.status === 200) {
                onsuccess();
            }
            else {
                onerror(xhr.status);
            }
        };
        xhr.send();
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
        if (self.displayedPosts === 1) {
            container.innerHTML = getPostHTML(post);
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

    self.userName = '';

    self.signIn = function (name, password, onsuccess = function () {}, onerror = function () {}) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'users?' + 'name=' + name + '&password=' + password);
        xhr.onload = function() {
            if (xhr.status === 200) {
                self.userName = name;
                onsuccess();
            }
            else {
                onerror(xhr.status);
            }
        };
        xhr.send();
    };

    self.signOut = function () {
        self.userName = '';
    };

    return self;
})();

function like(id) {
    if (authModule.userName) {
        let button = document.getElementById('post-' + id).getElementsByClassName('btn-like')[0];
        dataModule.getPhotoPost(
            id,
            function (post) {
                let likes = post.likes;
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
            });
    }
}

function showMore() {
    let button = document.getElementById('btn-more');
    button.style.display = 'inline-block';

    dataModule.getPhotoPosts(
        domModule.displayedPosts,
        10,
        currentFilter,
        function (posts) {
            if (posts.length < 10) {
                button.style.display = 'none';
            }
            domModule.displayPosts(posts);
            let container = document.getElementById('posts-container');
            if (container.childElementCount === 0) {
                container.innerHTML = '<h1>No posts found</h1>';
            }
        });
}

function removePhotoPost(id) {
    dataModule.removePhotoPost(
        id,
        function () {
            domModule.removePhotoPost(id);
        });
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
    authModule.signIn(
        data.get('name'),
        data.get('password'),
        function () {
            toggleModal('#sign-modal');
            domModule.clearPosts();
            domModule.displayHeader();
            showMore();
        },
        function () {
            document.querySelector('.sign-in .error').style.display = 'inline-block';
        });
}

function showPostEditor(id) {
    if (id) {
        dataModule.getPhotoPost(
            id,
            function (post) {
                let modal = document.getElementById("edit-modal");
                modal.innerHTML = `<form class="modal-content edit-post">
                <label class="error">Incorrect input</label>
                <i onclick="toggleModal('#edit-modal')" class="close-button material-icons">close</i>

                <input type="hidden" name="id" value="${id}"/>
                <input type="url" maxlength="256" name="link" placeholder="Photo link" value="${post.photoLink}"/>
                <textarea rows="5" name="description" placeholder="Photo description">${post.description}</textarea>
                <textarea rows="3" name="hashtags" placeholder="Hash tags">${post.hashTags.join(' ')}</textarea>
                <a onclick="submitPost()" class="btn">Save post</a>
                </form>`;
                toggleModal("#edit-modal");
            });
    } else {
        let modal = document.getElementById("edit-modal");
        modal.innerHTML = `<form class="modal-content edit-post">
                <label class="error">Incorrect input</label>
                <i onclick="toggleModal('#edit-modal')" class="close-button material-icons">close</i>

                <input type="hidden" name="id"/>
                <input type="url" maxlength="64" name="link" placeholder="Photo link"/>
                <textarea rows="5" name="description" placeholder="Photo description"></textarea>
                <textarea rows="3" name="hashtags" placeholder="Hash tags"></textarea>
                <a onclick="submitPost()" class="btn">Save post</a>
                </form>`;
        toggleModal("#edit-modal");
    }

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
            dataModule.editPhotoPost(
                post.id,
                post,
                function () {
                    toggleModal("#edit-modal");
                    dataModule.getPhotoPost(
                        post.id,
                        function (post) {
                            domModule.editPhotoPost(post.id, post);
                        });
                },
                function () {
                    document.querySelector('.edit-post .error').style.display = 'inline-block';
                });
        } else {
            post.createdAt = new Date();
            post.author = authModule.userName;
            post.likes = [];
            dataModule.addPhotoPost(
                post,
                function (id) {
                    toggleModal("#edit-modal");
                    dataModule.getPhotoPost(
                        id,
                        function (post) {
                            domModule.displayNewPost(post);
                        });
                },
                function () {
                    document.querySelector('.edit-post .error').style.display = 'inline-block';
                });
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


