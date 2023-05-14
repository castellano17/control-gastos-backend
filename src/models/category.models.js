const { DataTypes } = require("sequelize");
const db = require("../utils/database");

const Category = db.define("categories", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  nameCategory: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Category;
