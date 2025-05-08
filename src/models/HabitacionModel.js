import connectDatabase from '../conexion/index.js';

const connection = connectDatabase();
const Habitacion = {};

// Obtener todas las habitaciones
Habitacion.getAll = (callback) => {
  if (connection) {
    const sql = `
      SELECT 
        idHabitacion,
        numeroHabitacion,
        tipoHabitacion,
        descripcionHabitacion,
        capacidadHabitacion,
        precioHabitacion,
        zonaHabitacion,
        disponibilidadHabitacion
      FROM habitacion
      ORDER BY numeroHabitacion;
    `;
    connection.query(sql, (error, rows) => {
      if (error) throw error;
      callback(null, rows);
    });
  }
};

// Crear una nueva habitación
Habitacion.create = (data, callback) => {
  if (connection) {
    const sql = `
      INSERT INTO habitacion (
        numeroHabitacion,
        tipoHabitacion,
        descripcionHabitacion,
        capacidadHabitacion,
        precioHabitacion,
        zonaHabitacion,
        disponibilidadHabitacion
      ) VALUES (
        ${connection.escape(data.numeroHabitacion)},
        ${connection.escape(data.tipoHabitacion)},
        ${connection.escape(data.descripcionHabitacion)},
        ${connection.escape(data.capacidadHabitacion)},
        ${connection.escape(data.precioHabitacion)},
        ${connection.escape(data.zonaHabitacion)},
        ${connection.escape(data.disponibilidadHabitacion)}
      );
    `;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      callback(null, { idHabitacion: result.insertId, ...data });
    });
  }
};

// Actualizar una habitación
Habitacion.update = (data, callback) => {
  if (connection) {
    const sql = `
      UPDATE habitacion SET
        numeroHabitacion = ${connection.escape(data.numeroHabitacion)},
        tipoHabitacion = ${connection.escape(data.tipoHabitacion)},
        descripcionHabitacion = ${connection.escape(data.descripcionHabitacion)},
        capacidadHabitacion = ${connection.escape(data.capacidadHabitacion)},
        precioHabitacion = ${connection.escape(data.precioHabitacion)},
        zonaHabitacion = ${connection.escape(data.zonaHabitacion)},
        disponibilidadHabitacion = ${connection.escape(data.disponibilidadHabitacion)}
      WHERE idHabitacion = ${connection.escape(data.idHabitacion)};
    `;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      callback(null, { msg: 'Habitación actualizada correctamente' });
    });
  }
};

export default Habitacion;