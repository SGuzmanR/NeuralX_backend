import express from 'express';
import Habitacion from '../models/HabitacionModel.js';

const router = express.Router();

// Obtener todas las habitaciones
router.get('/', (req, res) => {
  Habitacion.getAll((error, data) => {
    if (error) return res.status(500).json({ msg: 'Error en la consulta', error });
    if (data.length > 0) return res.status(200).json(data);
    res.status(404).json({ msg: 'No se encontraron habitaciones' });
  });
});

// Crear habitación
router.post('/', (req, res) => {
  const data = req.body;
  Habitacion.create(data, (error, result) => {
    if (error) return res.status(500).json({ msg: 'Error al crear habitación', error });
    res.status(201).json(result);
  });
});

// Actualizar habitación
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const data = req.body;
  Habitacion.update(id, data, (error, result) => {
    if (error) return res.status(500).json({ msg: 'Error al actualizar habitación', error });
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Habitación no encontrada' });
    }
    res.status(200).json(result);
  });
});

export default router;