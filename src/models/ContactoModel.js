import connectDatabase from '../conexion/index.js';

const connection = connectDatabase();
const Contacto = {};

// Obtener todos los contactos
Contacto.getAll = () => {
  const sql = `SELECT * FROM contacto;`;

  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

// Obtener contacto por ID
Contacto.getById = (id) => {
  const sql = `
    SELECT * FROM contacto
    WHERE idContacto = ?;
  `;

  return new Promise((resolve, reject) => {
    connection.query(sql, [id], (error, results) => {
      if (error) return reject(error);
      resolve(results[0] || null);
    });
  });
};

// Crear un nuevo contacto
Contacto.create = (data) => {
  const sql = `
    INSERT INTO contacto (huespedContacto, datoContacto, tipoContacto)
    VALUES (?, ?, ?);
  `;

  const values = [data.huespedContacto, data.datoContacto, data.tipoContacto];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, result) => {
      if (error) return reject(error);
      resolve({ idContacto: result.insertId, ...data });
    });
  });
};

// Actualizar un contacto
Contacto.update = (data) => {
  const sql = `
    UPDATE contacto
    SET huespedContacto = ?, datoContacto = ?, tipoContacto = ?
    WHERE idContacto = ?;
  `;

  const values = [
    data.huespedContacto,
    data.datoContacto,
    data.tipoContacto,
    data.idContacto
  ];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, result) => {
      if (error) return reject(error);
      resolve({ msg: 'Registro actualizado correctamente', affectedRows: result.affectedRows });
    });
  });
};

export default Contacto;