import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import connectDatabase from './src/conexion/index.js';
import CataUniversalRoute from './src/routes/CataUniversalRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = process.env.PORT || 3000;
const app = express();

connectDatabase();

app.set('PORT', PORT);

app.use(bodyParser.json({ type: 'application/json', limit: "10mb"}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// ROUTES
app.use('/CatalogoUniversal', CataUniversalRoute);

// START SERVER
http.createServer(app).listen(app.get('PORT'), () => {
  console.log("Servidor Express escuchando por el puerto " + app.get('PORT'));
});

export default app;