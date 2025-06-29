const express = require("express");
const {
  getAllRecipes,
  getRecipe,
  createRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");
const { controlId } = require("../middleware");

// Router > server js dosyası dışarında route tanımı yapmamıza olanak sağlar
const router = express.Router();

// Oluşturudğumuz router'ın yollarını ve çalışacak fonksyonlarını tanımlama
router.route("/api/recipes").get(getAllRecipes).post(createRecipe);

router
  .route("/api/recipes/:id")
  .get(controlId, getRecipe)
  .delete(controlId, deleteRecipe);

// Serverda kullanmak için export et
module.exports = router;
