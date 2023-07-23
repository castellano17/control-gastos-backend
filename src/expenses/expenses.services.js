
const expenseControllers = require("./expenses.controller");

const getAllExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const offset = parseInt(req.query.offset, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 10;

    const { count, rows } = await expenseControllers.findAllExpenses(
      limit,
      offset,
      userId
    );

    if (offset >= count) {
      throw new Error("Offset fuera de rango");
    }

    const nextPageUrl =
      count - offset > limit
        ? `${req.protocol}://${req.get(
            "host"
          )}/api/v1/expenses?limit=${limit}&offset=${offset + limit}`
        : null;

    const prevPageUrl =
      offset - limit >= 0
        ? `${req.protocol}://${req.get(
            "host"
          )}/api/v1/expenses?limit=${limit}&offset=${offset - limit}`
        : null;

    res.status(200).json({
      count,
      next: nextPageUrl,
      prev: prevPageUrl,
      results: rows,
    });
  } catch (err) {
    res.status(200).json({
      count: 0,
      next: null,
      prev: null,
      results: [],
    });
  }
};

// const getExpenseById = (req, res) => {
//   const id = req.params.id;
//   expenseControllers
//     .findExpensesById(id)
//     .then((data) => {
//       //? En caso de que data no exista (la categoría no exista)
//       if (!data) {
//         return res
//           .status(404)
//           .json({ message: `Expense with id: ${id}, not found` });
//       }
//       res.status(200).json(data);
//     })
//     .catch((err) => {
//       res.status(400).json({ message: "Bad request", err });
//     });
// };

const postNewExpense = (req, res) => {
  const expenseObj = req.body;
  const userId = req.user.id;

  expenseControllers
    .createExpense(expenseObj, userId)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err); // Agregar console.log aquí para mostrar el error
      if (
        err.message === "The user does not have a budget yet" ||
        err.message === "The category does not exist"
      ) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(500).json({ message: err });
      }
    });
};

const updateExpense = (req, res) => {
  const expenseId = req.params.id;
  const expenseObj = req.body;

  expenseControllers
    .updateExpense(expenseId, expenseObj)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err); // Agregar console.log aquí para mostrar el error
      if (
        err.message === "Expense not found" ||
        err.message === "The category does not exist"
      ) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(500).json({ message: err });
      }
    });
};

const deleteExpense = (req, res) => {
  const expenseId = req.params.id;

  expenseControllers
    .deleteExpense(expenseId)
    .then(() => {
      res.status(200).json({ message: "Expense deleted successfully." });
    })
    .catch((err) => {
      console.log(err);
      if (err.message === "Expense not found") {
        res.status(400).json({ message: err.message });
      } else {
        res.status(500).json({ message: "Error deleting expense." });
      }
    });
};

const deleteAllExpensesByBudget = (req, res) => {
  const budgetId = req.params.budgetId;

  expenseControllers
    .deleteAllExpensesByBudget(budgetId)
    .then(() => {
      res.status(200).json({ message: "Expenses deleted successfully." });
    })
    .catch((err) => {
      console.log(err); // Agregar console.log aquí para mostrar el error
      res.status(500).json({ message: "Error deleting expenses by budget." });
    });
};


module.exports = {
  getAllExpense,
  // getExpenseById,
  postNewExpense,
  updateExpense,
  deleteExpense,
  deleteAllExpensesByBudget,
};
