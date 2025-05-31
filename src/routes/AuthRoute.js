import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import connectDatabase from '../conexion/index.js';

const connection = connectDatabase();
const router = express.Router();
const JWT_SECRET = process.env.JWT;

router.get('/me', (req, res) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ msg: 'No autenticado' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const sql = 'SELECT idHuesped, primerNombre, primerApellido, emailHuesped FROM huesped WHERE idHuesped = ?';

    connection.query(sql, [decoded.idHuesped], (err, results) => {
      if (err) return res.status(500).json({ msg: 'Error del servidor' });
      if (results.length === 0) return res.status(404).json({ msg: 'Usuario no encontrado' });

      const user = results[0];
      res.json({
        user: {
          idHuesped: user.idHuesped,
          nombre: `${user.primerNombre} ${user.primerApellido}`,
          email: user.emailHuesped,
        }
      });
    });
  } catch (err) {
    return res.status(403).json({ msg: 'Token inválido' });
  }
});

router.post('/ingresar', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM huesped WHERE emailHuesped = ?';

  connection.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ msg: 'Error del servidor' });
    if (results.length === 0) return res.status(401).json({ msg: 'Usuario no encontrado' });

    const user = results[0];
    const match = await bcrypt.compare(password, user.contraseñaHuesped);

    if (!match) return res.status(401).json({ msg: 'Contraseña incorrecta' });

    const token = jwt.sign({ idHuesped: user.idHuesped }, JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 1000,
      sameSite: 'lax',
    });

    res.json({
      user: {
        idHuesped: user.idHuesped,
        nombre: `${user.primerNombre} ${user.primerApellido}`,
        email: user.email,
      }
    });
  });
});

router.post('/cerrarSesion', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
  res.json({ msg: 'Sesión cerrada correctamente' });
});


export default router;