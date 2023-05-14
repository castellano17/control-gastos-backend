const uuid = require("uuid");
const Expenses = require("../models/expenses.models");
const data = [];
for (let i = 1; i <= 5; i++) {
  data.push({
    id: uuid.v4(),
    content: `Este es el gasto ${i} del usuario Esmir`,
    amount: 20,
    budgetId: "$2b$10$Bu07nfyRkdMhmfD8Rd4sNePoR7XvD..zQBPAXCl/v6nYvCiMgVl7a",
    categoryId: "",
  });

  data.push({
    id: uuid.v4(),
    content: `Este es el gasto ${i} del usuario Erick`,
    amount: 200,
    budgetId: "",
    categoryId: "",
  });
}

const generateExpensesSeeder = async () => {
  await Expenses.bulkCreate(data);
};
generateExpensesSeeder()
  .then(() => console.log("Expenses seeders executed succesfully!"))
  .catch((err) => console.log(err));
