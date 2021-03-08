const UserRoles = require('../models').UserRoles;
const Role = require('../models').Role;
module.exports = {
  
//Role.build( { idUser: req.fullUser } ); ({ through: { where: { idUser: req.fullUser } } })
  isModerator: async (req, res, next) => {
    try {
      const userRoles = await UserRoles.findAll({where:{idUser: req.fullUser},attributes: ['idRole']})
      const roles = await Role.findAll({id: {$in: userRoles}});

      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      return res.status(403).json({  message: "No esta autoizado para estar aquí" });
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: error });
    }
  },

  isAdmin: async (req, res, next) => {
    try {
      const userRoles = await UserRoles.findAll({where:{idUser: req.fullUser},attributes: ['idRole']})
      const roles = await Role.findAll({id: {$in: userRoles}});

      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      return res.status(403).json({ message: "No esta autoizado para estar aquí" });
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: error });
    }
  }
}