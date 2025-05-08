import connectDatabase from '../conexion/index.js';

const connection = connectDatabase();
const Contacto = {};

Contacto.getAll = (callback) => {
  if (connection) {
    const sql = `SELECT * FROM contacto;`;
    connection.query(sql, (error, rows) => {
      if (error) throw error;
      callback(null, rows);
    });
  }
};

Contacto.create = (data, callback) => {
  if (connection) {
    const sql = `
      INSERT INTO contacto (
        huespedContacto, datoContacto, tipoContacto
      ) VALUES (
        ${connection.escape(data.huespedContacto)},
        ${connection.escape(data.datoContacto)},
        ${connection.escape(data.tipoContacto)}
      );
    `;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      callback(null, { IdContacto: result.insertId, ...data });
    });
  }
};

export default Contacto;