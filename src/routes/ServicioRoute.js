import express from 'express';
import Servicio from '../models/ServicioModel.js';

const router = express.Router();

// Obtener todos los servicios
router.get('/', (req, res) => {
  Servicio.getAll((error, data) => {
    if (error) return res.status(500).json({ msg: 'Error en la consulta', error });
    res.status(200).json(data);
  });
});

// Crear un nuevo servicio
router.post('/', (req, res) => {
  Servicio.create(req.body, (error, result) => {
    if (error) return res.status(500).json({ msg: 'Error al crear servicio', error });
    res.status(201).json(result);
  });
});

// Actualizar un servicio
router.put('/:id', (req, res) => {
  const { id } = req.params;
  Servicio.update(id, req.body, (error, result) => {
    if (error) return res.status(500).json({ msg: 'Error al actualizar servicio', error });
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Servicio no encontrado' });
    }
    res.status(200).json(result);
  });
});

export default router;