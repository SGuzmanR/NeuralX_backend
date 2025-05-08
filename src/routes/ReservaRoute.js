import express from 'express';
import Reserva from '../models/ReservaModel.js';

const router = express.Router();

// Obtener todas las reservas
router.get('/', async (req, res) => {
  try {
    const data = await Reserva.getAll();
    if (data.length === 0) {
      return res.status(404).json({ msg: 'No se encontraron reservas' });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: 'Error en la consulta de reservas', error });
  }
});

// Obtener una reserva por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const reserva = await Reserva.getById(id);
    if (!reserva) {
      return res.status(404).json({ msg: 'Reserva no encontrada' });
    }
    res.status(200).json(reserva);
  } catch (error) {
    res.status(500).json({ msg: 'Error al obtener la reserva', error });
  }
});

// Crear una nueva reserva
router.post('/', async (req, res) => {
  const { idHuesped, idHabitacion, fechaEntrada, fechaSalida, estadoReserva } = req.body;

  if (!idHuesped || !idHabitacion || !fechaEntrada || !fechaSalida || !estadoReserva) {
    return res.status(400).json({ msg: 'Faltan datos para crear la reserva' });
  }

  try {
    const result = await Reserva.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ msg: 'Error al crear reserva', error });
  }
});

// Actualizar una reserva
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { idHuesped, idHabitacion, fechaEntrada, fechaSalida, estadoReserva } = req.body;

  if (!idHuesped && !idHabitacion && !fechaEntrada && !fechaSalida && !estadoReserva) {
    return res.status(400).json({ msg: 'Faltan datos para actualizar la reserva' });
  }

  const updateData = {};
  if (idHuesped) updateData.idHuesped = idHuesped;
  if (idHabitacion) updateData.idHabitacion = idHabitacion;
  if (fechaEntrada) updateData.fechaEntrada = fechaEntrada;
  if (fechaSalida) updateData.fechaSalida = fechaSalida;
  if (estadoReserva) updateData.estadoReserva = estadoReserva;

  try {
    const result = await Reserva.update(id, updateData);

    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Reserva no encontrada' });
    }

    res.status(200).json({ msg: 'Reserva actualizada correctamente', result });
  } catch (error) {
    res.status(500).json({ msg: 'Error al actualizar reserva', error });
  }
});

export default router;