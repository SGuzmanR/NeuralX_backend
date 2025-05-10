import connectDatabase from '../conexion/index.js';

const connection = connectDatabase();
const Servicio = {};

// Obtener todos los servicios
Servicio.getAll = () => {
  const sql = `
    SELECT 
      s.idServicio,
      s.nombreServicio,
      s.descripcionServicio,
      tipo.denominacionCatalogo AS tipoServicio,
      clase.denominacionCatalogo AS claseServicio,
      pago.denominacionCatalogo AS modoPagoServicio,
      s.precioServicio
    FROM servicio s
    INNER JOIN catalogoUniversal tipo ON s.tipoServicio = tipo.idCatalogo
    INNER JOIN catalogoUniversal clase ON s.claseServicio = clase.idCatalogo
    INNER JOIN catalogoUniversal pago ON s.modoPagoServicio = pago.idCatalogo
    ORDER BY s.nombreServicio;
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
    SELECT 
      s.idServicio,
      s.nombreServicio,
      s.descripcionServicio,
      tipo.denominacionCatalogo AS tipoServicio,
      clase.denominacionCatalogo AS claseServicio,
      pago.denominacionCatalogo AS modoPagoServicio,
      s.precioServicio
    FROM servicio s
    INNER JOIN catalogoUniversal tipo ON s.tipoServicio = tipo.idCatalogo
    INNER JOIN catalogoUniversal clase ON s.claseServicio = clase.idCatalogo
    INNER JOIN catalogoUniversal pago ON s.modoPagoServicio = pago.idCatalogo
    WHERE s.idServicio = ?;
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
    INSERT INTO servicio (nombreServicio, descripcionServicio, precioServicio, 
                          tipoServicio, claseServicio, modoPagoServicio)
    VALUES (?, ?, ?, ?, ?, ?);
  `;

  const values = [
    data.nombreServicio,
    data.descripcionServicio,
    data.precioServicio,
    data.tipoServicio,
    data.claseServicio,
    data.modoPagoServicio
  ];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, result) => {
      if (error) return reject(error);
      resolve({ idServicio: result.insertId, ...data });
    });
  });
};

// Actualizar un servicio
Servicio.update = (idServicio, data) => {
  const sql = `
    UPDATE servicio 
    SET nombreServicio = ?, descripcionServicio = ?, precioServicio = ?, 
        tipoServicio = ?, claseServicio = ?, modoPagoServicio = ? 
    WHERE idServicio = ?;
  `;

  const values = [
    data.nombreServicio,
    data.descripcionServicio,
    data.precioServicio,
    data.tipoServicio,
    data.claseServicio,
    data.modoPagoServicio,
    idServicio 
  ];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, result) => {
      if (error) return reject(error);
      resolve({ msg: 'Servicio actualizado correctamente', affectedRows: result.affectedRows });
    });
  });
};

export default Servicio;