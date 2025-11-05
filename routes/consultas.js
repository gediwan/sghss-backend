const express = require('express');
const router = express.Router();
const Consulta = require('../models/Consulta');
const auth = require('../middleware/auth');

// Agendar consulta (protegido)
router.post('/', auth, async (req, res) => {
  try {
    const consulta = new Consulta(req.body);
    await consulta.save();
    res.status(201).json(consulta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listar consultas do paciente (protegido)
router.get('/:pacienteId', auth, async (req, res) => {
  try {
    const consultas = await Consulta.find({ pacienteId: req.params.pacienteId });
    res.json(consultas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
