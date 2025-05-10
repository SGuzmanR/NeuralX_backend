import connectDatabase from '../conexion/index.js';

const connection = connectDatabase();
const Servicio = {};

// Obtener todos los servicios
Servicio.getAll = () => {
  const sql = `
    SELECT idServicio, nombreServicio, descripcionServicio
    FROM servicio
    ORDER BY nombreServicio;
  `;
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

// Obtener servicio por ID
Servicio.getById = (id) => {
  const sql = `
    SELECT idServicio, nombreServicio, descripcionServicio
    FROM servicio
    WHERE idServicio = ?;
  `;
  return new Promise((resolve, reject) => {
    connection.query(sql, [id], (error, results) => {
      if (error) return reject(error);
      resolve(results[0] || null);
    });
  });
};

// Crear un nuevo servicio
Servicio.create = (data) => {
  const sql = `
    INSERT INTO servicio (nombreServicio, descripcionServicio)
    VALUES (?, ?);
  `;
  const values = [data.nombreServicio, data.descripcionServicio];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, result) => {
      if (error) return reject(error);
      resolve({ idServicio: result.insertId, ...data });
    });
  });
};

// Actualizar un servicio
Servicio.update = (id, data) => {
  const sql = `
    UPDATE servicio
    SET nombreServicio = ?, descripcionServicio = ?
    WHERE idServicio = ?;
  `;
  const values = [data.nombreServicio, data.descripcionServicio, id];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, result) => {
      if (error) return reject(error);
      resolve({ msg: 'Servicio actualizado correctamente', affectedRows: result.affectedRows });
    });
  });
};

export default Servicio;