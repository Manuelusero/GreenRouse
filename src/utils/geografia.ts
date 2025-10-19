// Utilidades para manejo de ubicación geográfica y estaciones

export interface PaisInfo {
  nombre: string
  hemisferio: 'norte' | 'sur'
  codigo: string
}

// Mapeo de países con información geográfica
export const paisesInfo: Record<string, PaisInfo> = {
  // Hemisferio Norte
  'mexico': { nombre: 'México', hemisferio: 'norte', codigo: 'MX' },
  'estados-unidos': { nombre: 'Estados Unidos', hemisferio: 'norte', codigo: 'US' },
  'canada': { nombre: 'Canadá', hemisferio: 'norte', codigo: 'CA' },
  'españa': { nombre: 'España', hemisferio: 'norte', codigo: 'ES' },
  'francia': { nombre: 'Francia', hemisferio: 'norte', codigo: 'FR' },
  'alemania': { nombre: 'Alemania', hemisferio: 'norte', codigo: 'DE' },
  'italia': { nombre: 'Italia', hemisferio: 'norte', codigo: 'IT' },
  'reino-unido': { nombre: 'Reino Unido', hemisferio: 'norte', codigo: 'GB' },
  'china': { nombre: 'China', hemisferio: 'norte', codigo: 'CN' },
  'japon': { nombre: 'Japón', hemisferio: 'norte', codigo: 'JP' },
  
  // Hemisferio Sur
  'argentina': { nombre: 'Argentina', hemisferio: 'sur', codigo: 'AR' },
  'chile': { nombre: 'Chile', hemisferio: 'sur', codigo: 'CL' },
  'brasil': { nombre: 'Brasil', hemisferio: 'sur', codigo: 'BR' },
  'peru': { nombre: 'Perú', hemisferio: 'sur', codigo: 'PE' },
  'colombia': { nombre: 'Colombia', hemisferio: 'norte', codigo: 'CO' }, // Aunque está en el ecuador, la mayoría está en el norte
  'ecuador': { nombre: 'Ecuador', hemisferio: 'sur', codigo: 'EC' }, // Línea ecuatorial, pero consideramos sur para estaciones
  'uruguay': { nombre: 'Uruguay', hemisferio: 'sur', codigo: 'UY' },
  'bolivia': { nombre: 'Bolivia', hemisferio: 'sur', codigo: 'BO' },
  'paraguay': { nombre: 'Paraguay', hemisferio: 'sur', codigo: 'PY' },
  'australia': { nombre: 'Australia', hemisferio: 'sur', codigo: 'AU' },
  'nueva-zelanda': { nombre: 'Nueva Zelanda', hemisferio: 'sur', codigo: 'NZ' },
  'sudafrica': { nombre: 'Sudáfrica', hemisferio: 'sur', codigo: 'ZA' }
}

/**
 * Obtiene el hemisferio basado en el código del país
 */
export function obtenerHemisferio(paisCodigo: string): 'norte' | 'sur' | null {
  const paisInfo = paisesInfo[paisCodigo]
  return paisInfo ? paisInfo.hemisferio : null
}

/**
 * Obtiene la estación actual basada en el mes y hemisferio
 */
export function obtenerEstacionActual(paisCodigo: string, mes?: number): string {
  const hemisferio = obtenerHemisferio(paisCodigo)
  if (!hemisferio) return 'desconocida'
  
  const mesActual = mes || new Date().getMonth() + 1 // JavaScript months are 0-based
  
  if (hemisferio === 'norte') {
    if (mesActual >= 3 && mesActual <= 5) return 'primavera'
    if (mesActual >= 6 && mesActual <= 8) return 'verano'
    if (mesActual >= 9 && mesActual <= 11) return 'otoño'
    return 'invierno'
  } else {
    // Hemisferio sur - estaciones invertidas
    if (mesActual >= 3 && mesActual <= 5) return 'otoño'
    if (mesActual >= 6 && mesActual <= 8) return 'invierno'
    if (mesActual >= 9 && mesActual <= 11) return 'primavera'
    return 'verano'
  }
}

/**
 * Obtiene cultivos recomendados basados en la estación y hemisferio
 */
export function obtenerCultivosEstacionales(paisCodigo: string, mes?: number): string[] {
  const estacion = obtenerEstacionActual(paisCodigo, mes)
  
  const cultivosPorEstacion: Record<string, string[]> = {
    'primavera': [
      'tomate', 'pimiento', 'pepino', 'calabacín', 'berenjena',
      'lechuga', 'espinaca', 'rábano', 'zanahoria', 'perejil',
      'albahaca', 'cilantro', 'apio'
    ],
    'verano': [
      'tomate', 'pimiento', 'pepino', 'calabacín', 'sandía',
      'melón', 'maíz', 'frijol', 'okra', 'girasol',
      'albahaca', 'orégano', 'tomillo'
    ],
    'otoño': [
      'lechuga', 'espinaca', 'col', 'brócoli', 'coliflor',
      'rábano', 'zanahoria', 'remolacha', 'cebolla', 'ajo',
      'perejil', 'cilantro', 'apio'
    ],
    'invierno': [
      'col', 'brócoli', 'coliflor', 'espinaca', 'lechuga de invierno',
      'cebolla', 'ajo', 'puerro', 'habas', 'guisantes',
      'perejil', 'cilantro', 'romero'
    ]
  }
  
  return cultivosPorEstacion[estacion] || []
}

/**
 * Obtiene recomendaciones específicas para la ubicación
 */
export function obtenerRecomendacionesUbicacion(paisCodigo: string): {
  cultivos: string[]
  consejos: string[]
  estacionActual: string
} {
  const estacionActual = obtenerEstacionActual(paisCodigo)
  const cultivos = obtenerCultivosEstacionales(paisCodigo)
  
  const consejos = [
    `En ${estacionActual}, es ideal plantar: ${cultivos.slice(0, 3).join(', ')}`,
    `Tu hemisferio es ${obtenerHemisferio(paisCodigo)}, las estaciones están ${obtenerHemisferio(paisCodigo) === 'sur' ? 'invertidas' : 'normales'}`,
    'Considera el clima local de tu ciudad para ajustar los tiempos de siembra'
  ]
  
  return {
    cultivos,
    consejos,
    estacionActual
  }
}