// js/script.js

// 1) Datos de los comandos: nombre y ruta al HTML dentro de "comandos/"
const tutorialData = {
  Inicio: [
    { name: 'Historia Git',    file: 'comandos/inicio/historia-git.html' },
    { name: 'Como funciona Git',    file: 'comandos/inicio/como-funciona-git.html' },
    { name: 'Creación de Cuenta',     file: 'comandos/inicio/creacion-cuenta.html' },
	  { name: 'Crear un repositorio',     file: 'comandos/inicio/crear-repositorio.html' },
	  { name: 'Invitar a Compañero',     file: 'comandos/inicio/invitar-colaborador.html' },
	  { name: 'Clonar repositorio con git',     file: 'comandos/inicio/clonar-repositorio-git.html' },
	  { name: 'Sincronizar cuenta con VSCode ',     file: 'comandos/inicio/iniciar-visual-studio.html' },
	  { name: 'Clonar repositorio con VSCode ',     file: 'comandos/inicio/clonar-repositorio-vscode.html' },
	  { name: 'Crear claves Git (solo ordenador personal) ',     file: 'comandos/inicio/clave-ssh.html' }
  ],
  Principiante: [
    { name: 'git init',    file: 'comandos/principiante/git-init.html' },
    { name: 'git add',     file: 'comandos/principiante/git-add.html' },
    { name: 'git ignore',  file: 'comandos/principiante/git-ignore.html' },
	  { name: 'git commit',     file: 'comandos/principiante/git-commit.html' },
	  { name: 'git push',     file: 'comandos/principiante/git-push.html' },
	  { name: 'git status',     file: 'comandos/principiante/git-status.html' },
    { name: 'git log',     file: 'comandos/principiante/git-log.html' },
    { name: 'git pull',     file: 'comandos/principiante/git-pull.html' },
    { name: 'ejercicio: crear un repositorio y hacer tu primer commit',     file: 'comandos/principiante/ejercicio-principiante.html' }
  ],
  Intermedio: [
    { name: 'git branch',  file: 'comandos/intermedio/git-branch.html' },
    { name: 'git fetch',   file: 'comandos/intermedio/git-fetch.html' },
    { name: 'git merge',   file: 'comandos/intermedio/git-merge.html' },
    { name: 'git diff',     file: 'comandos/principiante/git-diff.html' },
    { name: 'git remote',  file: 'comandos/intermedio/git-remote.html' },
    { name: 'git reset',   file: 'comandos/intermedio/git-reset.html' },
    { name: 'git rm',      file: 'comandos/intermedio/git-rm.html' },
    { name: 'git show',    file: 'comandos/intermedio/git-show.html' },
    { name: 'ejercicio: Ampliando el Programa de Suma con Ramas',     file: 'comandos/intermedio/ejercicio-intermedio.html' }
  ],
  Avanzado: [
    { name: 'git rebase',      file: 'comandos/avanzado/git-rebase.html' },
    { name: 'git stash',       file: 'comandos/avanzado/git-stash.html' },
    { name: 'git cherry-pick', file: 'comandos/avanzado/git-cherry-pick.html' },
    { name: 'Jupyter Notebook: instalación', file: 'comandos/avanzado/jupyter-notebook-instalacion.html' },
    { name: 'Jupyter Notebook: Caso práctico', file: 'comandos/avanzado/jupyter-notebook-caso-practico.html' },
    { name: 'Jupyter Notebook: Integración con Git', file: 'comandos/avanzado/jupyter-notebook-git.html' }
  ]
};

// 2) Calcula la URL base (donde está index.html)
const BASE_URL = window.location.href.replace(/\/[^/]*$/, '/');

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');

  // 3) Construye el menú lateral
  Object.keys(tutorialData).forEach(levelKey => {
    const levelName = levelKey[0].toUpperCase() + levelKey.slice(1);
    const li = document.createElement('li');
    li.className = 'level-item';

    // Botón de nivel
    const btnNivel = document.createElement('button');
    btnNivel.className = 'level-btn';
    btnNivel.textContent = levelName;
    li.appendChild(btnNivel);

    // Lista de comandos
    const cmdsUl = document.createElement('ul');
    cmdsUl.className = 'commands';

    tutorialData[levelKey].forEach(cmd => {
      const cmdLi = document.createElement('li');
      const cmdBtn = document.createElement('button');
      cmdBtn.className = 'command-btn';
      cmdBtn.textContent = cmd.name;
      cmdBtn.addEventListener('click', () => loadCommand(cmd.file, cmdBtn));
      cmdLi.appendChild(cmdBtn);
      cmdsUl.appendChild(cmdLi);
    });

    li.appendChild(cmdsUl);
    sidebar.appendChild(li);

    // Toggle abrir/cerrar nivel usando la clase "expanded"
    btnNivel.addEventListener('click', () => {
      li.classList.toggle('expanded');
    });
  });
});

/**
 * Carga el HTML completo de un comando y lo inyecta.
 * Ajusta las rutas relativas de imágenes para que funcionen correctamente.
 * @param {string} relPath – Ruta relativa (p.ej. "comandos/principiante/git-init.html")
 * @param {HTMLElement} btn – Botón clicado (para marcar activo)
 */
async function loadCommand(relPath, btn) {
  const content = document.getElementById('content');

  // 1) Desmarcamos todos los botones activos
  document.querySelectorAll('.command-btn.active').forEach(el =>
    el.classList.remove('active')
  );
  // 2) Marcamos sólo este
  btn.classList.add('active');

  // 3) Indicamos que estamos cargando
  content.innerHTML = '<p class="loading">Cargando…</p>';

  // 4) Construimos la URL absoluta
  const url = BASE_URL + relPath;
  console.log('Cargando comando desde:', url);

  // 5) Fetch + render "tal cual" el HTML
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    let html = await res.text();
    
    // Ajusta las rutas de las imágenes para que funcionen desde cualquier contexto
    // Reemplaza ../../imagenes/ por imagenes/ (rutas relativas a la raíz)
    html = html.replace(/src="\.\.\/\.\.\/imagenes\//g, 'src="' + BASE_URL + 'imagenes/');
    
    content.innerHTML = html;
  } catch (err) {
    console.error(err);
    content.innerHTML = `
      <p class="error">
        No se pudo cargar el comando:<br>${err.message}
      </p>`;
  }
  
  // Agregar funcionalidad de zoom a las imágenes después de cargar
  setupImageZoom();
}

/**
 * Configura el efecto de zoom modal para todas las imágenes
 */
function setupImageZoom() {
  // Crear modal si no existe
  let modal = document.getElementById('image-zoom-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'image-zoom-modal';
    modal.className = 'image-zoom-modal';
    document.body.appendChild(modal);
  }
  
  // Agregar listeners a todas las imágenes
  const images = document.querySelectorAll('.container-image img');
  images.forEach(img => {
    // Remover listeners anteriores
    img.removeEventListener('click', handleImageClick);
    // Agregar nuevo listener
    img.addEventListener('click', handleImageClick);
  });
  
  // Click en el modal para cerrar
  modal.removeEventListener('click', closeZoom);
  modal.addEventListener('click', closeZoom);
}

/**
 * Maneja el click en una imagen para abrirla en zoom
 */
function handleImageClick(e) {
  e.stopPropagation();
  const modal = document.getElementById('image-zoom-modal');
  const zoomImg = document.createElement('img');
  zoomImg.src = this.src;
  zoomImg.alt = this.alt;
  
  modal.innerHTML = '';
  modal.appendChild(zoomImg);
  modal.classList.add('active');
}

/**
 * Cierra el modal de zoom
 */
function closeZoom() {
  const modal = document.getElementById('image-zoom-modal');
  modal.classList.remove('active');
}
