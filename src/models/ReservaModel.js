import connectDatabase from '../conexion/index.js';

const connection = connectDatabase();
const Reserva = {};

// Obtener todos las Reservas
Reserva.getAll = () => {
  const sql = `
    SELECT 
      r.idReserva,
      CONCAT(h.primerNombre, ' ', h.segundoNombre, ' ', h.primerApellido, ' ', h.segundoApellido) AS nombreHuesped,
      hab.numeroHabitacion,
      r.fechaReserva,
      r.fechaEntrada,
      r.fechaSalida,
      estado.denominacionCatalogo AS estadoReserva
    FROM 
      reserva r
    INNER JOIN huesped h ON r.idHuesped = h.idHuesped
    INNER JOIN habitacion hab ON r.idHabitacion = hab.idHabitacion
    INNER JOIN catalogoUniversal estado ON r.estadoReserva = estado.idCatalogo
    ORDER BY r.fechaReserva DESC;
  `;

  return new Promise((resolve, reject) => {
    connection.query(sql, (error, rows) => {
      if (error) return reject(error);
      resolve(rows);
    });
  });
};

// Obtener reserva por ID
Reserva.getById = (id) => {
  const sql = `
    SELECT 
      r.idReserva,
      CONCAT(h.primerNombre, ' ', h.segundoNombre, ' ', h.primerApellido, ' ', h.segundoApellido) AS nombreHuesped,
      hab.numeroHabitacion,
      r.fechaReserva,
      r.fechaEntrada,
      r.fechaSalida,
      estado.denominacionCatalogo AS estadoReserva
    FROM 
      reserva r
    INNER JOIN huesped h ON r.idHuesped = h.idHuesped
    INNER JOIN habitacion hab ON r.idHabitacion = hab.idHabitacion
    INNER JOIN catalogoUniversal estado ON r.estadoReserva = estado.idCatalogo
    WHERE r.idReserva = ?;
  `;

  return new Promise((resolve, reject) => {
    connection.query(sql, [id], (error, results) => {
      if (error) return reject(error);
      if (results.length === 0) return resolve(null);
      resolve(results[0]);
    });
  });
};

// Crear una nueva reserva
Reserva.create = (data) => {
  const sql = `
    INSERT INTO reserva (idHuesped, idHabitacion, fechaEntrada, fechaSalida, estadoReserva)
    VALUES (?, ?, ?, ?, ?)
  `;
  
  const values = [
    data.idHuesped,
    data.idHabitacion,
    data.fechaEntrada,
    data.fechaSalida,
    data.estadoReserva,
  ];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, result) => {
      if (error) return reject(error);
      resolve({ idReserva: result.insertId, ...data });
    });
  });
};

// Actualizar una reserva
Reserva.update = (id, data) => {
  const fieldsToUpdate = [];
  const values = [];

  if (data.idHuesped) {
    fieldsToUpdate.push('idHuesped = ?');
    values.push(data.idHuesped);
  }
  if (data.idHabitacion) {
    fieldsToUpdate.push('idHabitacion = ?');
    values.push(data.idHabitacion);
  }
  if (data.fechaEntrada) {
    fieldsToUpdate.push('fechaEntrada = ?');
    values.push(data.fechaEntrada);
  }
  if (data.fechaSalida) {
    fieldsToUpdate.push('fechaSalida = ?');
    values.push(data.fechaSalida);
  }
  if (data.estadoReserva) {
    fieldsToUpdate.push('estadoReserva = ?');
    values.push(data.estadoReserva);
  }

  if (fieldsToUpdate.length === 0) {
    return Promise.reject('No se proporcionaron datos para actualizar.');
  }

  values.push(id);

  const sql = `
    UPDATE reserva
    SET ${fieldsToUpdate.join(', ')}
    WHERE idReserva = ?
  `;

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, result) => {
      if (error) return reject(error);
      
      if (result.affectedRows === 0) {
        return reject('Reserva no encontrada');
      }

      resolve(result);
    });
  });
};

export default Reserva;