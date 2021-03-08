const Role = require('../models').Role;
//import User from "../models/User";

//import bcrypt from "bcryptjs";

module.exports = {
  createRoles : async () => {
    try {
      // Count Documents
      const count = await Role.count();

      // check for existing roles
      if (count > 0) return;

      // Create default Roles
      const values = await Promise.all([
        Role.create({ name: "user" }),
        Role.create({ name: "moderator" }),
        Role.create({ name: "admin" }),
      ]);

      console.log(values);
    } catch (error) {
      console.error(error);
    }
  }
}
//exports (createRoles);
/*
export const createAdmin = async () => {
  // check for an existing admin user
  const user = await User.findOne({ email: "admin@localhost" });
  // get roles _id
  const roles = await Role.find({ name: { $in: ["admin", "moderator"] } });

  if (!user) {
    // create a new admin user
    await User.create({
      username: "admin",
      email: "admin@localhost",
      password: await bcrypt.hash("admin", 10),
      roles: roles.map((role) => role._id),
    });
    console.log('Admin User Created!')
  }
};*/