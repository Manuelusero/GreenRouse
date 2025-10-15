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
    
    // Validar datos requeridos
    const { usuarioEmail, nombre, area, cultivos, fechaSiembra, estado, riego } = body
    
    if (!usuarioEmail || !nombre || !area) {
      return NextResponse.json({ error: 'Todos los campos requeridos' }, { status: 400 })
    }

    // Verificar que el usuario existe
    const usuario = await Usuario.findOne({ email: usuarioEmail })
    if (!usuario) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    // Crear nueva parcela
    const nuevaParcela = await Parcela.create({
      usuarioEmail,
      nombre,
      area: parseInt(area),
      cultivos: cultivos || [],
      fechaSiembra: fechaSiembra || new Date(),
      estado: estado || 'Preparando',
      riego: riego || 'Diario'
    })

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