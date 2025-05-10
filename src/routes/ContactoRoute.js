import express from 'express';
import Contacto from '../models/ContactoModel.js';

const router = express.Router();

// Obtener todos los contactos
router.get('/', async (req, res) => {
  try {
    const data = await Contacto.getAll();
    if (data.length === 0) {
      return res.status(404).json({ msg: 'No se encontraron contactos' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: 'Error en la consulta', error });
  }
});

// Obtener contacto por ID
router.get('/id/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Contacto.getById(id);
    if (!data) {
      return res.status(404).json({ msg: 'Contacto no encontrado' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: 'Error en la consulta', error });
  }
});

// Crear un nuevo contacto
router.post('/', async (req, res) => {
  const { huespedContacto, datoContacto, tipoContacto } = req.body;
  try {
    const result = await Contacto.create({ huespedContacto, datoContacto, tipoContacto });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear contacto', error });
  }
});

// Actualizar un contacto
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { huespedContacto, datoContacto, tipoContacto } = req.body;

  try {
    const result = await Contacto.update({
      idContacto: id,
      huespedContacto,
      datoContacto,
      tipoContacto
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Contacto no encontrado para actualizar' });
    }

    res.status(200).json({ msg: 'Contacto actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar contacto', error });
  }
});

export default router;