const d = document;
const $btnJugar = d.querySelector(".btn-jugar");

let secuenciaMaquina = [];
let secuenciaJugador = [];
let ronda = 0;

$btnJugar.addEventListener("click", () => {
  comenzarJuego();
});
