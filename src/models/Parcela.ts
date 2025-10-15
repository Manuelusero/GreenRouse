import mongoose from 'mongoose'

const ParcelaSchema = new mongoose.Schema({
  usuarioEmail: {
    type: String,
    required: [true, 'El email del usuario es requerido']
  },
  nombre: {
    type: String,
    required: [true, 'El nombre de la parcela es requerido'],
    trim: true,
    maxLength: [50, 'El nombre no puede exceder 50 caracteres']
  },
  area: {
    type: Number,
    required: [true, 'El área es requerida'],
    min: [1, 'El área mínima es 1 m²'],
    max: [10000, 'El área máxima es 10000 m²']
  },
  cultivos: [{
    type: String,
    trim: true
  }],
  fechaSiembra: {
    type: Date,
    default: Date.now
  },
  estado: {
    type: String,
    enum: ['Preparando', 'Plantado', 'Creciendo', 'Madurando', 'Cosecha'],
    default: 'Preparando'
  },
  riego: {
    type: String,
    enum: ['Diario', 'Cada 2 días', 'Cada 3 días', 'Semanal'],
    default: 'Diario'
  }
}, {
  timestamps: true
})

// Índices para optimizar búsquedas
ParcelaSchema.index({ usuarioEmail: 1 })
ParcelaSchema.index({ estado: 1 })

export default mongoose.models.Parcela || mongoose.model('Parcela', ParcelaSchema)