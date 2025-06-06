import express from 'express';
import Servicio from '../models/ServicioModel.js';

const router = express.Router();

// Obtener todos los servicios
router.get('/', async (req, res) => {
  try {
    const data = await Servicio.getAll();

    if (data.length === 0) {
      return res.status(404).json({ 
        msg: 'No se encontraron servicios' 
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

// Obtener servicio por ID
router.get('/id/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Servicio.getById(id);
    if (!data) {
      return res.status(404).json({ 
        msg: 'Servicio no encontrado' 
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

// Crear un nuevo servicio
router.post('/', async (req, res) => {
  const { nombreServicio, precioServicio, tipoServicio, claseServicio, modoPagoServicio } = req.body;

  if (!nombreServicio || !precioServicio || !tipoServicio || !claseServicio || !modoPagoServicio) {
    return res.status(400).json({ 
      msg: 'Faltan datos requeridos para crear el servicio'
    });
  };

  try {
    const result = await Servicio.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      msg: 'Error al crear servicio',
      error: error.message || error 
    });
  };
});

// Actualizar un servicio
router.put('/:idServicio', async (req, res) => {
  const { idServicio } = req.params;
  const data = { ...req.body, idServicio };
  
  try {
    const result = await Servicio.update(idServicio, data); 
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        msg: 'Servicio no encontrado para actualizar' 
      });
    };
    res.status(200).json({ 
      msg: 'Servicio actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ 
      msg: 'Error al actualizar servicio', 
      error: error.message || error
    });
  };
});


export default router;