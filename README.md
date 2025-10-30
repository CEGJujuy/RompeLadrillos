# Breakout - Juego Clásico de Rompe Ladrillos

Un juego de Breakout completamente funcional desarrollado con HTML5 Canvas, JavaScript vanilla y CSS moderno. El jugador controla una paleta para hacer rebotar una bola y destruir todos los bloques en pantalla.

## Características del Juego

- **Controles Múltiples**: Soporta teclado (flechas), mouse y pantalla táctil
- **Sistema de Puntuación**: 10 puntos por cada bloque destruido
- **Sistema de Vidas**: El jugador comienza con 3 vidas
- **40 Bloques Coloridos**: Organizados en 5 filas con diferentes colores
- **Física Realista**: La bola rebota con ángulos diferentes según el punto de impacto en la paleta
- **Diseño Responsivo**: Se adapta automáticamente a diferentes tamaños de pantalla (móvil, tablet, desktop)
- **Interfaz Moderna**: Diseño limpio con gradientes y animaciones suaves
- **Pantalla de Victoria/Derrota**: Muestra la puntuación final y permite reiniciar el juego

## Tecnologías Utilizadas

- **HTML5 Canvas**: Para el renderizado del juego
- **JavaScript (ES6+)**: Lógica del juego y manejo de eventos
- **CSS3**: Estilos modernos con gradientes y efectos
- **Vite**: Herramienta de desarrollo y construcción

## Estructura del Proyecto

```
project/
├── index.html      # Estructura HTML del juego
├── styles.css      # Estilos y diseño responsivo
├── game.js         # Lógica principal del juego
├── package.json    # Dependencias y scripts
└── README.md       # Documentación del proyecto
```

## Cómo Jugar

1. **Objetivo**: Destruir todos los bloques sin perder todas las vidas
2. **Controles**:
   - **Teclado**: Usa las flechas ← → para mover la paleta
   - **Mouse**: Mueve el cursor sobre el canvas
   - **Táctil**: Toca y desliza en la pantalla
3. **Mecánica**:
   - Haz rebotar la bola con la paleta
   - Destruye todos los bloques para ganar
   - Si la bola cae, pierdes una vida
   - El juego termina al perder todas las vidas o destruir todos los bloques

## Instalación y Ejecución

### Requisitos Previos
- Node.js (v14 o superior)
- npm o yarn

### Pasos de Instalación

1. Clona o descarga el proyecto

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en la URL que aparece (generalmente http://localhost:5173)

### Construcción para Producción

Para crear una versión optimizada para producción:

```bash
npm run build
```

Los archivos generados estarán en la carpeta `dist/`.

## Características Técnicas

- **Canvas Responsivo**: El tamaño del canvas se ajusta dinámicamente
- **Detección de Colisiones**: Implementada para bola-paleta y bola-bloques
- **Física del Rebote**: El ángulo de rebote varía según el punto de impacto
- **Gestión de Estado**: Control completo del estado del juego (puntuación, vidas, bloques)
- **Event Listeners**: Manejo de eventos de teclado, mouse y touch
- **RequestAnimationFrame**: Para animaciones fluidas y eficientes

## Código Destacado

### Detección de Colisiones
El juego implementa detección de colisiones pixel-perfect entre la bola y los bloques, actualizando el marcador en tiempo real.

### Física del Rebote
La paleta divide el área de impacto en zonas, creando diferentes ángulos de rebote para mayor control y estrategia.

### Diseño Adaptable
Utiliza un sistema de escalado que mantiene las proporciones del juego en cualquier dispositivo.

## Posibles Mejoras Futuras

- Múltiples niveles con dificultad creciente
- Power-ups (bolas múltiples, paleta más grande, etc.)
- Efectos de sonido y música
- Tabla de puntuaciones locales
- Diferentes tipos de bloques (con más resistencia)
- Animaciones de partículas al destruir bloques

## Información del Desarrollador

- Profesional: César Eduardo González
- Cargo: Analista en Sistemas
- Email: gonzalezeduardo_31@hotmail.com
- Teléfono: (+54) 3884 858-907

---

## Licencia

Este proyecto fue desarrollado con fines educativos y de demostración.

## Créditos

Desarrollado como ejemplo de implementación de juegos en HTML5 Canvas con JavaScript vanilla.
