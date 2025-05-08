import connectDatabase from '../conexion/index.js';

const connection = connectDatabase();
const Servicio = {};

Servicio.getAll = (callback) => {
  if (connection) {
    const sql = `SELECT * FROM servicio ORDER BY nombreServicio;`;
    connection.query(sql, (error, rows) => {
      if (error) throw error;
      callback(null, rows);
    });
  }
};

Servicio.create = (data, callback) => {
  if (connection) {
    const sql = `
      INSERT INTO servicio (
        nombreServicio, descripcionServicio, precioServicio,
        tipoServicio, claseServicio, modoPagoServicio
      ) VALUES (
        ${connection.escape(data.nombreServicio)},
        ${connection.escape(data.descripcionServicio)},
        ${connection.escape(data.precioServicio)},
        ${connection.escape(data.tipoServicio)},
        ${connection.escape(data.claseServicio)},
        ${connection.escape(data.modoPagoServicio)}
      );
    `;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      callback(null, { idServicio: result.insertId, ...data });
    });
  }
};

export default Servicio;