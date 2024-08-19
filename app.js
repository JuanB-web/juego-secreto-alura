//Esta variable almacena el número secreto que el usuario debe adivinar.
let numeroSecreto = 0;
//Esta variable lleva la cuenta de los intentos que el usuario ha realizado.
let intentos = 0;
//Esta lista almacena los números que ya se han sorteado.
let listaNumerosSorteados = [];
//Esta variable define el rango de números que se pueden sortear (1 a 100).
let numeroMaximo = 50;

//Esta función actualiza el contenido HTML de un elemento con el texto proporcionado.
function asignarTextoElemento(elemento, texto) {
     let elementoHTML = document.querySelector(elemento);
     elementoHTML.innerHTML = texto;
     return;
}

// Esta función compara el número ingresado por el usuario con el número secreto.
// Si son iguales, muestra un mensaje de éxito. Si no, proporciona una pista (mayor o menor) y aumenta el contador de intentos.
function verificarIntento() {
     let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
     
     
     
     if (numeroDeUsuario === numeroSecreto) {
          asignarTextoElemento('p',`Acertaste el numero en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
          document.getElementById('reiniciar').removeAttribute('disabled');
     } else {
          // El usuario no acerto.
          if (numeroDeUsuario > numeroSecreto) {
               asignarTextoElemento('p','El numero secreto es menor');
          } else {
               asignarTextoElemento('p','El numero secreto es mayor');
          }
          intentos++;
          limpiarCaja();

          // Verifica si se agotaron los intentos
          if (intentos >= 10) {
               asignarTextoElemento('p',`Se agotaron los intentos. El número secreto era ${numeroSecreto}`);
               document.getElementById('reiniciar').removeAttribute('disabled'); // Habilita el botón de reinicio
          }
     }
     return;
}

//Esta función limpia el campo de entrada del usuario.
function limpiarCaja() {
     document.querySelector('#valorUsuario').value = '';
}

// Funcion recursiva
// Esta función genera un número aleatorio dentro del rango definido por numeroMaximo.
// Verifica si el número ya está en la lista listaNumerosSorteados. Si lo está, llama a sí misma recursivamente para generar otro número.
function generarNumeroSecreto() {
     let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
     console.log(numeroGenerado);
     console.log(listaNumerosSorteados);
     intentos++;
     //Si ya sorteamos todos los numeros
     if (listaNumerosSorteados.length == numeroMaximo) {
          asignarTextoElemento('p','Ya se sortearon todos los numeros posibles')
     } else {
          //Si el numero generado esta incluido en la lista
          if (listaNumerosSorteados.includes(numeroGenerado)) {
           return generarNumeroSecreto();
          } else {
               listaNumerosSorteados.push(numeroGenerado)
               return numeroGenerado;
          } 
     }
   
}

//Esta función inicializa el juego, estableciendo el mensaje inicial, generando el número secreto y deshabilitando el botón de reinicio.
function condicionesIniciales(){
     asignarTextoElemento('h1','Juego del numero secreto!');
     asignarTextoElemento('p',`Indica un numero del 1 al ${numeroMaximo}`);
     numeroSecreto = generarNumeroSecreto();
     intentos = 1;
     console.log(numeroSecreto);
     document.querySelector('#reiniciar').setAttribute('disabled','true');
}

//Esta función reinicia el juego, limpiando el campo de entrada, generando un nuevo número secreto y habilitando el botón de reinicio.
function reiniciarJuego() {
     //Limpiar la caja
     limpiarCaja();
     //Indicar mensaje de intervalo de numeros
     //Generar numero aleatorio
     //Inicializar el numero de  intentos    
     condicionesIniciales();
     //Deshabilitar el boton de nuevo juego
}

condicionesIniciales();
