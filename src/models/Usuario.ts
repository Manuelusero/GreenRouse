import mongoose from 'mongoose'

const UsuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    maxLength: [50, 'El nombre no puede exceder 50 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
  },
  password: {
    type: String,
    required: function(this: any) {
      return !this.provider || this.provider === 'credentials'
    },
    minLength: [6, 'La contraseña debe tener al menos 6 caracteres']
  },
  provider: {
    type: String,
    enum: ['credentials', 'google', 'github'],
    default: 'credentials'
  },
  avatar: {
    type: String,
    default: null
  },
  experiencia: {
    type: String,
    required: true,
    enum: ['principiante', 'basico', 'intermedio', 'avanzado'],
    default: 'principiante'
  },
  espacio: {
    type: String,
    required: true,
    enum: ['balcon', 'patio', 'jardin', 'terreno']
  },
  ubicacion: {
    type: String,
    required: true,
    enum: ['interior', 'sombra', 'semisombra', 'sol']
  },
  objetivos: [{
    type: String,
    enum: ['alimentos', 'hierbas', 'flores', 'medicina', 'hobby', 'sostenible']
  }],
  tiempo: {
    type: String,
    required: true,
    enum: ['poco', 'moderado', 'bastante', 'mucho']
  },
  perfil: {
    cultivos_preferidos: [String],
    notificaciones: {
      type: Boolean,
      default: true
    },
    tema: {
      type: String,
      enum: ['claro', 'oscuro'],
      default: 'claro'
    }
  }
}, {
  timestamps: true
})

// Índices para optimizar búsquedas
UsuarioSchema.index({ email: 1 })
UsuarioSchema.index({ experiencia: 1, espacio: 1 })

export default mongoose.models.Usuario || mongoose.model('Usuario', UsuarioSchema)