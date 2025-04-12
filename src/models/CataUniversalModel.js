import connectDatabase from '../conexion/index.js';

const connection = connectDatabase();
const CataUniversal = {};

// Obtener todos los registros
CataUniversal.getAllUCatalog = (callback) => {
  if (connection) {
    let sql = `
      SELECT 
        idCatalogo, 
        tipoCatalogo, 
        denominacionCatalogo
      FROM catalogouniversal
      ORDER BY denominacionCatalogo;
    `;

    connection.query(sql, (error, rows) => {
      if (error) {
        throw error;
      } else {
        callback(null, rows); // Convierte las filas JSON a una cadena de texto para Angular
      };
    });
  };
};

//
CataUniversal.getTypeUCatalog = (callback) => {
  if (connection) {
    let sql = `
      SELECT 
        idCatalogo, 
        tipoCatalogo, 
        denominacionCatalogo
      FROM catalogouniversal
      ORDER BY denominacionCatalogo;
    `;

    connection.query(sql, (error, rows) => {
      if (error) {
        throw error;
      } else {
        callback(null, rows); // Convierte las filas JSON a una cadena de texto para Angular
      };
    });
  };
};

// Modificar un registro del Catalogo Universal
CataUniversal.updateUCatalog = (data, callback) => {
  if (connection) {
    let sql = `
      UPDATE catalogouniversal SET
        tipoCatalogo = ${connection.escape(data.tipoCatalogo)}, 
        denominacionCatalogo = ${connection.escape(data.denominacionCatalogo)}
      WHERE idCatalogo = ${connection.escape(data.idCatalogo)};
    `;

    connection.query(sql, (error, rows) => {
      if (error) {
        throw error;
      } else {
        callback(null, { 'msg': 'Se modifico el Registro en Catalogo Universal' });
      };
    });
  };
};

export default CataUniversal;