// Modo oscuro automático según preferencia del sistema
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark-mode');
}

// Simulación de usuarios registrados
const usuarios = [
  { usuario: "gonza", contraseña: "1234" },
  { usuario: "admin", contraseña: "admin" }
];

// Validación de login
if (window.location.pathname.includes("login.html")) {
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();
    const valido = usuarios.find(u => u.usuario === user && u.contraseña === pass);

    if (valido) {
      localStorage.setItem("usuarioLogueado", user);
      window.location.href = "index.html";
    } else {
      document.getElementById("loginError").textContent = "Usuario o contraseña incorrectos";
    }
  });
}

// Protección de páginas
if (["/index.html", "/cursos.html"].some(p => window.location.pathname.endsWith(p))) {
  const logueado = localStorage.getItem("usuarioLogueado");
  if (!logueado) {
    window.location.href = "login.html";
  }
}

// Cierre de sesión
function cerrarSesion() {
  localStorage.removeItem("usuarioLogueado");
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const ruta = window.location.pathname;

  // Proteger páginas privadas
  if (ruta.endsWith("index.html") || ruta.endsWith("cursos.html")) {
    const logueado = localStorage.getItem("usuarioLogueado");
    if (!logueado) {
      window.location.href = "login.html";
    }
  }

  // Mostrar saludo si está logueado
  const header = document.querySelector("header");
  const usuario = localStorage.getItem("usuarioLogueado");
  if (usuario && header && ruta.endsWith("index.html")) {
    const saludo = document.createElement("p");
    saludo.textContent = `¡Bienvenido, ${usuario}!`;
    saludo.classList.add("saludo");
    header.appendChild(saludo);
  }
});