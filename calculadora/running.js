//Definiendo variables para los botones
const botonNumeros = document.getElementsByName("data-number");
const botonOpera = document.getElementsByName("data-opera");
const botonIgual = document.getElementsByName("data-igual")[0];
const botonDelete = document.getElementsByName("data-delete")[0];
let result = document.getElementById("result");

//Definiendo variables para la parte lógica
let opeActual = "";
let opeAnterior = "";
let operacion = undefined;

//Añadiendo el evento "click" a para todos los botones de numero
botonNumeros.forEach(function (boton) {
  boton.addEventListener("click", function () {
    agregarNumero(boton.innerText);
  });
});

botonOpera.forEach(function (boton) {
  boton.addEventListener("click", function () {
    selectOperacion(boton.innerText);
  });
});

//añadimos el evento "click" a los botones igual y delete
botonIgual.addEventListener("click", function () {
  calcular();
  actualizarDisplay();
});

botonDelete.addEventListener("click", function () {
  clear();
  actualizarDisplay();
});

//IMPLEMENTANDO METODOS
/*como el input es de tipo texto devemos convertir los numeros ingresados 
a string con la funcion "toString" para que el ingresar otro numero no sume 
porque lo que queremos es que lo numeros se concatenen.
*/
function selectOperacion(op) {
  if (opeActual === "") return;
  if (opeAnterior !== "") {
    calcular();
  }
  operacion = op.toString();
  opeAnterior = opeActual;
  opeActual = "";
}

//creamos la funcion calcular
function calcular() {
  let calculo;
  const anterior = parseFloat(opeAnterior);
  const actual = parseFloat(opeActual);
  /*en esta operacion usamos la funcion predifinida por js "IsNan" controla que 
    el string ingresado debe ser un numero si no cumple entonce "return"
    */
  if (isNaN(anterior) || isNaN(actual)) return;
  switch (operacion) {
    case "+":
      calculo = anterior + actual;
      break;
    case "-":
      calculo = anterior - actual;
      break;
    case "x":
      calculo = anterior * actual;
      break;
    case "/":
      calculo = anterior / actual;
      break;
    default:
      return;
  }
  opeActual = calculo;
  operacion = undefined;
  opeAnterior = "";
}

function agregarNumero(num) {
  opeActual = opeActual.toString() + num.toString();
  actualizarDisplay();
}
//****Esta funcion restablece la configuracion a su estado normal**** */
function clear() {
  opeActual = "";
  opeAnterior = "";
  operacion = undefined;
}

/*********************** */
function actualizarDisplay() {
  result.value = opeActual;
}

//llamamos la funcion clear cada vez que actualizamos la pagina
clear();
