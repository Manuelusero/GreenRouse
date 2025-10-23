import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Parcela from '@/models/Parcela'
import Usuario from '@/models/Usuario'

// GET /api/parcelas - Obtener todas las parcelas del usuario
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ error: 'Usuario requerido' }, { status: 400 })
    }
    
    // Buscar usuario por email
    const usuario = await Usuario.findOne({ email: userId })
    if (!usuario) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }
    
    // Buscar parcelas del usuario
    const parcelas = await Parcela.find({ usuarioEmail: userId })
      .select('-__v')
      .sort({ createdAt: -1 })
    
    return NextResponse.json(parcelas)
  } catch (error: any) {
    console.error('Error obteniendo parcelas:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    
    // Estructura nueva para creación automática
    const { 
      nombre, 
      descripcion, 
      tipo, 
      tamaño, 
      ubicacion, 
      clima, 
      objetivos, 
      plantas_deseadas, 
      usuario_id,
      configuracion_inicial,
      // Estructura legacy
      usuarioEmail, 
      area, 
      cultivos, 
      fechaSiembra, 
      estado, 
      riego 
    } = body
    
    // Determinar si es creación automática o manual
    const esCreacionAutomatica = !!configuracion_inicial?.generado_automaticamente
    
    let parcelaData: any = {}
    
    if (esCreacionAutomatica) {
      // Creación automática desde el perfil
      if (!usuario_id || !nombre || !plantas_deseadas) {
        return NextResponse.json({ error: 'Datos de parcela automática incompletos' }, { status: 400 })
      }
      
      // Buscar usuario por ID
      const usuario = await Usuario.findById(usuario_id)
      if (!usuario) {
        return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
      }
      
      parcelaData = {
        usuarioEmail: usuario.email,
        nombre,
        descripcion: descripcion || `Parcela generada automáticamente: ${nombre}`,
        area: tamaño === 'pequeño' ? 5 : tamaño === 'mediano' ? 15 : tamaño === 'grande' ? 30 : 50,
        cultivos: plantas_deseadas || [],
        tipo: tipo || 'mixta',
        ubicacion: ubicacion || 'Sin especificar',
        clima: clima || 'automatico',
        objetivosString: Array.isArray(objetivos) ? objetivos.join(', ') : objetivos || '',
        fechaSiembra: new Date(),
        estado: 'Planificando',
        riego: configuracion_inicial.tiempo_mantenimiento === 'bajo' ? 'Cada 2 días' : 
               configuracion_inicial.tiempo_mantenimiento === 'medio' ? 'Diario' : 'Intensivo',
        configuracionInicial: configuracion_inicial,
        generadoAutomaticamente: true
      }
    } else {
      // Creación manual (estructura legacy)
      if (!usuarioEmail || !nombre || !area) {
        return NextResponse.json({ error: 'Todos los campos requeridos' }, { status: 400 })
      }

      // Verificar que el usuario existe
      const usuario = await Usuario.findOne({ email: usuarioEmail })
      if (!usuario) {
        return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
      }

      parcelaData = {
        usuarioEmail,
        nombre,
        area: parseInt(area),
        cultivos: cultivos || [],
        fechaSiembra: fechaSiembra || new Date(),
        estado: estado || 'Preparando',
        riego: riego || 'Diario',
        generadoAutomaticamente: false
      }
    }

    // Crear nueva parcela
    const nuevaParcela = await Parcela.create(parcelaData)

    return NextResponse.json(nuevaParcela, { status: 201 })

  } catch (error: any) {
    console.error('Error creando parcela:', error)
    
    // Errores de validación de Mongoose
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json({ error: errorMessages[0] }, { status: 400 })
    }

    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}