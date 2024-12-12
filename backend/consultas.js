const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "12345",
  database: "pfinal",
  allowExitOnIdle: true,
});

const getUserById = async (id) => {
  const values = [id];
  const consulta = "SELECT * FROM usuarios WHERE nombre = $1";
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
  console.log("consulta: " + consulta);
  return producto;
};

const getProducts = async () => {
  console.log("hola");
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

const checkCredentials = async (email, password) => {
  const values = [email];
  const consulta = "SELECT * FROM usuarios WHERE email = $1";
  const {
    rows: [usuario],
    rowCount,
  } = await pool.query(consulta, values);

  const { password: passwordEncriptada } = usuario;
  const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada);
  if (!passwordEsCorrecta) {
    throw { code: 401, message: "Email o contraseña incorrecta" };
  }
};

module.exports = {
  getUserById,
  registerUser,
  checkCredentials,
  getProducts,
  getProductById,
};
