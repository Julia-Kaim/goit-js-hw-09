// Napisz skrypt, który po kliknięciu przycisku «Start», raz na sekundę zmienia kolor tła <body> na wartość losową używając stylu inline. Po kliknięciu przycisku «Stop», kolor tła powinien przestać się zmieniać.

// UWAGA
// Zwróć uwagę na to, że przycisk «Start» można klikać w nieskończoność. Zrób tak, żeby przycisk «Start» był nieaktywny, dopóki zmiana tematu jest uruchomiona (disabled).


const startBtn = document.querySelector("data-start");
const stopBtn = document.querySelector("data-stop");
let timerId = null;

startBtn.addEventListener("click", () => {
  timerId = setInterval(() => {
    
  }, 1000);
});


stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
  console.log(`Interval with id ${timerId} has stopped!`);
});




function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
