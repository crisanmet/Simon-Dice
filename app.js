const d = document;
const $btnJugar = d.querySelector(".btn-jugar");
const $cuadros = d.querySelectorAll(".cuadro");
const $mensaje = d.querySelector(".turno");

let secuenciaMaquinaAComparar = [];
let secuenciaMaquina = [];
let secuenciaJugador = [];
let ronda = 0;
let mejorRonda = JSON.parse(localStorage.getItem("mejor-ronda")) || 0;

$btnJugar.addEventListener("click", () => {
  iniciarJuego();
  toggleBtn($btnJugar);
});

const iniciarJuego = () => {
  toggleBtn($mensaje);
  $mensaje.innerHTML = `<p>Turno de la maquinola...</p>`;
  bloquearUsuario();

  const $cuadroMaquina = obtenerCuadroAleatorioMaquina();
  secuenciaMaquinaAComparar.push($cuadroMaquina.dataset.color);
  secuenciaMaquina.push($cuadroMaquina);

  secuenciaMaquina.forEach((cuadro, i) => {
    const retraso = (i + 1) * 1000;
    setTimeout(() => {
      iluminarCuadro(cuadro);
    }, retraso);
  });

  const retrasoJugador = (ronda + 1) * 1000;

  setTimeout(() => {
    desbloquearUsuario();
  }, retrasoJugador);
  ronda++;
  mejorRonda = ronda;
};
const obtenerCuadroAleatorioMaquina = () => {
  const cuadrosColores = ["azul", "verde", "rojo", "amarillo"];
  const colorAleatorio = Math.floor(Math.random() * cuadrosColores.length);

  //const cuadroElegido = Math.floor(Math.random() * $cuadros.length);
  return $cuadros[colorAleatorio];
};

const manejarJuegoUsuario = (e) => {
  $mensaje.innerHTML = `<p>¿Podes repetirla?</p>`;
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
  }, 500);
};

const desbloquearUsuario = () => {
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
  toggleBtn($btnJugar);
  secuenciaMaquina = [];
  secuenciaMaquinaAComparar = [];
  secuenciaJugador = [];
  bloquearUsuario();
};

const compararMejorRonda = (puntaje) => {
  const puntajeLocalStorage = JSON.parse(localStorage.getItem("mejor-ronda"));
  if (puntaje > puntajeLocalStorage) {
    localStorage.setItem("mejor-ronda", JSON.stringify(mejorRonda));
  }
};

const toggleBtn = (btn) => {
  btn.classList.toggle("oculto");
};
