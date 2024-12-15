const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.listen(3000, console.log("Servidor levantado en el puerto 3000"));
app.use(cors());

const {
  getUserById,
  registerUser,
  checkCredentials,
  getProducts,
  getProductById,
  addFavorite,
  isItFavorite,
  deleteFavorite,
  getFavorites,
  getMyProducts,
} = require("./consultas");

app.get("/usuarios", async (req, res) => {
  const Authorization = req.header("Authorization");
  const token = Authorization.split("Bearer ")[1];
  console.log("token: " + token);
  try {
    const decoded = jwt.verify(token, "az_AZ");
    const usuario_id = decoded.id;
    const result = await getUserById(usuario_id);
    res.json([result]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener productos");
  }
});

app.post("/usuarios", async (req, res) => {
  try {
    const usuario = req.body;
    await registerUser(usuario);
    res.send("Usuario creado con éxito");
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await checkCredentials(email, password);
    const { id } = usuario;
    const token = jwt.sign({ id, email }, "az_AZ");
    console.log(token);
    res.send({ token });
  } catch (error) {
    console.error(error);
    res.status(error.code || 500).send(error);
  }
});

app.get("/favoritos", async (req, res) => {
  const Authorization = req.header("Authorization");
  const token = Authorization.split("Bearer ")[1];
  if (!token) {
    return res.status(401).json({ message: "No se encontró el token." });
  }
  try {
    const decoded = jwt.verify(token, "az_AZ");
    const usuario_id = decoded.id;
    const result = await getFavorites(usuario_id);

    res.json({ result });
  } catch (error) {
    console.error("Error al obtener favoritos:", error.message);
    res.status(500).json({ message: "Error al obtener favoritos" });
  }
});

app.post("/favoritos/:id", async (req, res) => {
  const { id: producto_id } = req.params;
  const Authorization = req.header("Authorization");
  const token = Authorization.split("Bearer ")[1];
  try {
    const decoded = jwt.verify(token, "az_AZ");
    const usuario_id = decoded.id;
    await addFavorite(usuario_id, producto_id);
    res
      .status(201)
      .send({ message: "Producto añadido a favoritos exitosamente." });
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
  }
});

app.get("/favoritos/:id", async (req, res) => {
  const { id: producto_id } = req.params;
  const Authorization = req.header("Authorization");
  const token = Authorization.split("Bearer ")[1];

  try {
    const decoded = jwt.verify(token, "az_AZ");
    const usuario_id = decoded.id;
    const result = await isItFavorite(usuario_id, producto_id);

    const isFavorite = result.length > 0;
    res.json({ isFavorite });
  } catch (error) {
    console.error("Error al verificar favoritos:", error.message);
    res.status(500).json({ message: "Error al verificar favoritos" });
  }
});

app.delete("/favoritos/:id", async (req, res) => {
  const { id: producto_id } = req.params;
  const Authorization = req.header("Authorization");
  const token = Authorization.split("Bearer ")[1];

  try {
    const decoded = jwt.verify(token, "az_AZ");
    const usuario_id = decoded.id;
    await deleteFavorite(usuario_id, producto_id);
    res
      .status(201)
      .send({ message: "Producto eliminado de favoritos exitosamente." });
  } catch (error) {
    console.error("Error al verificar favoritos:", error.message);
    res.status(500).json({ message: "Error al verificar favoritos" });
  }
});

app.get("/productos", async (req, res) => {
  try {
    const result = await getProducts();
    res.json([result]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener productos");
  }
});

app.get("/productos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await getProductById(id);
    res.json([result]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener productos");
  }
});

app.get("/mis_productos/", async (req, res) => {
  const Authorization = req.header("Authorization");
  const token = Authorization.split("Bearer ")[1];
  try {
    const decoded = jwt.verify(token, "az_AZ");
    const usuario_id = decoded.id;
    const result = await getMyProducts(usuario_id);
    res.json([result]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener productos");
  }
});
