let userModule = (function () {
    let self = {};

    const fs = require('fs');
    const path = require('path');

    self.users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data', 'users.json'), 'utf-8'));

    self.getUser = function (name, password) {
        let user = self.users.find(a => a.name === name);
        if (user && user.password === password) {
            self.userName = user.name;
            return true;
        }
        return false;
    };

    return self;
})();

module.exports = userModule;