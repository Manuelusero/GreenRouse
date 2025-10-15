import mongoose from 'mongoose'

const ParcelaSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  nombre: {
    type: String,
    required: [true, 'El nombre de la parcela es requerido'],
    trim: true,
    maxLength: [50, 'El nombre no puede exceder 50 caracteres']
  },
  dimensiones: {
    largo: {
      type: Number,
      required: true,
      min: [10, 'El largo mínimo es 10 cm'],
      max: [10000, 'El largo máximo es 10 metros']
    },
    ancho: {
      type: Number,
      required: true,
      min: [10, 'El ancho mínimo es 10 cm'],
      max: [10000, 'El ancho máximo es 10 metros']
    }
  },
  area_m2: {
    type: Number,
    required: true
  },
  cultivo_principal: {
    type: String,
    required: true,
    trim: true
  },
  plantas: [{
    cultivo_key: {
      type: String,
      required: true
    },
    cantidad: {
      type: Number,
      required: true,
      min: 0
    },
    fecha_plantacion: Date,
    fecha_estimada_cosecha: Date,
    estado: {
      type: String,
      enum: ['planificado', 'plantado', 'germinando', 'creciendo', 'floracion', 'cosecha', 'terminado'],
      default: 'planificado'
    },
    notas: String
  }],
  ubicacion: {
    descripcion: String,
    coordenadas: {
      latitud: Number,
      longitud: Number
    },
    luz_solar: {
      type: String,
      enum: ['interior', 'sombra', 'semisombra', 'sol']
    }
  },
  estado: {
    type: String,
    enum: ['activa', 'inactiva', 'planificada', 'cosechada'],
    default: 'planificada'
  },
  configuracion: {
    riego: {
      frecuencia: String,
      ultima_fecha: Date
    },
    fertilizacion: {
      tipo: String,
      ultima_fecha: Date
    },
    control_plagas: {
      metodo: String,
      ultima_aplicacion: Date
    }
  }
}, {
  timestamps: true
})

// Middleware para calcular área automáticamente
ParcelaSchema.pre('save', function(next) {
  if (this.dimensiones && this.dimensiones.largo && this.dimensiones.ancho) {
    this.area_m2 = (this.dimensiones.largo * this.dimensiones.ancho) / 10000
  }
  next()
})

// Índices para optimizar búsquedas
ParcelaSchema.index({ usuario_id: 1 })
ParcelaSchema.index({ estado: 1 })
ParcelaSchema.index({ cultivo_principal: 1 })

export default mongoose.models.Parcela || mongoose.model('Parcela', ParcelaSchema)