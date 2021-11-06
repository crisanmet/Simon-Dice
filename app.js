const d = document;
const $btnJugar = d.querySelector(".btn-jugar");
const $cuadros = d.querySelectorAll(".cuadro");

let secuenciaMaquinaAComparar = [];
let secuenciaMaquina = [];
let secuenciaJugador = [];
let ronda = 0;
let mejorRonda = localStorage.getItem("puntaje") || 0;

$btnJugar.addEventListener("click", () => {
  iniciarJuego();
});

const iniciarJuego = () => {
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

  const retrasoJugador = (secuenciaMaquina.length + 1) * 1000;

  setTimeout(() => {
    desbloquearUsuario();
  }, retrasoJugador);
  ronda++;
  mejorRonda = ronda;
};

const obtenerCuadroAleatorioMaquina = () => {
  const cuadroElegido = Math.floor(Math.random() * $cuadros.length);
  return $cuadros[cuadroElegido];
};

const manejarJuegoUsuario = (e) => {
  const $cuadro = e.target;
  iluminarCuadro($cuadro);
  secuenciaJugador.push($cuadro.dataset.color);

  const esperarJugador =
    secuenciaMaquinaAComparar.length === secuenciaJugador.length;

  if (esperarJugador) {
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
  });
};
const bloquearUsuario = () => {
  $cuadros.forEach((cuadro) => {
    cuadro.onclick = function () {};
  });
};

const reiniciarJuego = () => {
  secuenciaMaquina = [];
  secuenciaMaquinaAComparar = [];
  secuenciaJugador = [];
  bloquearUsuario();
};
