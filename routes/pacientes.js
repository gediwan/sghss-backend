const express = require('express');
const router = express.Router();
const Paciente = require('../models/Paciente');
const auth = require('../middleware/auth');

// Listar todos os pacientes (protegido)
router.get('/', auth, async (req, res) => {
  try {
    const pacientes = await Paciente.find().select('-senha');
    res.json(pacientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cadastrar novo paciente (protegido - admin ou médico)
router.post('/', auth, async (req, res) => {
  try {
    const paciente = new Paciente(req.body);
    await paciente.save();
    res.status(201).json(paciente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
