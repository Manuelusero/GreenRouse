import mongoose from 'mongoose'

const SeguimientoSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  parcela_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parcela',
    required: true
  },
  tipo_evento: {
    type: String,
    required: true,
    enum: [
      'plantacion',
      'riego',
      'fertilizacion',
      'poda',
      'cosecha',
      'control_plagas',
      'observacion',
      'problema',
      'nota'
    ]
  },
  cultivo_afectado: String,
  descripcion: {
    type: String,
    required: true,
    maxLength: [500, 'La descripción no puede exceder 500 caracteres']
  },
  fotos: [{
    url: String,
    descripcion: String,
    fecha: {
      type: Date,
      default: Date.now
    }
  }],
  datos_especificos: {
    // Para riego
    cantidad_agua: Number,
    duracion_minutos: Number,
    
    // Para fertilización
    tipo_fertilizante: String,
    cantidad_aplicada: String,
    
    // Para cosecha
    cantidad_cosechada: Number,
    calidad: {
      type: String,
      enum: ['excelente', 'buena', 'regular', 'mala']
    },
    
    // Para problemas/plagas
    tipo_problema: String,
    gravedad: {
      type: String,
      enum: ['leve', 'moderado', 'grave', 'crítico']
    },
    solucion_aplicada: String
  },
  clima: {
    temperatura: Number,
    humedad: Number,
    lluvia: Boolean,
    viento: String
  },
  fecha_evento: {
    type: Date,
    default: Date.now
  },
  recordatorio_siguiente: {
    fecha: Date,
    tipo: String,
    descripcion: String,
    completado: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
})

// Índices para optimizar búsquedas
SeguimientoSchema.index({ usuario_id: 1, fecha_evento: -1 })
SeguimientoSchema.index({ parcela_id: 1, tipo_evento: 1 })
SeguimientoSchema.index({ 'recordatorio_siguiente.fecha': 1, 'recordatorio_siguiente.completado': 1 })

export default mongoose.models.Seguimiento || mongoose.model('Seguimiento', SeguimientoSchema)