import connectDatabase from '../conexion/index.js';

const connection = connectDatabase();
const CatalogoUniversal = {};

// Obtener todos los registros
CatalogoUniversal.getAll = () => {
  const sql = `
    SELECT idCatalogo, tipoCatalogo, denominacionCatalogo
    FROM catalogouniversal
    ORDER BY denominacionCatalogo;
  `;
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

// Obtener registros por tipo de catálogo
CatalogoUniversal.getByType = (type) => {
  const sql = `
    SELECT idCatalogo, tipoCatalogo, denominacionCatalogo
    FROM catalogouniversal
    WHERE tipoCatalogo = ?
    ORDER BY denominacionCatalogo;
  `;
  return new Promise((resolve, reject) => {
    connection.query(sql, [type], (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

// Obtener registro por ID
CatalogoUniversal.getById = (id) => {
  const sql = `
    SELECT idCatalogo, tipoCatalogo, denominacionCatalogo
    FROM catalogouniversal
    WHERE idCatalogo = ?;
  `;
  return new Promise((resolve, reject) => {
    connection.query(sql, [id], (error, results) => {
      if (error) return reject(error);
      resolve(results[0] || null); // Devuelve null si no existe
    });
  });
};

// Crear un nuevo registro
CatalogoUniversal.create = (data) => {
  const sql = `
    INSERT INTO catalogouniversal (tipoCatalogo, denominacionCatalogo)
    VALUES (?, ?);
  `;
  const values = [data.tipoCatalogo, data.denominacionCatalogo];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, result) => {
      if (error) return reject(error);
      resolve({ idCatalogo: result.insertId, ...data });
    });
  });
};

// Actualizar un registro
CatalogoUniversal.update = (data) => {
  const sql = `
    UPDATE catalogouniversal
    SET tipoCatalogo = ?, denominacionCatalogo = ?
    WHERE idCatalogo = ?;
  `;
  const values = [data.tipoCatalogo, data.denominacionCatalogo, data.idCatalogo];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, result) => {
      if (error) return reject(error);
      resolve({ msg: 'Registro actualizado correctamente', affectedRows: result.affectedRows });
    });
  });
};

export default CatalogoUniversal;