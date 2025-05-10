import connectDatabase from '../conexion/index.js';

const connection = connectDatabase();
const Huesped = {};

// Obtener todos los huéspedes
Huesped.getAll = () => {
   const sql = `
    SELECT 
      h.idHuesped,
      h.primerNombre, 
      h.segundoNombre, 
      h.primerApellido, 
      h.segundoApellido, 
      doc.denominacionCatalogo AS tipoDocumento, 
      h.numeroDocumento, 
      h.fechaNacimiento, 
      gen.denominacionCatalogo AS generoHuesped, 
      nac.denominacionCatalogo AS nacionalidadHuesped
    FROM 
      huesped h
    INNER JOIN catalogoUniversal doc ON h.tipoDocumento = doc.idCatalogo
    INNER JOIN catalogoUniversal gen ON h.generoHuesped = gen.idCatalogo
    INNER JOIN catalogoUniversal nac ON h.nacionalidadHuesped = nac.idCatalogo
    ORDER BY h.primerApellido, h.primerNombre;
  `;
  
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

// Obtener huésped por ID
Huesped.getById = (id) => {
  const sql = `
    SELECT 
      h.idHuesped,
      h.primerNombre, 
      h.segundoNombre, 
      h.primerApellido, 
      h.segundoApellido, 
      doc.denominacionCatalogo AS tipoDocumento, 
      h.numeroDocumento, 
      h.fechaNacimiento, 
      gen.denominacionCatalogo AS generoHuesped, 
      nac.denominacionCatalogo AS nacionalidadHuesped
    FROM 
      huesped h
    INNER JOIN catalogoUniversal doc ON h.tipoDocumento = doc.idCatalogo
    INNER JOIN catalogoUniversal gen ON h.generoHuesped = gen.idCatalogo
    INNER JOIN catalogoUniversal nac ON h.nacionalidadHuesped = nac.idCatalogo
    WHERE 
      h.idHuesped = ?;
  `;

  return new Promise((resolve, reject) => {
    connection.query(sql, [id], (error, results) => {
      if (error) return reject(error);
      resolve(results[0] || null);
    });
  });
};

// Crear nuevo huésped
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
Huesped.update = (idHuesped, data) => {
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
    idHuesped
  ];

  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, result) => {
      if (error) return reject(error);
      resolve({ msg: 'Huésped actualizado correctamente', affectedRows: result.affectedRows });
    });
  });
};

export default Huesped;