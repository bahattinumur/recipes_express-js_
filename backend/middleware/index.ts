const { getData } = require("../utils/getData");

const data = getData();

exports.controlId = (req, res, next) => {
  // ID'si bilenen tarifi bul
  const recipe = data.find((i) => i.id === req.params.id);

  // Tarif dizide bulunamazsa hata gönder
  if (!recipe) {
    return next(
      res
        .status(404)
        .json({ message: "Item with the specified ID was not found" })
    );
  }

  // Tarifi bilgilerinin middleware'den bir sonraki adımda
  // erişilebilir olması için req'in içerisnde veriyi ekle
  req.recipe = recipe;

  // bulunursa bir sonraki adıma geç
  next();
};
