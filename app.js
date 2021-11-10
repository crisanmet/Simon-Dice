const d = document;
const $btnJugar = d.querySelector(".btn-jugar");
const $cuadros = d.querySelectorAll(".cuadro");
const $mensaje = d.querySelector(".turno");
const $ronda = d.querySelector(".ronda");
const $mejorRonda = d.querySelector(".mejor-ronda");

let secuenciaMaquinaAComparar = [];
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
  secuenciaMaquinaAComparar.push($cuadroMaquina.dataset.color);
  secuenciaMaquina.push($cuadroMaquina);

  secuenciaMaquina.forEach((cuadro, i) => {
    const retraso = (i + 1) * 1000;
    setTimeout(() => {
      iluminarCuadro(cuadro);
    }, retraso);
  });

  const retrasoJugador = (ronda + 2) * 1000;
  console.log(retrasoJugador);

  setTimeout(() => {
    desbloquearUsuario();
  }, retrasoJugador);

  manejarNumeroRonda();
};
const obtenerCuadroAleatorioMaquina = () => {
  const cuadrosColores = ["azul", "verde", "rojo", "amarillo"];
  const colorAleatorio = Math.floor(Math.random() * cuadrosColores.length);

  //const cuadroElegido = Math.floor(Math.random() * $cuadros.length);
  return $cuadros[colorAleatorio];
};

const manejarJuegoUsuario = (e) => {
  const $cuadro = e.target;
  iluminarCuadro($cuadro);
  secuenciaJugador.push($cuadro.dataset.color);

  const esperarJuegoJugador =
    secuenciaMaquinaAComparar.length === secuenciaJugador.length;

  if (esperarJuegoJugador) {
    if (
      JSON.stringify(secuenciaMaquinaAComparar) ===
      JSON.stringify(secuenciaJugador)
    ) {
      secuenciaJugador = [];
      bloquearUsuario();
      setTimeout(() => {
        iniciarJuego();
      }, 1000);
    } else {
      reiniciarJuego();
    }
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
  //toggleMostrarOcultar($mensaje);
  secuenciaMaquina = [];
  secuenciaMaquinaAComparar = [];
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

d.addEventListener("DOMContentLoaded", () => {
  $mejorRonda.textContent = `Best Score: ${mejorRonda}`;
});
