import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Parcela from '@/models/Parcela'
import { cultivosDatabase } from '@/data/cultivos'

// GET /api/parcelas - Obtener todas las parcelas
// POST /api/parcelas - Crear nueva parcela
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const usuario_id = searchParams.get('usuario_id')
    
    let query = {}
    if (usuario_id) {
      query = { usuario_id }
    }
    
    const parcelas = await Parcela.find(query)
      .populate('usuario_id', 'nombre email')
      .select('-__v')
      .sort({ createdAt: -1 })
    
    return NextResponse.json({
      success: true,
      data: parcelas,
      count: parcelas.length
    })
  } catch (error: any) {
    console.error('Error obteniendo parcelas:', error)
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
    const { usuario_id, nombre, dimensiones, cultivo_principal } = body
    
    if (!usuario_id || !nombre || !dimensiones || !cultivo_principal) {
      return NextResponse.json({
        success: false,
        error: 'Todos los campos son requeridos'
      }, { status: 400 })
    }

    if (!dimensiones.largo || !dimensiones.ancho) {
      return NextResponse.json({
        success: false,
        error: 'Las dimensiones (largo y ancho) son requeridas'
      }, { status: 400 })
    }

    // Calcular área
    const area_m2 = (dimensiones.largo * dimensiones.ancho) / 10000

    // Preparar datos de plantas si se especifica un cultivo conocido
    let plantas: any[] = []
    if (cultivosDatabase[cultivo_principal as keyof typeof cultivosDatabase]) {
      const cultivo = cultivosDatabase[cultivo_principal as keyof typeof cultivosDatabase]
      const plantasPorM2 = Math.round(10000 / (cultivo.distancia * cultivo.distancia))
      const cantidadTotal = Math.floor(area_m2 * plantasPorM2)
      
      plantas = [{
        cultivo_key: cultivo_principal,
        cantidad: cantidadTotal,
        estado: 'planificado'
      }]
    }

    // Crear nueva parcela
    const nuevaParcela = await Parcela.create({
      usuario_id,
      nombre,
      dimensiones,
      area_m2,
      cultivo_principal,
      plantas,
      ubicacion: body.ubicacion || {},
      estado: 'planificada',
      configuracion: body.configuracion || {}
    })

    // Poblar el usuario para la respuesta
    await nuevaParcela.populate('usuario_id', 'nombre email')

    return NextResponse.json({
      success: true,
      data: nuevaParcela,
      message: 'Parcela creada exitosamente'
    }, { status: 201 })

  } catch (error: any) {
    console.error('Error creando parcela:', error)
    
    // Errores de validación de Mongoose
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