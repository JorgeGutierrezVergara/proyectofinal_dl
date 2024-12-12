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
} = require("./consultas");

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
    await checkCredentials(email, password);
    const token = jwt.sign({ email }, "az_AZ");
    res.send({ token });
    console.log("usuario:" + email + " iniciado");
  } catch (error) {
    console.log(error);
    res.status(error.code || 500).send(error);
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

app.get("/usuarios", async (req, res) => {
  try {
    const usuario = await getUserById("jorge");
    res.json([usuario]);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
});
