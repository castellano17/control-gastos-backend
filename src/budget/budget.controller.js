const Budget = require("../models/budget.models");
const uuid = require("uuid");

const findBudgetUser = async (id) => {
  // console.log(id);
  const data = await Budget.findOne({
    where: {
      user_id: id, // buscar en la columna user_id
    },
    attributes: {
      exclude: ["createdAt", "updatedAt", "userId"],
    },
  });
  return data;
};

const createbudget = async (budgetObject, userId) => {
  const existingBudget = await Budget.findOne({ where: { userId } });
  if (existingBudget) {
    throw new Error("A budget already exists for this user");
  }

  if (!budgetObject.total || Number(budgetObject.total) <= 0) {
    throw { message: "total is required and must be a positive number" };
  }

  const newBudget = {
    id: uuid.v4(),
    total: Number(budgetObject.total),
    userId: userId,
  };
  const data = await Budget.create(newBudget);
  return data;
};

const updateBudget = async (id, budgetObj) => {
  const selectedBudget = await Budget.findOne({
    where: {
      id: id,
    },
  });

  if (!selectedBudget) return null;

  const modifiedBudget = await selectedBudget.update(budgetObj);
  return modifiedBudget;
};

module.exports = {
  findBudgetUser,
  createbudget,
  updateBudget,
};
