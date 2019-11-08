const button = document.querySelector(".button");
const text = document.querySelector("#text");

const fisk = ["torsk", "laks", "sei", "makrell"]

let clickCounter = 0;

let timerNum = Math.floor((Math.random() * 6000) + 1000);

button.addEventListener("click", changeText);

function changeText(event) {
    text.textContent = "Snøret ligger i vannet..."
    button.classList.add("hidden")
    setTimeout(timeOutComplete, timerNum)
}

function timeOutComplete() {
    button.classList.remove("hidden");
    let fiskeLykke = Math.floor((Math.random() * 6) + 1);
    let fishNum = Math.floor((Math.random() * 3));
    if (fiskeLykke == 3) {
        text.innerHTML = `Du fikk en ${fisk[fishNum]}!`;
    } else {
        text.innerHTML = "Du fikk ingen fisk!";
    }
}