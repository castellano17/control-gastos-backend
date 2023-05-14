const router = require("express").Router();

const expensesServices = require("./expenses.services");

const JwtPassport = require("../middlewares/passport.middleware");

router
  .route("/")
  .get(
    JwtPassport.authenticate("jwt", { session: false }),
    expensesServices.getAllExpense
  )
  .post(
    JwtPassport.authenticate("jwt", { session: false }),
    expensesServices.postNewExpense
  );
router
  .route("/:id")
  // .get(expensesServices.getExpenseById)
  .patch(expensesServices.updateExpense)
  .delete(expensesServices.deleteExpense);

module.exports = router;
