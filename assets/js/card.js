console.clear();

const { gsap, imagesLoaded } = window;

const buttons = {
	prev: document.querySelector(".btn--left"),
	next: document.querySelector(".btn--right"),
};
const cardsContainerEl = document.querySelector(".cards__wrapper");
const appBgContainerEl = document.querySelector(".app__bg");
const infoElements = document.querySelectorAll('.info')
const cardElements = document.querySelectorAll('.card')
const bgElements = document.querySelectorAll('.app__bg__image')

const cardInfosContainerEl = document.querySelector(".info__wrapper");

let index = 1
let indexNextElement = 2
let indexPreviousElement = 0



buttons.next.addEventListener("click", () => swapCards("right"));

buttons.prev.addEventListener("click", () => swapCards("left"));

function swapCards(direction) {
	const currentCardEl = cardsContainerEl.querySelector(".current--card");
	const previousCardEl = cardsContainerEl.querySelector(".previous--card");
	const nextCardEl = cardsContainerEl.querySelector(".next--card");

	const currentBgImageEl = appBgContainerEl.querySelector(".current--image");
	const previousBgImageEl = appBgContainerEl.querySelector(".previous--image");
	const nextBgImageEl = appBgContainerEl.querySelector(".next--image");
	if (direction == "right") {
		index++
		if (index > document.querySelectorAll(".card").length - 1 ) {
			index = 0
		}
	} else {
		index--
		if (index < 0) {
			index = document.querySelectorAll(".card").length - 1 
		}
	}
	if (direction == "right") {
		indexNextElement++
		if (indexNextElement > document.querySelectorAll(".card").length - 1 ) {
			indexNextElement = 0
		}
	} else {
		indexNextElement--
		if (indexNextElement < 0) {
			indexNextElement = index + 1
		}
	}
	if (direction == "right") {
		indexPreviousElement++
		if (indexPreviousElement > document.querySelectorAll(".card").length - 1 ) {
			indexPreviousElement = 0
		}
	} else {
		indexPreviousElement--
		if (indexPreviousElement < 0) {
			indexPreviousElement = document.querySelectorAll(".card").length - 1 
		}
	}


	changeInfo(direction);
	swapCardsClass();

	removeCardEvents(currentCardEl);

	function swapCardsClass() {
		currentCardEl.classList.remove("current--card");
		previousCardEl.classList.remove("previous--card");
		nextCardEl.classList.remove("next--card");

		currentBgImageEl.classList.remove("current--image");
		previousBgImageEl.classList.remove("previous--image");
		nextBgImageEl.classList.remove("next--image");

		currentCardEl.style.zIndex = "50";
		currentBgImageEl.style.zIndex = "-2";

		if (direction === "right") {
			previousCardEl.style.zIndex = "20";
			nextCardEl.style.zIndex = "30";

			nextBgImageEl.style.zIndex = "-1";

			previousCardEl.classList.add("hide--card");
			nextCardEl.classList.remove("hide--card")
			cardElements[indexNextElement].classList.add("next--card")
			cardElements[indexNextElement].classList.remove("hide--card")
			cardElements[index].classList.add("current--card");
			cardElements[indexPreviousElement].classList.remove("hide--card")
			cardElements[indexPreviousElement].classList.add("previous--card")


			previousBgImageEl.classList.add("hide--image");
			nextCardEl.classList.remove("hide--image")
			bgElements[indexNextElement].classList.add("next--image")
			bgElements[indexNextElement].classList.remove("hide--image")
			bgElements[index].classList.add("current--image");
			bgElements[indexPreviousElement].classList.remove("hide--image")
			bgElements[indexPreviousElement].classList.add("previous--image")
			console.log(bgElements);
		
		} else if (direction === "left") {
			previousCardEl.style.zIndex = "30";
			nextCardEl.style.zIndex = "20";

			previousBgImageEl.style.zIndex = "-1";

			nextCardEl.classList.add("hide--card");
			cardElements[indexNextElement].classList.add("next--card")
			cardElements[index].classList.add("current--card");
			cardElements[indexPreviousElement].classList.remove("hide--card")
			cardElements[indexPreviousElement].classList.add("previous--card")

			nextBgImageEl.classList.add("hide--image");
			bgElements[indexNextElement].classList.add("next--image")
			bgElements[index].classList.add("current--image");
			bgElements[indexPreviousElement].classList.remove("hide--image")
			bgElements[indexPreviousElement].classList.add("previous--image")

			
		}
	}
}

function changeInfo(direction) {
	let currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	let previousInfoEl = cardInfosContainerEl.querySelector(".previous--info");
	let nextInfoEl = cardInfosContainerEl.querySelector(".next--info");

	gsap.timeline()
		.to([buttons.prev, buttons.next], {
		duration: 0.2,
		opacity: 0.5,
		pointerEvents: "none",
	})
		.to(
			
		currentInfoEl.querySelectorAll(".text"),
		{
			duration: 0.4,
			stagger: 0.1,
			translateY: "-120px",
			opacity: 0,
		},
		"-="
	)
		.call(() => {
		swapInfosClass(direction);
	})
		.call(() => initCardEvents())
		.fromTo(
		direction === "right"
		? nextInfoEl.querySelectorAll(".text")
		: previousInfoEl.querySelectorAll(".text"),
		{
			opacity: 0,
			translateY: "40px",
		},
		{
			duration: 0.4,
			stagger: 0.1,
			translateY: "0px",
			opacity: 1,
		}
	)
		.to([buttons.prev, buttons.next], {
		duration: 0.2,
		opacity: 1,
		pointerEvents: "all",
	});

	function swapInfosClass() {
		console.log(infoElements);

		currentInfoEl.classList.remove("current--info");
		previousInfoEl.classList.remove("previous--info");
		nextInfoEl.classList.remove("next--info");

		if (direction === "right") {
			previousInfoEl.classList.add("hide--info");
			nextInfoEl.classList.remove("hide--info")
			infoElements[indexNextElement].classList.add("next--info")
			infoElements[index].classList.add("current--info");
			infoElements[indexPreviousElement].classList.remove("hide--info")
			infoElements[indexPreviousElement].classList.add("previous--info")
			
		} else if (direction === "left") {
			nextInfoEl.classList.add("hide--info");
			infoElements[indexNextElement].classList.add("next--info")
			infoElements[index].classList.add("current--info");
			infoElements[indexPreviousElement].classList.remove("hide--info")
			infoElements[indexPreviousElement].classList.add("previous--info")

		}
	}
}

function updateCard(e) {
	const card = e.currentTarget;
	const box = card.getBoundingClientRect();
	const centerPosition = {
		x: box.left + box.width / 2,
		y: box.top + box.height / 2,
	};
	let angle = Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
	gsap.set(card, {
		"--current-card-rotation-offset": `${angle}deg`,
	});
	const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	gsap.set(currentInfoEl, {
		rotateY: `${angle}deg`,
	});
}

function resetCardTransforms(e) {
	const card = e.currentTarget;
	const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
	gsap.set(card, {
		"--current-card-rotation-offset": 0,
	});
	gsap.set(currentInfoEl, {
		rotateY: 0,
	});
}

function initCardEvents() {
	const currentCardEl = cardsContainerEl.querySelector(".current--card");
	currentCardEl.addEventListener("pointermove", updateCard);
	currentCardEl.addEventListener("pointerout", (e) => {
		resetCardTransforms(e);
	});
}

initCardEvents();

function removeCardEvents(card) {
	card.removeEventListener("pointermove", updateCard);
}

function init() {

	let tl = gsap.timeline();

	tl.to(cardsContainerEl.children, {
		delay: 0.15,
		duration: 0.5,
		stagger: {
			ease: "power4.inOut",
			from: "right",
			amount: 0.1,
		},
		"--card-translateY-offset": "0%",
	})
		.to(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
		delay: 0.5,
		duration: 0.4,
		stagger: 0.1,
		opacity: 1,
		translateY: 0,
	})
		.to(
		[buttons.prev, buttons.next],
		{
			duration: 0.4,
			opacity: 1,
			pointerEvents: "all",
		},
		"-=0.4"
	);
}

const waitForImages = () => {
	const images = [...document.querySelectorAll("img")];
	const totalImages = images.length;
	let loadedImages = 0;
	const loaderEl = document.querySelector(".loader span");

	gsap.set(cardsContainerEl.children, {
		"--card-translateY-offset": "100vh",
	});
	gsap.set(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
		translateY: "40px",
		opacity: 0,
	});
	gsap.set([buttons.prev, buttons.next], {
		pointerEvents: "none",
		opacity: "0",
	});

	images.forEach((image) => {
		imagesLoaded(image, (instance) => {
			if (instance.isComplete) {
				loadedImages++;
				let loadProgress = loadedImages / totalImages;

				gsap.to(loaderEl, {
					duration: 1,
					scaleX: loadProgress,
					backgroundColor: `hsl(${loadProgress * 120}, 100%, 50%`,
				});

				if (totalImages == loadedImages) {
					gsap.timeline()
						.to(".loading__wrapper", {
						duration: 0.8,
						opacity: 0,
						pointerEvents: "none",
					})
						.call(() => init());
				}
			}
		});
	});
};

waitForImages();



