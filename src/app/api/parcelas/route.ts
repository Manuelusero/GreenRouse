import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
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
    
    console.log('📝 Datos recibidos en API parcelas:', JSON.stringify(body, null, 2))
    
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
      const usuarioObjectId = new mongoose.Types.ObjectId(usuario_id)
      const usuario = await Usuario.findById(usuarioObjectId)
      if (!usuario) {
        console.error('❌ Usuario no encontrado con ID:', usuario_id)
        return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
      }
      
      console.log('👤 Usuario encontrado:', usuario.email)

      parcelaData = {
        usuarioEmail: usuario.email,
        usuario_id: usuarioObjectId, // Usar ObjectId convertido
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
      console.log('🔍 Buscando usuario con email:', usuarioEmail)
      const usuario = await Usuario.findOne({ email: usuarioEmail })
      console.log('👤 Usuario encontrado:', usuario ? 'SÍ' : 'NO')
      
      if (!usuario) {
        // Intentar crear el usuario si no existe
        console.log('⚠️ Usuario no existe, creando nuevo usuario...')
        try {
          const nuevoUsuario = await Usuario.create({
            email: usuarioEmail,
            nombre: usuarioEmail.split('@')[0],
            provider: 'google'
          })
          console.log('✅ Usuario creado:', nuevoUsuario.email)
        } catch (createError) {
          console.error('❌ Error creando usuario:', createError)
          return NextResponse.json({ error: 'Error creando usuario' }, { status: 500 })
        }
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

    console.log('💾 Datos de parcela a crear:', JSON.stringify(parcelaData, null, 2))

    // Crear nueva parcela
    const nuevaParcela = await Parcela.create(parcelaData)

    console.log('✅ Parcela creada exitosamente:', nuevaParcela._id)
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