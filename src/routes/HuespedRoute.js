import express from 'express';
import Huesped from '../models/HuespedModel.js';

const router = express.Router();

// Obtener todos los huéspedes
router.get('/', async (req, res) => {
  try {
    const data = await Huesped.getAll();
    if (data.length === 0) {
      return res.status(404).json({ msg: 'No se encontraron huéspedes' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: 'Error en la consulta', error });
  }
});


// Obtener un huésped por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Huesped.getById(id);
    if (data.length === 0) {
      return res.status(404).json({ msg: 'Huésped no encontrado' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: 'Error en la consulta', error });
  }
});

// Crear un nuevo huésped
router.post('/', async (req, res) => {
  try {
    const result = await Huesped.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear huésped', error });
  }
});

// Actualizar un huésped
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = { ...req.body, idHuesped: id };

  try {
    const result = await Huesped.update(data);
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Huésped no encontrado para actualizar' });
    }
    res.status(200).json({ msg: 'Huésped actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar huésped', error });
  }
});

export default router;