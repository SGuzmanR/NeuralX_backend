import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT;

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).json({ msg: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ msg: 'Token inválido' });
  }
};

export default authMiddleware;