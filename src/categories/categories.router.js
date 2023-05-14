const router = require("express").Router();

const categorieServices = require("./categories.services");

const JwtPassport = require("../middlewares/passport.middleware");

router
  .route("/")
  .get(
    JwtPassport.authenticate("jwt", { session: false }),
    categorieServices.getAllCategorie
  )
  .post(
    JwtPassport.authenticate("jwt", { session: false }),
    categorieServices.postNewCategorie
  );
router
  .route("/:id")
  .get(categorieServices.getCategorieById)
  .patch(categorieServices.patchCategorie)
  .delete(categorieServices.deleteCategorie);

module.exports = router;
