import mongoose from 'mongoose'

const ParcelaSchema = new mongoose.Schema({
  // Compatibilidad con el sistema anterior
  usuarioEmail: {
    type: String
  },
  // Nuevo sistema con usuario_id
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: function() {
      return !this.usuarioEmail
    }
  },
  nombre: {
    type: String,
    required: [true, 'El nombre de la parcela es requerido'],
    trim: true,
    maxLength: [100, 'El nombre no puede exceder 100 caracteres']
  },
  descripcion: {
    type: String,
    trim: true,
    maxLength: [500, 'La descripción no puede exceder 500 caracteres']
  },
  // Compatibilidad con área anterior
  area: {
    type: Number,
    min: [0.1, 'El área mínima es 0.1 m²'],
    max: [100000, 'El área máxima es 100000 m²']
  },
  // Nuevos campos
  tipo: {
    type: String,
    enum: ['balcon', 'patio', 'jardin', 'terreno', 'interior', 'exterior', 'mixto', 'manual'],
    default: 'mixto'
  },
  tamaño: {
    type: String,
    enum: ['pequeño', 'mediano', 'grande', 'muy-grande', 'personalizado'],
    default: 'mediano'
  },
  ubicacion: {
    type: String,
    enum: ['interior', 'sombra', 'semisombra', 'sol'],
    default: 'sol'
  },
  clima: {
    type: String,
    enum: ['tropical', 'subtropical', 'templado', 'frio', 'desertico'],
    default: 'templado'
  },
  // Dimensiones personalizadas
  dimensiones: {
    largo: Number, // cm
    ancho: Number, // cm
    area: Number   // m² calculado
  },
  // Compatibilidad con cultivos anterior
  cultivos: [{
    type: String,
    trim: true
  }],
  // Nuevos campos para cultivos
  objetivos: [{
    type: String,
    enum: ['alimentos', 'hierbas', 'flores', 'medicina', 'hobby', 'sostenible']
  }],
  plantas_deseadas: [String],
  // Fechas
  fechaSiembra: {
    type: Date,
    default: Date.now
  },
  fecha_creacion: {
    type: Date,
    default: Date.now
  },
  // Estados
  estado: {
    type: String,
    enum: ['planificando', 'preparando', 'plantado', 'creciendo', 'madurando', 'cosecha', 'Preparando', 'Plantado', 'Creciendo', 'Madurando', 'Cosecha'],
    default: 'planificando'
  },
  riego: {
    type: String,
    enum: ['Diario', 'Cada 2 días', 'Cada 3 días', 'Semanal'],
    default: 'Diario'
  },
  // Configuración inicial del onboarding
  configuracion_inicial: {
    experiencia: String,
    tiempo_disponible: String,
    espacio_original: String,
    ubicacion_luz: String,
    desde_onboarding: { type: Boolean, default: false },
    parcela_manual: { type: Boolean, default: false },
    cultivo_inicial: String,
    fecha_onboarding: Date
  }
}, {
  timestamps: true
})

// Índices para optimizar búsquedas
ParcelaSchema.index({ usuarioEmail: 1 })
ParcelaSchema.index({ estado: 1 })

export default mongoose.models.Parcela || mongoose.model('Parcela', ParcelaSchema)