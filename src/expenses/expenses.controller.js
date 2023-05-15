const Expenses = require("../models/expenses.models");
const Category = require("../models/category.models");
const Budget = require("../models/budget.models");

const uuid = require("uuid");

const findAllExpenses = async (limit, offset, userId) => {
  const budget = await findBudgetByUser(userId);
  const budgetId = budget.id; // Obtener el id del presupuesto del objeto budget

  const expenses = await Expenses.findAndCountAll({
    limit: limit,
    offset: offset,
    where: { budgetId: budgetId },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  return expenses;
};

// const findExpensesById = async (id) => {
//   const data = await Expenses.findOne({
//     where: {
//       id: id,
//     },
//   });
//   return data;
// };

const createExpense = async (expenseObject, userId) => {
  // Obtener el id del presupuesto del usuario
  const budget = await findBudgetByUser(userId);
  const budgetId = budget.id; // Obtener el id del presupuesto del objeto budget

  // Validar que la categoría exista
  const category = await Category.findByPk(expenseObject.categoryId);
  if (!category) {
    console.log("The category does not exist");
    throw new Error("The category does not exist");
  }

  const newExpense = {
    id: uuid.v4(),
    nameExpenses: expenseObject.nameExpenses,
    amount: Number(expenseObject.amount),
    budgetId,
    categoryId: expenseObject.categoryId,
  };
  // console.log(newExpense);
  const data = await Expenses.create(newExpense);
  return data;
};

// Función auxiliar para encontrar el presupuesto del usuario
const findBudgetByUser = async (userId) => {
  const data = await Budget.findOne({
    where: {
      userId,
    },
  });
  if (!data) {
    console.log("error al validar si el usuario existe");
    throw new Error("The user does not have a budget yet");
  }
  return data;
};

const updateExpense = async (expenseId, expenseObject) => {
  const expense = await Expenses.findByPk(expenseId);

  if (!expense) {
    throw new Error("Expense not found");
  }

  const { nameExpenses, amount, categoryId } = expenseObject;

  if (nameExpenses) {
    expense.nameExpenses = nameExpenses;
  }
  if (amount) {
    expense.amount = amount;
  }

  if (categoryId) {
    const category = await Category.findByPk(categoryId);

    if (!category) {
      throw new Error("The category does not exist");
    }

    expense.categoryId = categoryId;
  }

  await expense.save();

  return expense;
};

const deleteExpense = async (expenseId) => {
  const expense = await Expenses.findByPk(expenseId);

  if (!expense) {
    throw new Error("Expense not found");
  }

  await expense.destroy();

  return expense;
};

module.exports = {
  findAllExpenses,
  // findExpensesById,
  createExpense,
  updateExpense,
  deleteExpense,
};
