const router = require("express").Router();

const categorieServices = require("./categories.services");

const JwtPassport = require("../middlewares/passport.middleware");

router
  .route("/")
  .get(
    JwtPassport.authenticate("jwt", { session: false }),
    categorieServices.getAllCategorie
  );
router
  .route("/new")
  .post(
    JwtPassport.authenticate("jwt", { session: false }),
    categorieServices.postNewCategorie
  );
router.route("/:id").get(categorieServices.getCategorieById);
router.route("/update/:id").patch(categorieServices.patchCategorie);
router.route("/delete/:id").delete(categorieServices.deleteCategorie);

module.exports = router;
