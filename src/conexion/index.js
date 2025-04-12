import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

let connection;

function connectDatabase() {
  if (!connection) {
    connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    connection.connect((err) => {
      if(!err) {
        console.log("Base de Datos conectada EXITOSAMENTE!");
      } else {
        console.log("ERROR en la conexión con la Base de Datos:" + err);
      }
    });
  }

  return connection;
};

export default connectDatabase;