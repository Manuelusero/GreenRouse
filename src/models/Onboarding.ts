import mongoose from 'mongoose'

const OnboardingSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
    unique: true
  },
  completado: {
    type: Boolean,
    default: false
  },
  paso_actual: {
    type: Number,
    default: 1,
    min: 1,
    max: 9
  },
  datos: {
    nombre: String,
    experiencia: {
      type: String,
      enum: ['principiante', 'basico', 'intermedio', 'avanzado']
    },
    espacio: {
      type: String,
      enum: ['balcon', 'patio', 'jardin', 'terreno']
    },
    ubicacion: {
      type: String,
      enum: ['interior', 'sombra', 'semisombra', 'sol']
    },
    objetivos: [{
      type: String,
      enum: ['alimentos', 'hierbas', 'flores', 'medicina', 'hobby', 'sostenible']
    }],
    tiempo: {
      type: String,
      enum: ['poco', 'moderado', 'bastante', 'mucho']
    },
    // Nuevos campos geográficos para recomendaciones estacionales
    pais: {
      type: String,
      enum: ['mexico', 'estados-unidos', 'canada', 'españa', 'francia', 'alemania', 'italia', 'reino-unido', 'china', 'japon', 'argentina', 'chile', 'brasil', 'peru', 'colombia', 'ecuador', 'uruguay', 'bolivia', 'paraguay', 'australia', 'nueva-zelanda', 'sudafrica']
    },
    ubicacionGeografica: String, // Ciudad específica para clima local
    cultivos_seleccionados: [String],
    parcelas: [{
      nombre: String,
      largo: Number,
      ancho: Number,
      cultivo: String
    }]
  },
  fecha_inicio: {
    type: Date,
    default: Date.now
  },
  fecha_completado: Date,
  parcelas_creadas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parcela'
  }],
  configuracion_recomendada: {
    cultivos_sugeridos: [String],
    nivel_dificultad: {
      type: String,
      enum: ['fácil', 'medio', 'difícil']
    },
    tiempo_estimado_setup: String,
    consejos_personalizados: [String]
  }
}, {
  timestamps: true
})

// Middleware para actualizar fecha de completado
OnboardingSchema.pre('save', function(next) {
  if (this.completado && !this.fecha_completado) {
    this.fecha_completado = new Date()
  }
  next()
})

// Índices
OnboardingSchema.index({ usuario_id: 1 })
OnboardingSchema.index({ completado: 1 })

export default mongoose.models.Onboarding || mongoose.model('Onboarding', OnboardingSchema)