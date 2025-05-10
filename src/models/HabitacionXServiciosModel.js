import connectDatabase from '../conexion/index.js';

const connection = connectDatabase();
const HabitacionXServicios = {};

// Obtener todos los HabitacionesXServicio
HabitacionXServicios.getAll = () => {
  const sql = `
    SELECT 
      hxs.IdServicioHabitacion,
      hxs.idHabitacion,
      hxs.idServicio,
      hxs.cantidad,
      hab.numeroHabitacion,
      ser.nombreServicio
    FROM habitacionXservicios hxs
    INNER JOIN habitacion hab ON hxs.idHabitacion = hab.idHabitacion
    INNER JOIN servicio ser ON hxs.idServicio = ser.idServicio
    ORDER BY hxs.IdServicioHabitacion;
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
      hxs.IdServicioHabitacion,
      hxs.idHabitacion,
      hxs.idServicio,
      hxs.cantidad,
      hab.numeroHabitacion,
      ser.nombreServicio
    FROM habitacionXservicios hxs
    INNER JOIN habitacion hab ON hxs.idHabitacion = hab.idHabitacion
    INNER JOIN servicio ser ON hxs.idServicio = ser.idServicio
    WHERE hxs.IdServicioHabitacion = ?;
  `;

  return new Promise((resolve, reject) => {
    connection.query(sql, [id], (error, results) => {
      if (error) return reject(error);
      resolve(results[0] || null);
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
HabitacionXServicios.update = (idServicioHabitacion, data) => {
  const sql = `
    UPDATE habitacionXservicios
    SET idHabitacion = ?, idServicio = ?, cantidad = ?
    WHERE idServicioHabitacion = ?;
  `;

  const values = [
    data.idHabitacion,
    data.idServicio,
    data.cantidad,
    idServicioHabitacion
  ];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, result) => {
      if (error) return reject(error);
      resolve({ msg: 'Registro actualizado correctamente', affectedRows: result.affectedRows });
    });
  });
};

export default HabitacionXServicios;
