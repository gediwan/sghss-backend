const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Paciente = require('../models/Paciente');

router.post('/register', async (req, res) => {
  try {
    const { nome, cpf, email, senha } = req.body;
    const hashed = await bcrypt.hash(senha, 10);
    const paciente = new Paciente({ nome, cpf, email, senha: hashed });
    await paciente.save();
    res.status(201).json({ message: 'Paciente cadastrado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const paciente = await Paciente.findOne({ email });
    if (!paciente || !await bcrypt.compare(senha, paciente.senha)) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const token = jwt.sign({ id: paciente._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
