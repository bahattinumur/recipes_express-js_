const express = require("express");
const cors = require("cors");
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();

// Istekteki Json verisini işler
app.use(express.json());

// Cors hatlarını önleyen middleware
app.use(cors());

// Route tanımını yap
app.use(recipeRoutes);

// Dinlenecek port'u belirle
app.listen(4000, () => {
  console.log("The server is now listening for connections on port 4000");
});
