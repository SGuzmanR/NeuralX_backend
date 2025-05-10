import connectDatabase from '../conexion/index.js';

const connection = connectDatabase();
const Habitacion = {};

// Obtener todas las habitaciones
Habitacion.getAll = () => {
  const sql = `
    SELECT 
      h.idHabitacion,
      h.numeroHabitacion,
      tipo.denominacionCatalogo AS tipoHabitacion,
      h.descripcionHabitacion,
      capacidad.denominacionCatalogo AS capacidadHabitacion,
      h.precioHabitacion,
      zona.denominacionCatalogo AS zonaHabitacion,
      h.disponibilidadHabitacion
    FROM habitacion h
    INNER JOIN catalogoUniversal tipo ON h.tipoHabitacion = tipo.idCatalogo
    INNER JOIN catalogoUniversal capacidad ON h.capacidadHabitacion = capacidad.idCatalogo
    INNER JOIN catalogoUniversal zona ON h.zonaHabitacion = zona.idCatalogo
    ORDER BY h.numeroHabitacion;
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
      h.idHabitacion,
      h.numeroHabitacion,
      tipo.denominacionCatalogo AS tipoHabitacion,
      h.descripcionHabitacion,
      capacidad.denominacionCatalogo AS capacidadHabitacion,
      h.precioHabitacion,
      zona.denominacionCatalogo AS zonaHabitacion,
      h.disponibilidadHabitacion
    FROM habitacion h
    INNER JOIN catalogoUniversal tipo ON h.tipoHabitacion = tipo.idCatalogo
    INNER JOIN catalogoUniversal capacidad ON h.capacidadHabitacion = capacidad.idCatalogo
    INNER JOIN catalogoUniversal zona ON h.zonaHabitacion = zona.idCatalogo
    WHERE h.idHabitacion = ?;
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