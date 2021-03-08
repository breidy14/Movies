const User = require("../models").User;

module.exports = function (req, res, next) {
    if (req.user) {
        User.findOne(req.user.id).then((user) => {
            req.fullUser = user;
            
            next();
        })
    }else {
        return next();
    }
};
