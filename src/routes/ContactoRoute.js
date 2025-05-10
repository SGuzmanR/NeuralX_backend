import express from 'express';
import Contacto from '../models/ContactoModel.js';

const router = express.Router();

// Obtener todos los contactos
router.get('/', async (req, res) => {
  try {
    const data = await Contacto.getAll();

    if (data.length === 0) {
      return res.status(404).json({ 
        msg: 'No se encontraron contactos' 
      });
    };
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ 
      msg: 'Error en la consulta',
      error: error.message || error
    });
  };
});

// Obtener contacto por ID
router.get('/id/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Contacto.getById(id);
    
    if (!data) {
      return res.status(404).json({ 
        msg: 'Contacto no encontrado' 
      });
    };
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ 
      msg: 'Error en la consulta', 
      error: error.message || error 
    });
  };
});

// Crear un nuevo contacto
router.post('/', async (req, res) => {
  const { huespedContacto, datoContacto, tipoContacto } = req.body;

  if (!huespedContacto || !datoContacto || !tipoContacto) {
    return res.status(400).json({ 
      msg: 'Faltan datos requeridos para crear el contacto' 
    });
  };

  try {
    const result = await Contacto.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ 
      msg: 'Error al crear contacto', 
      error: error.message || error
    });
  };
});

// Actualizar un contacto
router.put('/:idContacto', async (req, res) => {
  const { idContacto } = req.params;
  const data = { ...req.body, idContacto };

  try {
    const result = await Contacto.update(idContacto, data);

    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        msg: 'Contacto no encontrado para actualizar' 
      });
    };
    res.status(200).json({ 
      msg: 'Contacto actualizado correctamente' 
    });
  } catch (error) {
    res.status(500).json({ 
      msg: 'Error al actualizar contacto', 
      error: error.message || error
    });
  };
});

export default router;