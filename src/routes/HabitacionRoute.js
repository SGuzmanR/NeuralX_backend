import express from 'express';
import Habitacion from '../models/HabitacionModel.js';

const router = express.Router();

// Obtener todas las habitaciones
router.get('/', async (req, res) => {
  try {
    const data = await Habitacion.getAll();
    if (data.length === 0) {
      return res.status(404).json({ msg: 'No se encontraron habitaciones' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: 'Error en la consulta', error });
  }
});

// Obtener habitacion por ID
router.get('/id/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Habitacion.getById(id);
    if (!data) {
      return res.status(404).json({ msg: 'Habitación no encontrada' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: 'Error en la consulta', error });
  }
});

// Crear habitación
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const result = await Habitacion.create(data);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear habitación', error });
  }
});

// Actualizar una habitacion
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombreHabitacion, descripcionHabitacion } = req.body;
  try {
    const result = await Habitacion.update(id, { nombreHabitacion, descripcionHabitacion });
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Habitación no encontrada para actualizar' });
    }
    res.status(200).json({ msg: 'Habitación actualizada correctamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar habitación', error });
  }
});

export default router;