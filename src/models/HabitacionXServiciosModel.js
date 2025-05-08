import connectDatabase from '../conexion/index.js';

const connection = connectDatabase();
const HabitacionXServicios = {};

// Obtener todos los servicios por habitación
HabitacionXServicios.getAll = (callback) => {
  if (connection) {
    const sql = `
      SELECT 
        IdServicioHabitacion,
        idHabitacion,
        idServicio,
        cantidad
      FROM habitacionXservicios;
    `;
    connection.query(sql, (error, rows) => {
      if (error) throw error;
      callback(null, rows);
    });
  }
};

// Crear una relación habitación-servicio
HabitacionXServicios.create = (data, callback) => {
  if (connection) {
    const sql = `
      INSERT INTO habitacionXservicios (
        idHabitacion,
        idServicio,
        cantidad
      ) VALUES (
        ${connection.escape(data.idHabitacion)},
        ${connection.escape(data.idServicio)},
        ${connection.escape(data.cantidad)}
      );
    `;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      callback(null, { id: result.insertId, ...data });
    });
  }
};

export default HabitacionXServicios;
