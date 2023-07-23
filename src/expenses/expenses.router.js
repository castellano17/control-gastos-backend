const router = require("express").Router();

const expensesServices = require("./expenses.services");

const JwtPassport = require("../middlewares/passport.middleware");

router
  .route("/")
  .get(
    JwtPassport.authenticate("jwt", { session: false }),
    expensesServices.getAllExpense
  );

router
  .route("/new")
  .post(
    JwtPassport.authenticate("jwt", { session: false }),
    expensesServices.postNewExpense
  );
router.route("/:id");
// .get(expensesServices.getExpenseById)
router.route("/update/:id").patch(expensesServices.updateExpense);
router.route("/delete/:id").delete(expensesServices.deleteExpense);

router.route("/deleteAll/:budgetId").delete(
  JwtPassport.authenticate("jwt", { session: false }),
  expensesServices.deleteAllExpensesByBudget
);

module.exports = router;
