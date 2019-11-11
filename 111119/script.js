const s1b0 = document.querySelector(".scene1 .button-0");
const s1b1 = document.querySelector(".scene1 .button-1");
const s1b2 = document.querySelector(".scene1 .button-2");
const s2b0 = document.querySelector(".scene2 .button-0");
const s3b0 = document.querySelector(".scene3 .button-0");
const s3b1 = document.querySelector(".scene3 .button-1");

let text = document.querySelector(".text");
let scene1 = document.querySelector(".scene1");
let scene2 = document.querySelector(".scene2");
let scene3 = document.querySelector(".scene3");
let scene4 = document.querySelector(".scene4");

// Scene 1
s1b0.addEventListener("click", (e) => {
    scene1.classList.add("hidden");
    scene2.classList.remove("hidden");
});

s1b1.addEventListener("click", (e) => {
    scene1.classList.add("hidden");
    scene2.classList.remove("hidden");
});

s1b2.addEventListener("click", (e) => {
    scene1.classList.add("hidden");
    scene2.classList.add("hidden");
    scene3.classList.remove("hidden");
})

// Scene 2
s2b0.addEventListener("click", (e) => {
    scene1.classList.remove("hidden");
    scene2.classList.add("hidden");
})
    
// Scene 3
s3b0.addEventListener("click", (e) => {
    scene3.classList.add("hidden");
    scene4.classList.remove("hidden");
})








// const text = document.querySelector(".text");
// const button0 = document.querySelector(".button-0");
// const button1 = document.querySelector(".button-1");
// const button2 = document.querySelector(".button-2");

// button0.addEventListener("click", (e) => {
//     alert("🤠 0")
// });

// button1.addEventListener("click", (e) => {
//     alert("🤠 1")
// });

// button2.addEventListener("click", (e) => {
//     alert("🤠 2")
// });

// const buttons = [
//     document.querySelector(".button-0"),
//     document.querySelector(".button-1"),
//     document.querySelector(".button-2")
// ];

// for (i = 0; i < buttons.length; i++) {
//     buttons[i].addEventListener("click", (event) => {
//         alert(`🤠  ${i}`)
//     });
// };