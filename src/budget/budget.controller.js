const Budget = require("../models/budget.models");
const uuid = require("uuid");

const findBudgetUser = async (id) => {
  console.log(id);
  const data = await Budget.findOne({
    where: {
      user_id: id, // buscar en la columna user_id
    },
  });
  return data;
};

const createbudget = async (budgetObject, userId) => {
  const existingBudget = await Budget.findOne({ where: { userId } });
  if (existingBudget) {
    throw new Error("A budget already exists for this user");
  }

  const newBudget = {
    id: uuid.v4(),
    total: Number(budgetObject.total),
    userId: userId,
  };
  const data = await Budget.create(newBudget);
  return data;
};

module.exports = {
  findBudgetUser,
  createbudget,
};
