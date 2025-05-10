import express from 'express';
import HabitacionXServicios from '../models/HabitacionXServiciosModel.js';

const router = express.Router();

// Obtener todos los HabitacionesXServicio
router.get('/', async (req, res) => {
  try {
    const data = await HabitacionXServicios.getAll();
    if (data.length === 0) {
      return res.status(404).json({ msg: 'No se encontraron registros' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: 'Error en la consulta', error });
  }
});

// Obtener HabitacionesXServicio por ID
router.get('/id/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await HabitacionXServicios.getById(id);
    if (!data) {
      return res.status(404).json({ msg: 'Registro no encontrado' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: 'Error en la consulta', error });
  }
});

// Crear HabitacionesXServicio
router.post('/', async (req, res) => {
  try {
    const result = await HabitacionXServicios.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear registro', error });
  }
});

// Actualizar HabitacionesXServicio
router.put('/:IdServicioHabitacion', async (req, res) => {
  const { IdServicioHabitacion } = req.params;
  const data = req.body;

  try {
    const result = await HabitacionXServicios.update(IdServicioHabitacion, data);
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Registro no encontrado para actualizar' });
    }
    res.status(200).json({ msg: 'Registro actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar registro', error });
  }
});

export default router;