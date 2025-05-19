const sequelize = require("../db");

const User = require("./user");
const Todo = require("./todo");

User.hasMany(Todo, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Todo.belongsTo(User, {
  foreignKey: "userId",
});

module.exports = {
  sequelize,
  User,
  Todo,
};
