'use client'

import { useState } from 'react'

interface Planta {
  nombre: string
  emoji: string
  espaciado: number // cm entre plantas
  color: string
}

interface ParcelaVisualProps {
  nombre: string
  cultivos: string[]
  area: number // m²
  onEdit?: (nuevosCultivos: string[]) => void
}

const PLANTAS_INFO: Record<string, Planta> = {
  // Hortalizas
  'lechuga': { nombre: 'Lechuga', emoji: '🥬', espaciado: 25, color: 'bg-green-100' },
  'espinaca': { nombre: 'Espinaca', emoji: '🌿', espaciado: 15, color: 'bg-green-200' },
  'tomate': { nombre: 'Tomate', emoji: '🍅', espaciado: 60, color: 'bg-red-100' },
  'pimiento': { nombre: 'Pimiento', emoji: '🌶️', espaciado: 40, color: 'bg-yellow-100' },
  'zanahoria': { nombre: 'Zanahoria', emoji: '🥕', espaciado: 15, color: 'bg-orange-100' },
  'rábano': { nombre: 'Rábano', emoji: '🫘', espaciado: 10, color: 'bg-pink-100' },
  'calabacín': { nombre: 'Calabacín', emoji: '🥒', espaciado: 80, color: 'bg-green-300' },
  'berenjena': { nombre: 'Berenjena', emoji: '🍆', espaciado: 60, color: 'bg-purple-100' },
  'pepino': { nombre: 'Pepino', emoji: '🥒', espaciado: 45, color: 'bg-green-200' },
  'brócoli': { nombre: 'Brócoli', emoji: '🥦', espaciado: 35, color: 'bg-green-400' },
  
  // Aromáticas
  'albahaca': { nombre: 'Albahaca', emoji: '🌱', espaciado: 20, color: 'bg-emerald-100' },
  'perejil': { nombre: 'Perejil', emoji: '🌿', espaciado: 15, color: 'bg-lime-100' },
  'cilantro': { nombre: 'Cilantro', emoji: '🌾', espaciado: 10, color: 'bg-teal-100' },
  'orégano': { nombre: 'Orégano', emoji: '🌿', espaciado: 25, color: 'bg-green-100' },
  'romero': { nombre: 'Romero', emoji: '🌲', espaciado: 40, color: 'bg-emerald-200' },
  'tomillo': { nombre: 'Tomillo', emoji: '🌿', espaciado: 20, color: 'bg-lime-200' },
  'menta': { nombre: 'Menta', emoji: '🍃', espaciado: 30, color: 'bg-green-100' },
  'lavanda': { nombre: 'Lavanda', emoji: '💜', espaciado: 35, color: 'bg-purple-200' },
  'cebollín': { nombre: 'Cebollín', emoji: '🌱', espaciado: 10, color: 'bg-green-300' },
  'salvia': { nombre: 'Salvia', emoji: '🌿', espaciado: 30, color: 'bg-gray-100' },
}

export default function ParcelaVisual({ nombre, cultivos, area, onEdit }: ParcelaVisualProps) {
  const [editMode, setEditMode] = useState(false)
  const [tempCultivos, setTempCultivos] = useState(cultivos || [])
  const [draggedPlant, setDraggedPlant] = useState<{ plant: string; index: number } | null>(null)
  const [plantPositions, setPlantPositions] = useState<Record<string, { x: number; y: number }>>({})
  const [selectedPosition, setSelectedPosition] = useState<{ x: number; y: number } | null>(null)
  const [selectedNewPlant, setSelectedNewPlant] = useState<string | null>(null)
  
  // Validación de datos de entrada
  const cultivosValidos = (cultivos || []).filter(cultivo => 
    cultivo && typeof cultivo === 'string' && PLANTAS_INFO[cultivo.toLowerCase()]
  )
  
  // Calcular dimensiones del grid basado en el área
  const anchoMetros = Math.sqrt(area * 1.6) // rectangular, más ancho que alto
  const altoMetros = area / anchoMetros
  const anchoCm = Math.round(anchoMetros * 100)
  const altoCm = Math.round(altoMetros * 100)
  
  // Calcular cuántas plantas de cada tipo caben realmente en el espacio
  const calcularPlantasReales = (tiposPlantas: string[]) => {
    const plantasExpandidas: string[] = []
    
    // Validar que tenemos plantas válidas
    if (!tiposPlantas.length) return plantasExpandidas
    
    // Calcular área disponible total
    const areaDisponibleCm2 = anchoCm * altoCm * 0.90 // 90% del área útil
    
    tiposPlantas.forEach(tipoPlanta => {
      const info = PLANTAS_INFO[tipoPlanta.toLowerCase()]
      if (!info || info.espaciado <= 0) return
      
      // Área que ocupa cada planta
      const areaPorPlanta = info.espaciado * info.espaciado
      
      if (areaPorPlanta <= 0) return
      
      // Distribuir área equitativamente entre tipos
      const areaParaEsteTipo = areaDisponibleCm2 / tiposPlantas.length
      let cantidadPlantas = Math.floor(areaParaEsteTipo / areaPorPlanta)
      
      // Asegurar cantidad mínima y máxima según el tipo de planta
      if (info.espaciado < 20) { // Plantas pequeñas como zanahorias
        cantidadPlantas = Math.max(15, Math.min(cantidadPlantas, 50))
      } else if (info.espaciado < 40) { // Plantas medianas
        cantidadPlantas = Math.max(8, Math.min(cantidadPlantas, 30))
      } else { // Plantas grandes
        cantidadPlantas = Math.max(3, Math.min(cantidadPlantas, 15))
      }
      
      for (let i = 0; i < cantidadPlantas; i++) {
        plantasExpandidas.push(tipoPlanta)
      }
    })
    
    return plantasExpandidas
  }

  // Generar posiciones organizadas con la cantidad real de plantas
  const generarPosiciones = (plantas: string[]) => {
    const posiciones: Array<{
      planta: string
      x: number
      y: number
      info: Planta
      numero: number
      key: string
      isCustomPosition: boolean
    }> = []
    
    // Primero agregar plantas con posiciones personalizadas
    Object.entries(plantPositions).forEach(([plantKey, position]) => {
      const plantName = plantKey.split('-')[0]
      const info = PLANTAS_INFO[plantName.toLowerCase()]
      if (info && plantas.includes(plantName)) {
        posiciones.push({
          planta: plantName,
          x: (position.x * anchoCm) / 100,
          y: (position.y * altoCm) / 100,
          info,
          numero: 1,
          key: plantKey,
          isCustomPosition: true
        })
      }
    })
    
    // Expandir la lista para mostrar la cantidad real que cabe (excluyendo las ya posicionadas)
    const plantasSinPosicion = plantas.filter(p => 
      !Object.keys(plantPositions).some(key => key.startsWith(p))
    )
    const plantasReales = calcularPlantasReales(plantasSinPosicion)
    
    // Agrupar por tamaño
    const tiposPlantas = {
      grandes: plantasReales.filter(p => {
        const info = PLANTAS_INFO[p.toLowerCase()]
        return info && info.espaciado >= 50
      }),
      medianas: plantasReales.filter(p => {
        const info = PLANTAS_INFO[p.toLowerCase()]
        return info && info.espaciado >= 20 && info.espaciado < 50
      }),
      pequeñas: plantasReales.filter(p => {
        const info = PLANTAS_INFO[p.toLowerCase()]
        return info && info.espaciado < 20
      })
    }
    
    let currentY = 20
    const margenX = 20
    
    // Función para distribuir plantas del mismo tipo (evitando posiciones ocupadas)
    const distribuirPlantas = (listaPlantas: string[], yInicial: number) => {
      if (listaPlantas.length === 0) return yInicial
      
      // Agrupar por tipo para contar
      const contadorPorTipo: { [key: string]: number } = {}
      listaPlantas.forEach(planta => {
        contadorPorTipo[planta] = (contadorPorTipo[planta] || 0) + 1
      })
      
      let currentYLocal = yInicial
      
      Object.entries(contadorPorTipo).forEach(([tipoPlanta, cantidad]) => {
        const info = PLANTAS_INFO[tipoPlanta.toLowerCase()]
        if (!info) return
        
        const espaciadoCm = Math.max(info.espaciado, 12) // Mínimo 12cm para visualización
        const espacioDisponible = anchoCm - 2 * margenX
        const plantasPorFila = Math.max(1, Math.floor(espacioDisponible / espaciadoCm))
        const filasNecesarias = Math.ceil(cantidad / plantasPorFila)
        
        for (let fila = 0; fila < filasNecesarias; fila++) {
          const plantasEnEstaFila = Math.min(plantasPorFila, cantidad - (fila * plantasPorFila))
          const espacioTotalFila = plantasEnEstaFila * espaciadoCm
          const inicioX = margenX + Math.max(0, (anchoCm - 2 * margenX - espacioTotalFila) / 2)
          
          for (let col = 0; col < plantasEnEstaFila; col++) {
            const x = inicioX + (col * espaciadoCm) + (espaciadoCm / 2)
            const y = currentYLocal + (espaciadoCm / 2)
            
            // Verificar que la planta cabe en el área visible y no interfiere con posiciones personalizadas
            const estaOcupada = posiciones.some(pos => 
              pos.isCustomPosition && 
              Math.abs(pos.x - x) < espaciadoCm/2 && 
              Math.abs(pos.y - y) < espaciadoCm/2
            )
            
            if (y + espaciadoCm/2 <= altoCm - 20 && x + espaciadoCm/2 <= anchoCm - margenX && !estaOcupada) {
              posiciones.push({
                planta: tipoPlanta,
                x: x,
                y: y,
                info: info,
                numero: fila * plantasPorFila + col + 1,
                key: `auto-${tipoPlanta}-${fila}-${col}`,
                isCustomPosition: false
              })
            }
          }
          
          currentYLocal += Math.min(espaciadoCm, 40) + 10 // Límite de altura por fila
        }
        
        currentYLocal += 15 // Separación entre tipos
      })
      
      return currentYLocal
    }
    
    // Distribuir por grupos
    if (tiposPlantas.grandes.length > 0) {
      currentY = distribuirPlantas(tiposPlantas.grandes, currentY)
    }
    
    if (tiposPlantas.medianas.length > 0) {
      currentY = distribuirPlantas(tiposPlantas.medianas, currentY)
    }
    
    if (tiposPlantas.pequeñas.length > 0) {
      distribuirPlantas(tiposPlantas.pequeñas, currentY)
    }
    
    return posiciones
  }
  
  const posiciones = generarPosiciones(editMode ? tempCultivos : cultivosValidos)
  
  const agregarPlanta = (nuevaPlanta: string) => {
    if (!tempCultivos.includes(nuevaPlanta)) {
      setTempCultivos([...tempCultivos, nuevaPlanta])
    }
  }
  
  const quitarPlanta = (planta: string, positionKey?: string) => {
    setTempCultivos(tempCultivos.filter(p => p !== planta))
    // Eliminar posición personalizada si existe
    if (positionKey && plantPositions[positionKey]) {
      const newPositions = { ...plantPositions }
      delete newPositions[positionKey]
      setPlantPositions(newPositions)
    }
  }
  
  // Función para manejar el clic en el área de parcela (colocar planta)
  const handleParcelaClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!editMode) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * anchoCm
    const y = ((e.clientY - rect.top) / rect.height) * altoCm

    // Si hay una planta nueva seleccionada, colocarla
    if (selectedNewPlant) {
      const newPlantId = `${selectedNewPlant}-${Date.now()}`
      setTempCultivos([...tempCultivos, selectedNewPlant])
      setPlantPositions(prev => ({
        ...prev,
        [newPlantId]: { x, y }
      }))
      setSelectedNewPlant(null)
    } else if (draggedPlant) {
      // Si hay una planta siendo arrastrada, moverla a la nueva posición
      const newPlantId = `${draggedPlant.plant}-${Date.now()}`
      setTempCultivos([...tempCultivos, draggedPlant.plant])
      setPlantPositions(prev => ({
        ...prev,
        [newPlantId]: { x, y }
      }))
      setDraggedPlant(null)
    }
  }  // Función para mover una planta existente
  const handlePlantDrag = (e: React.MouseEvent, pos: any, index: number) => {
    if (!editMode) return
    e.preventDefault()
    setDraggedPlant({ plant: pos.planta, index })
    
    // Add mouse move and mouse up event listeners
    const handleMouseMove = (e: MouseEvent) => {
      // Visual feedback during drag could be added here
    }
    
    const handleMouseUp = (e: MouseEvent) => {
      // Remove event listeners
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      
      // If clicking on the parcela, place the plant
      const parcelaElement = document.querySelector('[data-parcela-container]') as HTMLElement
      if (parcelaElement && draggedPlant) {
        const rect = parcelaElement.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * anchoCm
        const y = ((e.clientY - rect.top) / rect.height) * altoCm
        
        // Check if within bounds
        if (x >= 0 && x <= anchoCm && y >= 0 && y <= altoCm) {
          // Move the plant to new position
          const plantKey = `${draggedPlant.plant}-${pos.numero}-${index}`
          setPlantPositions(prev => ({
            ...prev,
            [plantKey]: { x, y }
          }))
        }
      }
      
      setDraggedPlant(null)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }
  
  const guardarCambios = () => {
    if (onEdit) {
      onEdit(tempCultivos)
    }
    setEditMode(false)
  }
  
  const plantasDisponibles = Object.keys(PLANTAS_INFO).filter(
    planta => !tempCultivos.map(c => c.toLowerCase()).includes(planta)
  )

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{nombre}</h2>
          <p className="text-gray-600">
            📐 {anchoMetros.toFixed(1)}m × {altoMetros.toFixed(1)}m • 🌱 {posiciones.length} plantas que caben realmente
          </p>
        </div>
        <div className="flex gap-2">
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              ✏️ Editar Parcela
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={guardarCambios}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                ✅ Guardar
              </button>
              <button
                onClick={() => {
                  setTempCultivos(cultivos)
                  setEditMode(false)
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                ❌ Cancelar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Vista de parcela organizada */}
      <div className="relative">
        {cultivosValidos.length === 0 ? (
          <div className="border-4 border-gray-300 bg-gray-50 rounded-xl shadow-lg p-8 text-center">
            <div className="text-gray-400 text-4xl mb-4">🌱</div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">Parcela vacía</h3>
            <p className="text-gray-500 mb-4">Esta parcela no tiene cultivos válidos para mostrar</p>
            <button
              onClick={() => setEditMode(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Agregar plantas
            </button>
          </div>
        ) : (
          <div
            className="border-4 border-amber-700 bg-gradient-to-br from-green-50 via-amber-50 to-green-100 relative overflow-hidden rounded-xl shadow-lg w-full max-w-4xl mx-auto cursor-crosshair"
            style={{
              height: `${Math.min(600, Math.max(300, altoCm * 1.8))}px`,
              backgroundImage: `
                repeating-linear-gradient(
                  90deg,
                  rgba(34, 139, 34, 0.08) 0px,
                  rgba(34, 139, 34, 0.08) 2px,
                  transparent 2px,
                  transparent 20px
                ),
                repeating-linear-gradient(
                  0deg,
                  rgba(34, 139, 34, 0.08) 0px,
                  rgba(34, 139, 34, 0.08) 2px,
                  transparent 2px,
                  transparent 20px
                )
              `,
              backgroundSize: '20px 20px'
            }}
            onClick={handleParcelaClick}
            data-parcela-container="true"
          >
          {/* Senderos entre las secciones */}
          <div className="absolute inset-0">
            <div className="absolute bg-amber-200 bg-opacity-50 rounded-full" 
                 style={{ left: '15px', right: '15px', top: '110px', height: '8px' }} />
            <div className="absolute bg-amber-200 bg-opacity-50 rounded-full" 
                 style={{ left: '15px', right: '15px', top: '220px', height: '8px' }} />
            <div className="absolute bg-amber-200 bg-opacity-50 rounded-full" 
                 style={{ left: '15px', right: '15px', top: '330px', height: '8px' }} />
          </div>

          {/* Borde interno decorativo */}
          {/* Overlay visual cuando se está arrastrando */}
          {draggedPlant && (
            <div className="absolute inset-0 bg-blue-500 bg-opacity-10 border-2 border-blue-500 border-dashed rounded-lg pointer-events-none z-40">
              <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-sm">
                Arrastra para reposicionar - Suelta para colocar
              </div>
            </div>
          )}

          <div className="absolute inset-3 border border-green-400 border-dashed rounded-lg opacity-40"></div>

          {/* Plantas organizadas */}
          {posiciones.map((pos, index) => {
            // Calcular posición relativa a la vista
            const containerWidth = Math.min(700, anchoCm * 2.2)
            const containerHeight = Math.min(600, Math.max(300, altoCm * 1.8))
            const xPercent = (pos.x / anchoCm) * 100
            const yPercent = (pos.y / altoCm) * 100
            
            const isDragging = draggedPlant?.index === index
            
            return (
              <div
                key={`${pos.planta}-${pos.numero}-${index}`}
                className={`absolute flex items-center justify-center rounded-full border-2 border-white shadow-lg transform transition-all cursor-pointer ${pos.info.color} ${
                  editMode && !isDragging ? 'hover:scale-110 hover:shadow-xl hover:ring-2 hover:ring-green-500' : ''
                } ${
                  isDragging ? 'opacity-50 scale-90 ring-2 ring-blue-500' : ''
                }`}
                style={{
                  left: `${xPercent}%`,
                  top: `${yPercent}%`,
                  width: `${Math.max(25, Math.min(pos.info.espaciado * 0.6, 40))}px`,
                  height: `${Math.max(25, Math.min(pos.info.espaciado * 0.6, 40))}px`,
                  zIndex: isDragging ? 50 : 10,
                  userSelect: 'none'
                }}
                title={editMode ? `${pos.info.nombre} #${pos.numero} - Click para quitar o arrastra para mover` : `${pos.info.nombre} #${pos.numero} - Espaciado: ${pos.info.espaciado}cm`}
                onMouseDown={editMode ? (e) => {
                  e.preventDefault();
                  handlePlantDrag(e, pos, index);
                } : undefined}
                onClick={editMode ? (e) => {
                  e.stopPropagation();
                  if (!draggedPlant) {
                    quitarPlanta(pos.planta, `${pos.planta}-${pos.numero}-${index}`);
                  }
                } : undefined}
                draggable={false}
              >
                <span 
                  className="select-none drop-shadow-sm pointer-events-none" 
                  style={{ fontSize: `${Math.max(12, Math.min(pos.info.espaciado / 3, 18))}px` }}
                >
                  {pos.info.emoji}
                </span>
                {editMode && !isDragging && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold shadow-lg">
                    ×
                  </div>
                )}
              </div>
            )
          })}

          {/* Información básica */}
          <div className="absolute top-3 right-3 bg-white bg-opacity-95 rounded-lg p-2 text-xs shadow-lg border border-gray-200">
            <div className="text-gray-800 font-medium">📏 {area}m²</div>
            <div className="text-green-700 font-medium">🌿 {posiciones.length} plantas</div>
          </div>
        </div>
        )}
      </div>

      {/* Panel de edición */}
      {editMode && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3">
            🌱 Agregar plantas (clic para añadir a tu jardín):
          </h3>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {plantasDisponibles.map(planta => {
              const info = PLANTAS_INFO[planta]
              return (
                <button
                  key={planta}
                  onClick={() => agregarPlanta(planta)}
                  className={`p-2 rounded-lg border-2 border-gray-300 hover:border-green-500 hover:shadow-md transition-all ${info.color}`}
                  title={`${info.nombre} - Espaciado: ${info.espaciado}cm`}
                >
                  <div className="text-center">
                    <div className="text-lg mb-1">{info.emoji}</div>
                    <div className="text-xs font-medium">{info.nombre}</div>
                  </div>
                </button>
              )
            })}
          </div>
          
          <div className="mt-4 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
            💡 <strong>Consejo:</strong> Haz clic en las plantas del jardín para quitarlas. Las plantas se organizan automáticamente por tamaño: grandes al fondo, pequeñas al frente.
          </div>
        </div>
      )}

      {/* Resumen de plantas */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-800 mb-3">🌿 Distribución real en tu jardín:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {(() => {
            // Contar plantas reales por tipo
            const conteo: { [key: string]: number } = {}
            posiciones.forEach(pos => {
              conteo[pos.planta] = (conteo[pos.planta] || 0) + 1
            })
            
            return Object.entries(conteo).map(([cultivo, cantidad]) => {
              const info = PLANTAS_INFO[cultivo.toLowerCase()]
              if (!info) return null
              
              return (
                <div key={cultivo} className={`p-3 rounded-lg ${info.color} border border-gray-200 hover:shadow-md transition-shadow`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{info.emoji}</span>
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-800">{info.nombre}</div>
                      <div className="text-xs text-gray-600">📏 {info.espaciado}cm espaciado</div>
                      <div className="text-sm font-bold text-green-700">🌱 {cantidad} plantas</div>
                    </div>
                  </div>
                </div>
              )
            })
          })()}
        </div>
        
        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="text-sm text-green-800">
            <strong>📊 Resumen del jardín:</strong>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>📐 <strong>Área:</strong> {area}m²</div>
              <div>🌱 <strong>Total plantas:</strong> {posiciones.length}</div>
              <div>📏 <strong>Dimensiones:</strong> {anchoMetros.toFixed(1)}m × {altoMetros.toFixed(1)}m</div>
              <div>🎯 <strong>Optimización:</strong> {Math.round((posiciones.length / (area * 4)) * 100)}% aprovechamiento</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}