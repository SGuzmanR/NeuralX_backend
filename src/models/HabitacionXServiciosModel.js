import connectDatabase from '../conexion/index.js';

const connection = connectDatabase();
const HabitacionXServicios = {};

// Obtener todos los HabitacionesXServicio
HabitacionXServicios.getAll = () => {
  const sql = `
    SELECT 
      IdServicioHabitacion,
      idHabitacion,
      idServicio,
      cantidad
    FROM habitacionXservicios;
  `;

  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

// Obtener HabitacionesXServicio por ID
HabitacionXServicios.getById = (id) => {
  const sql = `
    SELECT 
      IdServicioHabitacion,
      idHabitacion,
      idServicio,
      cantidad
    FROM habitacionXservicios
    WHERE IdServicioHabitacion = ?;
  `;

  return new Promise((resolve, reject) => {
    connection.query(sql, [id], (error, results) => {
      if (error) return reject(error);
      resolve(results[0] || null); // Retorna null si no encuentra nada
    });
  });
};

// Crear un HabitacionesXServicio
HabitacionXServicios.create = (data) => {
  const sql = `
    INSERT INTO habitacionXservicios (
      idHabitacion,
      idServicio,
      cantidad
    ) VALUES (?, ?, ?);
  `;

  const values = [
    data.idHabitacion,
    data.idServicio,
    data.cantidad
  ];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, result) => {
      if (error) return reject(error);
      resolve({ id: result.insertId, ...data });
    });
  });
};

// Actualizar un HabitacionesXServicio
HabitacionXServicios.update = (id, data) => {
  const sql = `
    UPDATE habitacionXservicios
    SET idHabitacion = ?, idServicio = ?, cantidad = ?
    WHERE IdServicioHabitacion = ?;
  `;

  const values = [
    data.idHabitacion,
    data.idServicio,
    data.cantidad,
    id
  ];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, result) => {
      if (error) return reject(error);
      resolve({ msg: 'Registro actualizado correctamente', affectedRows: result.affectedRows });
    });
  });
};

export default HabitacionXServicios;
