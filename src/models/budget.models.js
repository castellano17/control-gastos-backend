const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const Users = require("./users.models");

const Budget = db.define("budgets", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  total: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Users,
      key: "id",
    },
  },
});
module.exports = Budget;
