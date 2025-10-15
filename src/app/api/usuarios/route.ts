import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Usuario from '@/models/Usuario'

// GET /api/usuarios - Obtener todos los usuarios
// POST /api/usuarios - Crear nuevo usuario
export async function GET() {
  try {
    await connectDB()
    const usuarios = await Usuario.find({}).select('-__v').sort({ createdAt: -1 })
    
    return NextResponse.json({
      success: true,
      data: usuarios,
      count: usuarios.length
    })
  } catch (error: any) {
    console.error('Error obteniendo usuarios:', error)
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
    
    // Validar datos requeridos
    const { nombre, email, experiencia, espacio, ubicacion, objetivos, tiempo } = body
    
    if (!nombre || !email || !experiencia || !espacio || !ubicacion || !objetivos || !tiempo) {
      return NextResponse.json({
        success: false,
        error: 'Todos los campos son requeridos'
      }, { status: 400 })
    }

    // Verificar si el email ya existe
    const usuarioExistente = await Usuario.findOne({ email: email.toLowerCase() })
    if (usuarioExistente) {
      return NextResponse.json({
        success: false,
        error: 'Ya existe un usuario con este email'
      }, { status: 400 })
    }

    // Crear nuevo usuario
    const nuevoUsuario = await Usuario.create({
      nombre,
      email: email.toLowerCase(),
      experiencia,
      espacio,
      ubicacion,
      objetivos,
      tiempo,
      perfil: body.perfil || {}
    })

    return NextResponse.json({
      success: true,
      data: nuevoUsuario,
      message: 'Usuario creado exitosamente'
    }, { status: 201 })

  } catch (error: any) {
    console.error('Error creando usuario:', error)
    
    // Errores de validación de Mongoose
    if (error.name === 'ValidationError') {
      const errorMessages = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json({
        success: false,
        error: errorMessages[0]
      }, { status: 400 })
    }

    // Error de duplicado (email único)
    if (error.code === 11000) {
      return NextResponse.json({
        success: false,
        error: 'Ya existe un usuario con este email'
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      error: 'Error interno del servidor'
    }, { status: 500 })
  }
}