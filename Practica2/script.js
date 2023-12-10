  document.addEventListener('DOMContentLoaded', function () {
    const gameContainer = document.getElementById('game-container');

    //Crea 25 botones y los agrega al contenedor y luego
    for (let i = 0; i < 25; i++) {
        const button = document.createElement('button');
        button.addEventListener('click', () => handleClick(button));
        gameContainer.appendChild(button);
    }

     // Inicializa los números en los botones y los muestra al usuario
    initializeButtonNumbers();
  });


  //Variable para almacenar el número esperado que el usuario debe hacer clic
  let expectedNumber = 1; 


  //Función que controla el click en un boton
  function handleClick(button) {
    const currentNumber = parseInt(button.textContent);

    // Compara el número actual con el expectedNumber
    if (currentNumber === expectedNumber) {
        expectedNumber++;
        //Si el numero es superior a 50 muestra el mensaje de felicitación
        if (expectedNumber > 50) {
            alert("¡Felicidadeees! Has ganado el juego.");
            resetGame();
        } else {
            const newNumber = generateUniqueNumber();
            if (newNumber !== null) {
                button.textContent = newNumber;
            } else {
                button.style.display = 'none';
            }
        }}
    //Si no coincide muestra el siguiente mensaje    
    else {
        alert("Número incorrecto. Vuelve a intentarlo");
    }
  }


  //Función para inicializar los números en los botones
  function initializeButtonNumbers() {
    const buttons = document.getElementsByTagName('button');
    const initialNumbers = Array.from({ length: 25 }, (_, index) => index + 1);
    shuffleArray(initialNumbers);
    //Asigna los numeros a los botones y los muestra
    for (let i = 0; i < buttons.length; i++) {  
        buttons[i].textContent = initialNumbers[i];
        buttons[i].style.display = 'block'; 
    }
  }


  //Funcion que REINICIA el juego
  function resetGame() {
    expectedNumber = 1;

    const buttons = document.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.display = 'block';
    }
    initializeButtonNumbers();
  }


  //Función que mezcla los elementos de una lisat utilizando un algoritmo
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function generateUniqueNumber() {
    const existingNumbers = Array.from(document.getElementsByTagName('button'), button => parseInt(button.textContent));
    const availableNumbers = Array.from({ length: 25 }, (_, index) => index + 26).filter(num => !existingNumbers.includes(num));

    if (availableNumbers.length > 0) {
        const randomNumber = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
        return randomNumber;
    } else {
        return null;
    }
  }