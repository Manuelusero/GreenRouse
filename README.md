# GreenRouse 🌱

**Plataforma web para gestión de huertas orgánicas y permacultura**

GreenRouse es una aplicación web completa diseñada para ayudar a horticultores urbanos y rurales a gestionar sus huertas orgánicas, aprender técnicas de permacultura y conectar con una comunidad sostenible.

## ✨ Características Principales

### 🌾 Gestión de Parcelas

- Dashboard interactivo para visualizar todas tus parcelas
- Sistema de seguimiento de cultivos por parcela
- Información detallada sobre fechas de siembra y cosecha
- Monitoreo del estado de crecimiento de los cultivos

### 🧮 Calculadora Inteligente de Cultivos

- Calculadora de medición de parcelas
- Optimización del espacio según el tipo de cultivo
- Información sobre plantas compañeras y incompatibles
- Recomendaciones de temporadas de siembra
- Cálculo automático del número de plantas por área

### 🎓 Academia de Permacultura

- Cursos especializados en técnicas sostenibles
- Contenido creado por expertos en agricultura orgánica
- Diferentes niveles: Principiante, Intermedio, Avanzado
- Certificaciones y seguimiento de progreso

### 📚 Blog y Recursos

- Artículos especializados sobre técnicas de cultivo
- Tips estacionales y calendario lunar
- Guías paso a paso para principiantes
- Consejos de control natural de plagas

### 🏪 Red de Proveedores Locales

- Directorio de proveedores de semillas orgánicas
- Mapa interactivo de tiendas cercanas
- Reviews y recomendaciones de la comunidad
- Apoyo al comercio local y sostenible

## 🛠️ Tecnologías Utilizadas

- **Framework**: Next.js 15.5.5 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS con paleta de colores naturales
- **Componentes**: React 18 con hooks
- **Build**: Optimización automática de Next.js
- **Diseño**: Responsive design mobile-first

## 🎨 Diseño y UX

### Paleta de Colores Orgánicos

- **Verde Hoja** (#228B22): Color principal, representa crecimiento
- **Verde Salvia** (#9CAF88): Color secundario, naturaleza suave
- **Marrón Tierra** (#8B4513): Representa la tierra y estabilidad
- **Naranja Amanecer** (#FF6B35): Energía y vitalidad
- **Azul Cielo** (#87CEEB): Tranquilidad y agua

### Experiencia de Usuario

- Navegación intuitiva y accesible
- Diseño responsive que funciona en todos los dispositivos
- Interfaz limpia enfocada en la funcionalidad
- Animaciones suaves y transiciones naturales

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ instalado
- npm o yarn como gestor de paquetes

### Instalación

```bash
# Clona el repositorio
git clone <tu-repositorio>
cd GreenRouse

# Instala las dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev
```

### Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo (http://localhost:3000)
npm run build    # Construye la aplicación para producción
npm run start    # Inicia el servidor de producción
npm run lint     # Ejecuta el linter de código
```

## 📁 Estructura del Proyecto

```
GreenRouse/
├── src/
│   ├── app/                    # Pages usando App Router
│   │   ├── blog/              # Página del blog
│   │   ├── calculadora/       # Calculadora de cultivos
│   │   ├── cursos/            # Academia de permacultura
│   │   ├── parcelas/          # Gestión de parcelas
│   │   ├── globals.css        # Estilos globales
│   │   ├── layout.tsx         # Layout principal
│   │   └── page.tsx           # Página de inicio
│   └── components/            # Componentes reutilizables
│       ├── Header.tsx         # Navegación principal
│       ├── Footer.tsx         # Pie de página
│       ├── Hero.tsx           # Sección hero
│       └── FeatureCards.tsx   # Tarjetas de características
├── .github/
│   └── copilot-instructions.md # Instrucciones para Copilot
├── tailwind.config.js         # Configuración de Tailwind
├── next.config.js            # Configuración de Next.js
└── package.json              # Dependencias y scripts
```

## 🌟 Funcionalidades Implementadas

### ✅ Funcionalidades Base

- [x] Sistema de navegación completo
- [x] Página de inicio con hero y características
- [x] Gestión visual de parcelas
- [x] Calculadora de cultivos inteligente
- [x] Catálogo de cursos de permacultura
- [x] Blog con artículos especializados
- [x] Diseño responsive y accesible
- [x] Paleta de colores orgánica

### 🔄 Próximas Mejoras

- [ ] Sistema de autenticación de usuarios
- [ ] Base de datos para persistir información
- [ ] Mapa interactivo de proveedores
- [ ] Sistema de notificaciones
- [ ] API para datos meteorológicos
- [ ] Integración con calendario lunar
- [ ] Chat comunitario
- [ ] Marketplace de semillas

## 🤝 Contribución

Este proyecto está diseñado para crecer con la comunidad. Algunas áreas donde puedes contribuir:

1. **Contenido Educativo**: Agregar más artículos y cursos
2. **Funcionalidades**: Implementar nuevas herramientas de cálculo
3. **Base de Datos**: Expandir la información sobre cultivos
4. **Diseño**: Mejorar la experiencia visual y de usuario
5. **Localización**: Adaptar el contenido para diferentes regiones

## 📈 Roadmap Futuro

### Fase 1: Fundación (Completada)

- ✅ Estructura básica del proyecto
- ✅ Componentes principales
- ✅ Sistema de navegación
- ✅ Calculadora básica

### Fase 2: Interactividad

- [ ] Sistema de usuarios y autenticación
- [ ] Base de datos para parcelas y cultivos
- [ ] API REST para gestión de datos

### Fase 3: Comunidad

- [ ] Sistema de comentarios y reviews
- [ ] Foro comunitario
- [ ] Intercambio de semillas

### Fase 4: Expansión

- [ ] App móvil nativa
- [ ] Integración con IoT para sensores de huerta
- [ ] Marketplace de productos orgánicos

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 👥 Equipo

Desarrollado con 💚 por la comunidad de GreenRouse.

---

**¿Listo para comenzar tu huerta sostenible?**
Visita [http://localhost:3000](http://localhost:3000) y empieza tu aventura verde.

## 🆘 Soporte

Si tienes preguntas o necesitas ayuda:

- 📧 Email: info@greenrouse.com
- 🐛 Reporta bugs en los issues del repositorio
- 💬 Únete a nuestra comunidad para hacer preguntas

**¡Cultivemos juntos un futuro más verde! 🌱**
