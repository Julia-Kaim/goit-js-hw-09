import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const btnStart = document.querySelector("button[data-start]");
const selectedDays = document.querySelector("[data-days]");
const selectedHours = document.querySelector("[data-hours]");
const selectedMinutes = document.querySelector("[data-minutes]");
const selectedSeconds = document.querySelector("[data-seconds]");

btnStart.setAttribute("disabled", true);
let timerId = null;

const convertMs = (ms) => {
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	const days = Math.floor(ms / day);

	const hours = Math.floor((ms % day) / hour);

	const minutes = Math.floor(((ms % day) % hour) / minute);

	const seconds = Math.floor((((ms % day) % hour) % minute) / second);

	return { days, hours, minutes, seconds };
};

const addZero = (value) => String(value).padStart(2, 0);
// console.log(convertMs(2000));
// console.log(convertMs(140000));
// console.log(convertMs(24140000));
const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		if (selectedDates[0] < new Date()) {
			Notify.failure("Please choose a date in the future");
			return;
		}
		btnStart.removeAttribute("disabled");

		const onStart = () => {
			const nowDate = new Date();
			localStorage.setItem("selectedData", selectedDates[0]);
			const choosenData = new Date(localStorage.getItem("selectedData"));
			if (!choosenData) return;

			const countdown = choosenData - nowDate;
			const { days, hours, minutes, seconds } = convertMs(countdown);
			selectedDays.textContent = days;
			selectedHours.textContent = addZero(hours);
			selectedMinutes.textContent = addZero(minutes);
			selectedSeconds.textContent = addZero(seconds);

			if (
				selectedDays.textContent === "0" &&
				selectedHours.textContent === "00" &&
				selectedMinutes.textContent === "00" &&
				selectedSeconds.textContent === "00"
			) {
				clearInterval(timerId);
			}
		};

		const onClick = () => {
			if (timerId) {
				clearInterval(timerId);
			}
			onStart();
			timerId = setInterval(onStart, 1000);
		};

		btnStart.addEventListener("click", onClick);
	},
};

flatpickr("#datetime-picker", { ...options });
