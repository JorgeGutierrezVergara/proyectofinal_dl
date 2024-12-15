const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const getUserById = async (id) => {
  const values = [id];
  const consulta = "SELECT * FROM usuarios WHERE id = $1";
  const {
    rows: [usuarios],
  } = await pool.query(consulta, values);
  return usuarios;
};

const getProductById = async (id) => {
  const values = [id];
  const consulta = "SELECT * FROM productos WHERE id = $1";
  const {
    rows: [producto],
  } = await pool.query(consulta, values);
  return producto;
};

const getProducts = async () => {
  const consulta = "SELECT * FROM productos";
  const { rows } = await pool.query(consulta);
  return rows;
};

const registerUser = async (usuario) => {
  const { nombre, email, password, phone } = usuario;
  const passwordEncriptada = bcrypt.hashSync(password);
  const values = [nombre, email, passwordEncriptada, phone];
  const consulta = "INSERT INTO usuarios VALUES (DEFAULT, $1, $2, $3, $4)";
  await pool.query(consulta, values);
};

const addFavorite = async (usuario_id, producto_id) => {
  const values = [usuario_id, producto_id];
  const consulta = "INSERT INTO favoritos VALUES (DEFAULT, $1, $2)";
  await pool.query(consulta, values);
};

const deleteFavorite = async (usuario_id, producto_id) => {
  const values = [usuario_id, producto_id];
  const consulta =
    "DELETE FROM favoritos WHERE usuario_id = $1 AND producto_id = $2";
  await pool.query(consulta, values);
};

const getFavorites = async (usuario_id) => {
  const value = [usuario_id];
  const consulta =
    "SELECT p.id AS producto_id, p.title, p.descripcion, p.price, p.is_active, p.img FROM favoritos f JOIN productos p ON f.producto_id = p.id WHERE f.usuario_id = $1";
  const { rows } = await pool.query(consulta, value);
  return rows;
};

const isItFavorite = async (usuario_id, producto_id) => {
  const values = [usuario_id, producto_id];
  const consulta =
    "SELECT * FROM favoritos WHERE usuario_id = $1 AND producto_id = $2";
  const { rows } = await pool.query(consulta, values);
  return rows;
};

const getMyProducts = async (usuario_id) => {
  const value = [usuario_id];
  const consulta =
    "SELECT p.id AS producto_id, p.title, p.descripcion, p.price, p.is_active, p.img FROM productos p JOIN usuarios u ON p.id_usuario = u.id WHERE u.id = $1";
  const { rows } = await pool.query(consulta, value);
  return rows;
};

const checkCredentials = async (email, password) => {
  const values = [email];
  const consulta = "SELECT * FROM usuarios WHERE email = $1";
  const {
    rows: [usuario],
    rowCount,
  } = await pool.query(consulta, values);

  if (rowCount === 0) {
    throw { code: 401, message: "Email o contraseña incorrecta" };
  }

  const { password: passwordEncriptada } = usuario;
  const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);
  if (!passwordEsCorrecta) {
    throw { code: 401, message: "Email o contraseña incorrecta" };
  }
  return usuario;
};

module.exports = {
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
};
