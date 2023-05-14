const budgetControllers = require("./budget.controller");

const getMyBudget = (req, res) => {
  const id = req.user.id;
  budgetControllers
    .findBudgetUser(id)
    .then((data) => {
      //? En caso de que data no exista (el presupuesto no exista)
      if (!data) {
        return res
          .status(404)
          .json({ message: `budget with id: ${userId}, not found` });
      }
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: "Bad request", err });
    });
};

const postNewBudget = (req, res) => {
  const budgetObj = req.body;
  const userId = req.user.id;
  budgetControllers
    .createbudget(budgetObj, userId)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      if (err.message === "A budget already exists for this user") {
        res.status(400).json({ message: err.message });
      } else {
        res.status(500).json({ message: err });
      }
    });
};

module.exports = {
  postNewBudget,
  getMyBudget,
};
