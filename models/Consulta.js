const mongoose = require('mongoose');

const ConsultaSchema = new mongoose.Schema({
  pacienteId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Paciente', 
    required: true 
  },
  medico: { type: String, required: true },
  data: { type: Date, required: true },
  status: { type: String, default: 'agendada' }
});

module.exports = mongoose.model('Consulta', ConsultaSchema);
