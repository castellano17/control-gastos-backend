const router = require("express").Router();

//! const express = require('express')
//! const router = express.Router()

const userServices = require("./users.services");
const budgetServices = require("../budget/budget.services");
const JwtPassport = require("../middlewares/passport.middleware");

// router.get('/users', userServices.getAllUsers)
// router.post('/users', userServices.postNewUser)

router.route("/").get(userServices.getAllUsers).post(userServices.postNewUser);

// router.get('/users/:id', userServices.getUserById)
// router.patch('/users/:id', userServices.patchUser)
// router.delete('/users/:id', userServices.deleteUser)

router
  .route("/me")
  .get(
    JwtPassport.authenticate("jwt", { session: false }),
    userServices.getMyUser
  );

router
  .route("/:id")
  .get(userServices.getUserById)
  .patch(userServices.patchUser)
  .delete(userServices.deleteUser);

router
  .route("/budget/total")
  .get(
    JwtPassport.authenticate("jwt", { session: false }),
    budgetServices.getMyBudget
  )
  .post(
    JwtPassport.authenticate("jwt", { session: false }),
    budgetServices.postNewBudget
  );

module.exports = router;
