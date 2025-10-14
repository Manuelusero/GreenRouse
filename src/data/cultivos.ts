// Base de datos completa de cultivos
export const cultivosDatabase = {
  lechuga: { nombre: 'Lechuga', icono: '🥬', distancia: 25, dias: '45-60', dificultad: 'Fácil', categoria: 'Hojas Verdes' },
  tomate: { nombre: 'Tomate', icono: '🍅', distancia: 60, dias: '80-100', dificultad: 'Media', categoria: 'Frutos' },
  'tomate-cherry': { nombre: 'Tomate Cherry', icono: '🍅', distancia: 40, dias: '70-80', dificultad: 'Media', categoria: 'Frutos' },
  pimiento: { nombre: 'Pimiento', icono: '🌶️', distancia: 50, dias: '70-90', dificultad: 'Media', categoria: 'Frutos' },
  zanahoria: { nombre: 'Zanahoria', icono: '🥕', distancia: 15, dias: '70-80', dificultad: 'Fácil', categoria: 'Raíces' },
  rabanito: { nombre: 'Rabanito', icono: '🔴', distancia: 10, dias: '25-30', dificultad: 'Muy fácil', categoria: 'Raíces' },
  espinaca: { nombre: 'Espinaca', icono: '🥬', distancia: 20, dias: '40-50', dificultad: 'Fácil', categoria: 'Hojas Verdes' },
  albahaca: { nombre: 'Albahaca', icono: '🌿', distancia: 25, dias: '60-90', dificultad: 'Fácil', categoria: 'Aromáticas' },
  perejil: { nombre: 'Perejil', icono: '🌿', distancia: 15, dias: '70-90', dificultad: 'Fácil', categoria: 'Aromáticas' },
  cilantro: { nombre: 'Cilantro', icono: '🌿', distancia: 15, dias: '50-70', dificultad: 'Fácil', categoria: 'Aromáticas' },
  cebolla: { nombre: 'Cebolla', icono: '🧅', distancia: 15, dias: '90-120', dificultad: 'Media', categoria: 'Bulbos' },
  ajo: { nombre: 'Ajo', icono: '🧄', distancia: 10, dias: '180-240', dificultad: 'Fácil', categoria: 'Bulbos' },
  apio: { nombre: 'Apio', icono: '🥬', distancia: 30, dias: '85-120', dificultad: 'Media', categoria: 'Hojas Verdes' },
  brócoli: { nombre: 'Brócoli', icono: '🥦', distancia: 45, dias: '70-100', dificultad: 'Media', categoria: 'Otros' },
  coliflor: { nombre: 'Coliflor', icono: '🥬', distancia: 50, dias: '75-100', dificultad: 'Media', categoria: 'Otros' },
  acelga: { nombre: 'Acelga', icono: '🥬', distancia: 25, dias: '50-70', dificultad: 'Fácil', categoria: 'Hojas Verdes' },
  rúcula: { nombre: 'Rúcula', icono: '🥬', distancia: 15, dias: '30-40', dificultad: 'Muy fácil', categoria: 'Hojas Verdes' },
  pepino: { nombre: 'Pepino', icono: '🥒', distancia: 60, dias: '55-70', dificultad: 'Media', categoria: 'Frutos' },
  calabacín: { nombre: 'Calabacín', icono: '🥒', distancia: 90, dias: '50-65', dificultad: 'Fácil', categoria: 'Frutos' },
  berenjena: { nombre: 'Berenjena', icono: '🍆', distancia: 60, dias: '80-100', dificultad: 'Media', categoria: 'Frutos' },
  papa: { nombre: 'Papa', icono: '🥔', distancia: 30, dias: '70-120', dificultad: 'Fácil', categoria: 'Raíces' },
  batata: { nombre: 'Batata', icono: '🍠', distancia: 35, dias: '90-120', dificultad: 'Media', categoria: 'Raíces' },
  remolacha: { nombre: 'Remolacha', icono: '🔴', distancia: 20, dias: '55-70', dificultad: 'Fácil', categoria: 'Raíces' },
  nabo: { nombre: 'Nabo', icono: '⚪', distancia: 20, dias: '45-60', dificultad: 'Fácil', categoria: 'Raíces' },
  choclo: { nombre: 'Choclo/Maíz', icono: '🌽', distancia: 25, dias: '60-100', dificultad: 'Media', categoria: 'Otros' },
  arvejas: { nombre: 'Arvejas', icono: '🟢', distancia: 10, dias: '60-70', dificultad: 'Fácil', categoria: 'Otros' },
  habas: { nombre: 'Habas', icono: '🟢', distancia: 20, dias: '80-100', dificultad: 'Fácil', categoria: 'Otros' },
  porotos: { nombre: 'Porotos', icono: '🫘', distancia: 15, dias: '50-70', dificultad: 'Fácil', categoria: 'Otros' },
  romero: { nombre: 'Romero', icono: '🌿', distancia: 60, dias: '365+', dificultad: 'Fácil', categoria: 'Aromáticas' },
  tomillo: { nombre: 'Tomillo', icono: '🌿', distancia: 30, dias: '365+', dificultad: 'Fácil', categoria: 'Aromáticas' },
  orégano: { nombre: 'Orégano', icono: '🌿', distancia: 25, dias: '365+', dificultad: 'Fácil', categoria: 'Aromáticas' },
  menta: { nombre: 'Menta', icono: '🌿', distancia: 30, dias: '365+', dificultad: 'Muy fácil', categoria: 'Aromáticas' }
} as const

export type CultivoKey = keyof typeof cultivosDatabase
export type CultivoData = typeof cultivosDatabase[CultivoKey]

// Función para obtener cultivos organizados por categoría
export const getCultivosByCategoria = () => {
  const categorias: Record<string, Array<{key: CultivoKey, data: CultivoData}>> = {}
  
  Object.entries(cultivosDatabase).forEach(([key, data]) => {
    const categoria = data.categoria
    if (!categorias[categoria]) {
      categorias[categoria] = []
    }
    categorias[categoria].push({ key: key as CultivoKey, data })
  })
  
  return categorias
}

// Función para calcular plantas por metro cuadrado
export const calcularPlantasPorM2 = (cultivo: CultivoKey): number => {
  const distancia = cultivosDatabase[cultivo].distancia
  return Math.floor(10000 / (distancia * distancia))
}

// Función para obtener recomendaciones basadas en perfil
export const getCultivosRecomendados = (perfil: {
  experiencia: string
  espacio: string
  ubicacion: string
}): Array<{key: CultivoKey, data: CultivoData, motivo: string}> => {
  let recomendados: Array<{key: CultivoKey, data: CultivoData, motivo: string}> = []
  
  // Cultivos fáciles para principiantes
  if (perfil.experiencia === 'principiante') {
    recomendados.push(
      { key: 'lechuga', data: cultivosDatabase.lechuga, motivo: 'Crece rápido y es muy fácil' },
      { key: 'rabanito', data: cultivosDatabase.rabanito, motivo: 'El cultivo más rápido' },
      { key: 'espinaca', data: cultivosDatabase.espinaca, motivo: 'Resistente y nutritiva' },
      { key: 'albahaca', data: cultivosDatabase.albahaca, motivo: 'Aromática y útil' }
    )
  }
  
  // Para espacios pequeños
  if (perfil.espacio === 'balcon') {
    recomendados.push(
      { key: 'tomate-cherry', data: cultivosDatabase['tomate-cherry'], motivo: 'Perfecto para macetas' },
      { key: 'perejil', data: cultivosDatabase.perejil, motivo: 'Ideal para contenedores' }
    )
  }
  
  // Para poca luz
  if (perfil.ubicacion === 'sombra' || perfil.ubicacion === 'interior') {
    recomendados = recomendados.filter(r => 
      ['lechuga', 'espinaca', 'perejil', 'albahaca'].includes(r.key)
    )
  }
  
  // Agregar más opciones para usuarios avanzados
  if (perfil.experiencia === 'avanzado') {
    recomendados.push(
      { key: 'tomate', data: cultivosDatabase.tomate, motivo: 'Productivo y sabroso' },
      { key: 'pimiento', data: cultivosDatabase.pimiento, motivo: 'Versátil en cocina' }
    )
  }
  
  return recomendados.slice(0, 6) // Máximo 6 recomendaciones
}