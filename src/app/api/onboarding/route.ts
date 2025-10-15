import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Onboarding from '@/models/Onboarding'
import Usuario from '@/models/Usuario'

// GET /api/onboarding?usuario_id=xxx - Obtener onboarding de usuario
// POST /api/onboarding - Crear/actualizar onboarding
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const usuario_id = searchParams.get('usuario_id')
    
    if (!usuario_id) {
      return NextResponse.json({
        success: false,
        error: 'usuario_id es requerido'
      }, { status: 400 })
    }
    
    const onboarding = await Onboarding.findOne({ usuario_id })
      .populate('usuario_id', 'nombre email')
    
    if (!onboarding) {
      return NextResponse.json({
        success: false,
        error: 'Onboarding no encontrado'
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: true,
      data: onboarding
    })
  } catch (error: any) {
    console.error('Error obteniendo onboarding:', error)
    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    
    const { usuario_id, paso_actual, datos, completado } = body
    
    if (!usuario_id) {
      return NextResponse.json({
        success: false,
        error: 'usuario_id es requerido'
      }, { status: 400 })
    }

    // Verificar que el usuario existe
    const usuario = await Usuario.findById(usuario_id)
    if (!usuario) {
      return NextResponse.json({
        success: false,
        error: 'Usuario no encontrado'
      }, { status: 404 })
    }

    // Buscar onboarding existente o crear nuevo
    let onboarding = await Onboarding.findOne({ usuario_id })
    
    if (onboarding) {
      // Actualizar onboarding existente
      onboarding.paso_actual = paso_actual || onboarding.paso_actual
      onboarding.datos = { ...onboarding.datos, ...datos }
      onboarding.completado = completado !== undefined ? completado : onboarding.completado
      
      if (completado && !onboarding.fecha_completado) {
        onboarding.fecha_completado = new Date()
        
        // Si se completa, actualizar datos del usuario
        if (datos) {
          await Usuario.findByIdAndUpdate(usuario_id, {
            experiencia: datos.experiencia || usuario.experiencia,
            espacio: datos.espacio || usuario.espacio,
            ubicacion: datos.ubicacion || usuario.ubicacion,
            objetivos: datos.objetivos || usuario.objetivos,
            tiempo: datos.tiempo || usuario.tiempo
          })
        }
      }
      
      await onboarding.save()
    } else {
      // Crear nuevo onboarding
      onboarding = await Onboarding.create({
        usuario_id,
        paso_actual: paso_actual || 1,
        datos: datos || {},
        completado: completado || false,
        fecha_inicio: new Date()
      })
    }

    await onboarding.populate('usuario_id', 'nombre email')

    return NextResponse.json({
      success: true,
      data: onboarding,
      message: onboarding.completado ? 'Onboarding completado' : 'Onboarding actualizado'
    })

  } catch (error: any) {
    console.error('Error procesando onboarding:', error)
    
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json({
        success: false,
        error: errorMessages[0]
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 })
  }
}