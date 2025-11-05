const mongoose = require('mongoose');

const PacienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  historico: [{ tipo: String, data: Date, descricao: String }]
});

module.exports = mongoose.model('Paciente', PacienteSchema);
