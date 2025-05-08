import connectDatabase from '../conexion/index.js';

const connection = connectDatabase();
const Huesped = {};

// Obtener todos los huéspedes
Huesped.getAll = () => {
  const sql = `
    SELECT * FROM huesped
    ORDER BY primerApellido, primerNombre;
  `;
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, rows) => {
      if (error) return reject(error);
      resolve(rows);
    });
  });
};

// Obtener huésped por ID
Huesped.getById = (id) => {
  const sql = `
    SELECT * FROM huesped
    WHERE idHuesped = ?;
  `;
  return new Promise((resolve, reject) => {
    connection.query(sql, [id], (error, rows) => {
      if (error) return reject(error);
      resolve(rows);
    });
  });
};

// Crear huésped
Huesped.create = (data) => {
  const sql = `
    INSERT INTO huesped (
      primerNombre, segundoNombre, primerApellido, segundoApellido,
      tipoDocumento, numeroDocumento, fechaNacimiento,
      generoHuesped, nacionalidadHuesped
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;
  const values = [
    data.primerNombre,
    data.segundoNombre,
    data.primerApellido,
    data.segundoApellido,
    data.tipoDocumento,
    data.numeroDocumento,
    data.fechaNacimiento,
    data.generoHuesped,
    data.nacionalidadHuesped
  ];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, result) => {
      if (error) return reject(error);
      resolve({ idHuesped: result.insertId, ...data });
    });
  });
};

// Actualizar huésped
Huesped.update = (data) => {
  const sql = `
    UPDATE huesped SET
      primerNombre = ?, segundoNombre = ?, primerApellido = ?, segundoApellido = ?,
      tipoDocumento = ?, numeroDocumento = ?, fechaNacimiento = ?,
      generoHuesped = ?, nacionalidadHuesped = ?
    WHERE idHuesped = ?;
  `;
  const values = [
    data.primerNombre,
    data.segundoNombre,
    data.primerApellido,
    data.segundoApellido,
    data.tipoDocumento,
    data.numeroDocumento,
    data.fechaNacimiento,
    data.generoHuesped,
    data.nacionalidadHuesped,
    data.idHuesped
  ];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, result) => {
      if (error) return reject(error);
      resolve({ msg: 'Huésped actualizado correctamente', affectedRows: result.affectedRows });
    });
  });
};

export default Huesped;