const { getData } = require("../utils/getData");
const { setData } = require("../utils/setData");
const crypto = require("crypto");

// Json dosyasından verileri alıyoruz
let data = getData();

exports.getAllRecipes = (req, res) => {
  // Tariflerin bir kopyasını oluşturuyoruz
  let recipes = [...data];

  // Aratılan terime eriş
  const searchTerm = req.query?.title?.trim()?.toLowerCase();

  // Sıralama parametresine eriş
  const order = req.query.order;

  // Eğerki artılan terim varsa filtrele
  if (searchTerm) {
    recipes = data.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(searchTerm)
    );
  }

  // Eğerki order varsa sırala
  if (order) {
    recipes.sort((a, b) =>
      order === "asc"
        ? a.recipeTime - b.recipeTime
        : b.recipeTime - a.recipeTime
    );
  }

  // Cevap gönder
  res.status(200).json({
    message: "The recipes were successfully sent",
    results: recipes.length,
    recipes: recipes,
  });
};

exports.createRecipe = (req, res) => {
  //1) Isteğin body'si ile gelen veriye eriş
  const newRecipe = req.body;

  //2) Verinin bütün değerleri tanımlanmış mı kontrol et
  if (
    !newRecipe.recipeName ||
    !newRecipe.recipeTime ||
    !newRecipe.category ||
    !newRecipe.ingredients ||
    !newRecipe.instructions ||
    !newRecipe.image
  ) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  //3) Veriye ID ekle
  newRecipe.id = crypto.randomUUID();

  //4) Yeni tarifi diziyi ekle
  data.push(newRecipe);

  //5) Yeni diziyi Json dosyasına yaz
  setData(data);

  //6) Cevap gönder
  res
    .status(200)
    .json({ message: "A new recipe has been created", recipe: data });
};

exports.getRecipe = (req, res) => {
  // Cevap gönderdik
  res.status(200).json({
    message: "The recipe you requested is available",
    recipe: req.recipe,
  });
};

exports.deleteRecipe = (req, res) => {
  // Silinecek elemanın sırasını bul
  const index = data.findIndex((i) => i.id == req.params.id);

  // Sırası bilenen elemanı diziden kaldır
  data.splice(index, 1);

  // Json dosyasını güncelle
  setData(data);

  // Cevap gönder
  res
    .status(204)
    .json({ message: "The Recipe has been successfully deleted." });
};
