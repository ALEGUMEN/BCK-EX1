const express = require("express");
const app = express();
const PORT = 3000;

// Ruta principal
app.get("/", (req, res) => {
  res.send("La app está corriendo en localhost:3000");
});

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
