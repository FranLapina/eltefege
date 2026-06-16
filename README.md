# Git Tutorial - Electron Setup

## Descripción

Este proyecto encapsula tu tutorial web de Git en una aplicación Electron ejecutable (.exe en Windows). La solución preserva las rutas relativas correctamente tanto en desarrollo como en la aplicación empaquetada.

## Estructura de Archivos

```
PaginaWebTFG/
├── main.js              # Punto de entrada de Electron
├── preload.js           # Script de preload (seguridad)
├── package.json         # Dependencias y configuración
├── index.html           # Página principal
├── css/
│   └── style.css        # Estilos (actualizado con iframe styles)
├── js/
│   └── script.js        # Lógica (actualizado para Electron)
├── comandos/            # Directorios HTML
│   ├── inicio/
│   ├── principiante/
│   ├── intermedio/
│   └── avanzado/
└── imagenes/            # Todas tus imágenes
```

## Instalación y Setup

### 1. Instalar Node.js
Descarga e instala Node.js desde https://nodejs.org (versión LTS recomendada)

### 2. Instalar dependencias
En la carpeta del proyecto (PaginaWebTFG), abre una terminal y ejecuta:

```bash
npm install
```

Esto instalará:
- `electron` - Framework para crear aplicaciones de escritorio
- `electron-builder` - Para empaquetar la app en .exe
- `electron-is-dev` - Para detectar si estamos en desarrollo

## Desarrollo

Para ejecutar la aplicación durante el desarrollo:

```bash
npm start
```

O simplemente:

```bash
npm run dev
```

Esto abrirá la aplicación en una ventana Electron. Los cambios en los archivos HTML, CSS y JS se recargarán (probablemente tengas que recargar manualmente con F5).

## Características principales

### 1. **Manejo correcto de rutas relativas**
   - **En Electron**: Usa `<iframe>` para cargar los HTML de comandos. Esto preserva las rutas relativas (`../../imagenes/...`) exactamente como esperas.
   - **En web**: Usa inyección directa de HTML (fetch + innerHTML) para máximo rendimiento.

### 2. **Detección automática de entorno**
   - `preload.js` expone `window.electronAPI.isElectron = true`
   - `script.js` detecta esto y elige la estrategia adecuada

### 3. **Seguridad**
   - `nodeIntegration: false` - Desactiva acceso a módulos de Node en el renderer
   - `contextIsolation: true` - Aísla el contexto del navegador

## Construir el ejecutable (.exe)

Cuando quieras crear el ejecutable final:

```bash
npm run build
```

Esto generará:
- `dist/Git Tutorial Setup X.X.X.exe` - Instalador
- `dist/Git Tutorial X.X.X.exe` - Versión portable

El archivo ejecutable se generará en la carpeta `dist/`.

## Solución de problemas

### Las imágenes no se cargan
- **Causa**: Las rutas relativas no son correctas dentro del iframe.
- **Solución**: Verifica que los archivos de imagen estén en las carpetas `imagenes/` correctas.
- **Ejemplo**: Si `git-reset.html` está en `comandos/intermedio/`, las imágenes deben estar en `imagenes/git-reset/`.

### El app se abre en blanco
- **Causa**: El archivo `index.html` no se encuentra.
- **Solución**: Asegúrate de que el archivo `index.html` está en la raíz del proyecto.

### Error: "electron command not found"
- **Causa**: Las dependencias no están instaladas.
- **Solución**: Ejecuta `npm install` nuevamente.

## Configuración personalizada en package.json

El archivo `package.json` contiene campos importantes:

```json
{
  "main": "main.js",              // Archivo principal de Electron
  "homepage": "./",               // Ruta base para los recursos
  "build": {
    "files": [                    // Archivos a incluir en el ejecutable
      "main.js",
      "preload.js",
      "index.html",
      "css/**/*",
      "js/**/*",
      "imagenes/**/*",
      "comandos/**/*"
    ]
  }
}
```

## Notas importantes

1. **Rutas relativas**: Todas las rutas deben ser relativas desde la raíz del proyecto. No uses rutas absolutas.

2. **Electron en modo producción**: Asegúrate de que `isDev` se detecta correctamente. En desarrollo, se abre DevTools; en producción, no.

3. **Actualizaciones futuras**: Si cambias la estructura de carpetas, actualiza:
   - El array `files` en `package.json` en la sección `build`
   - Las rutas en `tutorialData` en `js/script.js`

## Distribución

Una vez construido el `.exe`, puedes distribuirlo directamente a otros usuarios sin necesidad de que tengan Node.js instalado. El ejecutable es completamente independiente.

## Recursos útiles

- [Documentación oficial de Electron](https://www.electronjs.org/docs)
- [Electron Builder](https://www.electron.build)
- [Build your first app](https://www.electronjs.org/docs/tutorial/quick-start)
