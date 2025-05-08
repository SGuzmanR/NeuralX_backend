import express from 'express';
import HabitacionXServicios from '../models/HabitacionXServiciosModel.js';

const router = express.Router();

// Obtener todos los registros
router.get('/', (req, res) => {
  HabitacionXServicios.getAll((error, data) => {
    if (error) return res.status(500).json({ msg: 'Error en la consulta', error });
    if (data.length > 0) return res.status(200).json(data);
    res.status(404).json({ msg: 'No se encontraron registros' });
  });
});

// Crear relación habitación-servicio
router.post('/', (req, res) => {
  const data = req.body;
  HabitacionXServicios.create(data, (error, result) => {
    if (error) return res.status(500).json({ msg: 'Error al crear registro', error });
    res.status(201).json(result);
  });
});

// Actualizar relación habitación-servicio
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const data = req.body;
  HabitacionXServicios.update(id, data, (error, result) => {
    if (error) return res.status(500).json({ msg: 'Error al actualizar registro', error });
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Registro no encontrado' });
    }
    res.status(200).json(result);
  });
});

export default router;