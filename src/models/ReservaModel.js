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
    connection.query(sql, (error, results) => {
      if (error) return reject(error);
      resolve(results);
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
      resolve(results[0] || null);
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
Reserva.update = (idReserva, data) => {
  const sql = `
    UPDATE reserva
    SET idHuesped = ?, idHabitacion = ?, fechaEntrada = ?, fechaSalida = ?, estadoReserva = ?
    WHERE idReserva = ?;
  `;

  const values = [
    data.idHuesped,
    data.idHabitacion,
    data.fechaEntrada,
    data.fechaSalida,
    data.estadoReserva,
    idReserva
  ];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, result) => {
      if (error) return reject(error);
      if (result.affectedRows === 0) return reject('Reserva no encontrada');
      resolve({ msg: 'Registro actualizado correctamente', affectedRows: result.affectedRows });
    });
  });
};

export default Reserva;