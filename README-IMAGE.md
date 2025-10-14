# Instrucciones para agregar la imagen de fondo

## Pasos para agregar la imagen:

1. **Guarda la imagen** que me enviaste como `garden-hero.jpg` en la carpeta:

   ```
   /Users/manuelusero/Desktop/GreenRouse/public/images/garden-hero.jpg
   ```

2. **La imagen debe tener**:

   - Nombre exacto: `garden-hero.jpg`
   - Ubicación: `public/images/`
   - Formato: JPG o PNG
   - Resolución recomendada: Al menos 1920x1080px para buena calidad

3. **Una vez guardada la imagen**, el fondo se aplicará automáticamente en la página principal.

## Lo que he configurado:

- ✅ Creada la carpeta `public/images/`
- ✅ Actualizado el CSS para usar la imagen como fondo
- ✅ Agregado overlay verde semitransparente para mantener legibilidad del texto
- ✅ Configurado parallax effect con `background-attachment: fixed`

## Resultado esperado:

La página principal ahora tendrá:

- Tu imagen de jardín/tierra como fondo
- Un overlay verde semitransparente para mantener la temática
- Texto blanco que se lee claramente sobre la imagen
- Efecto parallax cuando haces scroll

## Si necesitas cambiar algo:

- Para ajustar la transparencia del overlay, modifica los valores `rgba(76, 175, 80, 0.85)` en `globals.css`
- Para cambiar el color del overlay, modifica los valores RGB
- Para quitar el efecto parallax, elimina `background-attachment: fixed`
