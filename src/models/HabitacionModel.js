import connectDatabase from '../conexion/index.js';

const connection = connectDatabase();
const Habitacion = {};

// Obtener todas las habitaciones
Habitacion.getAll = () => {
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

  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

// Obtener una habitación por ID
Habitacion.getById = (id) => {
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
    WHERE idHabitacion = ?;
  `;

  return new Promise((resolve, reject) => {
    connection.query(sql, [id], (error, results) => {
      if (error) return reject(error);
      resolve(results[0] || null);
    });
  });
};

// Crear una nueva habitación
Habitacion.create = (data) => {
  const sql = `
    INSERT INTO habitacion (
      numeroHabitacion,
      tipoHabitacion,
      descripcionHabitacion,
      capacidadHabitacion,
      precioHabitacion,
      zonaHabitacion,
      disponibilidadHabitacion
    ) VALUES (?, ?, ?, ?, ?, ?, ?);
  `;

  const values = [
    data.numeroHabitacion,
    data.tipoHabitacion,
    data.descripcionHabitacion,
    data.capacidadHabitacion,
    data.precioHabitacion,
    data.zonaHabitacion,
    data.disponibilidadHabitacion
  ];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, result) => {
      if (error) return reject(error);
      resolve({ idHabitacion: result.insertId, ...data });
    });
  });
};

// Actualizar una habitación
Habitacion.update = (id, data) => {
  const sql = `
    UPDATE habitacion SET
      numeroHabitacion = ?,
      tipoHabitacion = ?,
      descripcionHabitacion = ?,
      capacidadHabitacion = ?,
      precioHabitacion = ?,
      zonaHabitacion = ?,
      disponibilidadHabitacion = ?
    WHERE idHabitacion = ?;
  `;

  const values = [
    data.numeroHabitacion,
    data.tipoHabitacion,
    data.descripcionHabitacion,
    data.capacidadHabitacion,
    data.precioHabitacion,
    data.zonaHabitacion,
    data.disponibilidadHabitacion,
    id
  ];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, result) => {
      if (error) return reject(error);
      resolve({ msg: 'Habitación actualizada correctamente', affectedRows: result.affectedRows });
    });
  });
};

export default Habitacion;