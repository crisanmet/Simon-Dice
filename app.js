const $btnJugar = document.querySelector(".btn-jugar");
const $cuadros = document.querySelectorAll(".cuadro");
const $mensaje = document.querySelector(".turno");
const $ronda = document.querySelector(".ronda");
const $mejorRonda = document.querySelector(".mejor-ronda");

let secuenciaMaquina = [];
let secuenciaJugador = [];
let ronda = 0;
let mejorRonda = JSON.parse(localStorage.getItem("mejor-ronda")) || 0;

$btnJugar.addEventListener("click", () => {
  iniciarJuego();
  toggleMostrarOcultar($btnJugar);
  $ronda.textContent = `Ronda: 1`;
});

const iniciarJuego = () => {
  bloquearUsuario();
  mostrarMensaje($mensaje, "Turno de la maquinola...");

  const $cuadroMaquina = obtenerCuadroAleatorioMaquina();
  secuenciaMaquina.push($cuadroMaquina);

  secuenciaMaquina.forEach((cuadro, i) => {
    const retraso = (i + 1) * 1000;
    setTimeout(() => {
      iluminarCuadro(cuadro);
    }, retraso);
  });

  const retrasoJugador = (secuenciaMaquina.length + 1) * 1000;

  setTimeout(() => {
    desbloquearUsuario();
  }, retrasoJugador);

  manejarNumeroRonda();
};
const obtenerCuadroAleatorioMaquina = () => {
  const cuadroElegido = Math.floor(Math.random() * $cuadros.length);
  return $cuadros[cuadroElegido];
};

const manejarJuegoUsuario = (e) => {
  const $cuadro = e.target;
  iluminarCuadro($cuadro);
  secuenciaJugador.push($cuadro);

  const cuadroMaquina = secuenciaMaquina[secuenciaJugador.length - 1];

  if ($cuadro.dataset.color !== cuadroMaquina.dataset.color) {
    reiniciarJuego();
    return;
  }
  if (secuenciaMaquina.length === secuenciaJugador.length) {
    secuenciaJugador = [];
    bloquearUsuario();
    setTimeout(() => {
      iniciarJuego();
    }, 1000);
  }
};
const iluminarCuadro = (e) => {
  e.classList.add("resaltar-color");
  setTimeout(() => {
    e.classList.remove("resaltar-color");
  }, 200);
};

const desbloquearUsuario = () => {
  mostrarMensaje($mensaje, "¿Podés repetirla?");
  $cuadros.forEach((cuadro) => {
    cuadro.onclick = manejarJuegoUsuario;
    cuadro.classList.add("cursor-pointer");
  });
};
const bloquearUsuario = () => {
  $cuadros.forEach((cuadro) => {
    cuadro.onclick = function () {};
    cuadro.classList.remove("cursor-pointer");
  });
};

const reiniciarJuego = () => {
  compararMejorRonda(mejorRonda);
  toggleMostrarOcultar($btnJugar);
  mostrarMensaje($mensaje, "Perdiste...Para volver a jugar toca Play");

  secuenciaMaquina = [];
  ronda = 0;
  secuenciaJugador = [];
  bloquearUsuario();
};

const mostrarMensaje = (elemento, mensaje) => {
  elemento.innerHTML = `<p>${mensaje} </p>`;
};

const manejarNumeroRonda = () => {
  ronda++;
  $ronda.textContent = `Ronda: ${ronda}`;
  mejorRonda = ronda - 1;
};

const compararMejorRonda = (puntaje) => {
  const puntajeLocalStorage = JSON.parse(localStorage.getItem("mejor-ronda"));
  if (puntaje > puntajeLocalStorage) {
    localStorage.setItem("mejor-ronda", JSON.stringify(mejorRonda));
    $mejorRonda.textContent = `Best Score: ${mejorRonda}`;
  }
};

const toggleMostrarOcultar = (elemento) => {
  elemento.classList.toggle("oculto");
};

document.addEventListener("DOMContentLoaded", () => {
  $mejorRonda.textContent = `Best Score: ${mejorRonda}`;
});
