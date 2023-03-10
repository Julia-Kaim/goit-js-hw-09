// Napisz skrypt, który po kliknięciu przycisku «Start», raz na sekundę zmienia kolor tła <body> na wartość losową używając stylu inline. Po kliknięciu przycisku «Stop», kolor tła powinien przestać się zmieniać.

// UWAGA
// Zwróć uwagę na to, że przycisk «Start» można klikać w nieskończoność. Zrób tak, żeby przycisk «Start» był nieaktywny, dopóki zmiana tematu jest uruchomiona (disabled).

const body = document.querySelector("body");
const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");

stopBtn.disabled = true;
let timerId = null;

const changeBgColorRandom = () => {
	body.style.backgroundColor = `${randomBodyColorGenerator.getRandomHexColor()}`;
}; 


const randomBodyColorGenerator = {


	getRandomHexColor() {
		return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
	},

	// interval() {
	// 	timerId = setInterval(() => {
	// 		changeBgColorRandom();
	// 	}, 1000);
	// 	stopBtn.disabled = false;
	// },

	start() {
startBtn.addEventListener("click", () => {
timerId = setInterval(() => {
  changeBgColorRandom();
		}, 1000);
			// this.interval();
			startBtn.disabled = true;
			stopBtn.disabled = false;
		});

		stopBtn.addEventListener("click", this.stop);
	},

	stop() {
clearInterval(timerId);
stopBtn.disabled = true;
startBtn.disabled = false;
},
		
	
};



randomBodyColorGenerator.start();



