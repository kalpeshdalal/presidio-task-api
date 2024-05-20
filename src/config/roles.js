const roles = ['user', 'admin','seller'];
const adminRoles = ['admin']; //only this roles can login to dashboard

const roleRights = new Map();
roleRights.set(roles[0], ['getUsers', "manageUsers", 'seller', 'buyer']);
roleRights.set(roles[1], ['getUsers', 'adminAccess','manageUsers']);

module.exports = {
  roles,
  roleRights,
  adminRoles
};
