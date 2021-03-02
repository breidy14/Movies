const User = require("../models").User;

module.exports = function (req, res, next) {
    if (req.user) {
        User.findOne(req.user.id).then((user) => {
          console.log(user);
          console.log('estoy en find');
            req.fullUser = user;
            
            next();
        })
    }else {
        return next();
    }
};
