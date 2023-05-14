const { DataTypes } = require("sequelize");
const db = require("../utils/database");
const Budget = require("./budget.models");
const Category = require("./category.models");
const Expenses = db.define("expenses", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  nameExpenses: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  budgetId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Budget,
      key: "id",
    },
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Category,
      key: "id",
    },
  },
});

module.exports = Expenses;
