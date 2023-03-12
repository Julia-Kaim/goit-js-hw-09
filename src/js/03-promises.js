import { Notify } from "notiflix/build/notiflix-notify-aio";

const form = document.querySelector(".form");
// const amount = document.querySelector("[amount]");
// const delay = document.querySelector("[delay]");
// const step = document.querySelector("[step]");

let delayInput = null;
let stepInput = null;
let amountInput = null;

const createPromise = (position, delay) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const shouldResolve = Math.random() > 0.3;
			if (shouldResolve) {
				resolve({ position, delay });
			} else {
				reject({ position, delay });
			}
		}, delay);
	});
};

const submit = (e) => {
	e.preventDefault();
	if (!e.target.tagName === "BUTTON") return;

	const {
		elements: { delay, step, amount },
	} = e.currentTarget;

	delayInput = Number(delay.value);
	stepInput = Number(step.value);
	amountInput = Number(amount.value);

	for (let i = 1; i <= amountInput; i++) {
		createPromise(i, delayInput)
			.then(({ position, delay }) => {
				Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
			})
			.catch(({ position, delay }) => {
				Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
			});
		delayInput += stepInput;
	}

	e.currentTarget.reset();
};

form.addEventListener("submit", submit);
