import express from 'express';
import Contacto from '../models/ContactoModel.js';

const router = express.Router();

// Obtener todos los contactos
router.get('/', (req, res) => {
  Contacto.getAll((error, data) => {
    if (error) return res.status(500).json({ msg: 'Error en la consulta', error });
    if (data.length > 0) return res.status(200).json(data);
    res.status(404).json({ msg: 'No se encontraron contactos' });
  });
});

// Crear un nuevo contacto
router.post('/', (req, res) => {
  Contacto.create(req.body, (error, result) => {
    if (error) return res.status(500).json({ msg: 'Error al crear contacto', error });
    res.status(201).json(result);
  });
});

// Actualizar un contacto
router.put('/:id', (req, res) => {
  const { id } = req.params;
  Contacto.update(id, req.body, (error, result) => {
    if (error) return res.status(500).json({ msg: 'Error al actualizar contacto', error });
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Contacto no encontrado' });
    }
    res.status(200).json(result);
  });
});

export default router;