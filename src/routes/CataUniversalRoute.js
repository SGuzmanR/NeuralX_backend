import express from 'express';
import CatalogoUniversal from '../models/CataUniversalModel.js';

const router = express.Router();

// Obtener todos los registros
router.get('/', async (req, res) => {
  try {
    const data = await CatalogoUniversal.getAll();
    if (data.length === 0) {
      return res.status(404).json({ msg: 'No se encontraron registros' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: 'Error en la consulta', error });
  }
});

// Obtener registros por tipo de catálogo
router.get('/tipo/:type', async (req, res) => {
  const { type } = req.params;
  try {
    const data = await CatalogoUniversal.getByType(type);
    if (data.length === 0) {
      return res.status(404).json({ msg: 'No se encontraron registros' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: 'Error en la consulta', error });
  }
});

// Obtener registro por ID
router.get('/id/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await CatalogoUniversal.getById(id);
    if (!data) {
      return res.status(404).json({ msg: 'Registro no encontrado' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: 'Error en la consulta', error });
  }
});

// Crear un nuevo registro
router.post('/', async (req, res) => {
  const { tipoCatalogo, denominacionCatalogo } = req.body;
  try {
    const result = await CatalogoUniversal.create({ tipoCatalogo, denominacionCatalogo });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear registro', error });
  }
});

// Actualizar un registro
router.put('/', async (req, res) => {
  const { idCatalogo, tipoCatalogo, denominacionCatalogo } = req.body;
  try {
    const result = await CatalogoUniversal.update({ idCatalogo, tipoCatalogo, denominacionCatalogo });
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Registro no encontrado para actualizar' });
    }
    res.status(200).json({ msg: 'Registro actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar registro', error });
  }
});

export default router;