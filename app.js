const d = document;
const $btnJugar = d.querySelector(".btn-jugar");
const $cuadros = d.querySelectorAll(".cuadro");

let secuenciaMaquina = [];
let secuenciaJugador = [];
let ronda = 0;

$btnJugar.addEventListener("click", () => {
  iniciarJuego();
});

const iniciarJuego = () => {
  bloquearUsuario();

  const $cuadroMaquina = obtenerCuadroAleatorioMaquina();
  secuenciaMaquina.push($cuadroMaquina.dataset.color);
  console.log(secuenciaMaquina);

  iluminarCuadroMaquina($cuadroMaquina);
};

const obtenerCuadroAleatorioMaquina = () => {
  const indice = Math.floor(Math.random() * $cuadros.length);
  return $cuadros[indice];
};

const iluminarCuadroMaquina = (e) => {
  e.classList.add("resaltar-color");
  secuenciaJugador.push(e.dataset.color); //ESTO IRIA EN EL MANEJO DEL JUGADOR
  console.log(secuenciaJugador);
};
$cuadros.forEach((cuadro) => {
  cuadro.onclick = iluminarCuadro;
});

const bloquearUsuario = () => {
  $cuadros.forEach((cuadro) => {
    cuadro.onclick = function () {};
  });
};
