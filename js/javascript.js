// Create a 16x16 grid of square divs
const container = document.querySelector(".container");

let n = 16;
function createGrid(n) {
    const grid = document.querySelectorAll(".container>div");
    grid.forEach(item => {
        container.removeChild(item);
    })
    for (let i = 0; i < n*n; i++) {
        const divSquare = document.createElement("div");
        container.appendChild(divSquare);
        const squareSize = 100 / n;
        divSquare.style.width = `calc(${squareSize}% - 2px)`;
        divSquare.style.paddingTop = `calc(${squareSize}% - 2px)`;
    }
}

function gridSize() {
    let userInput = 0;
    while (!userInput || userInput > 100) {
        userInput = +prompt("Enter grid size");
    }
    n = userInput;
    userInput = 0
    createGrid(n);
    sketch();
}

function sketch() {
    let mousePressed = false;
    const grid = document.querySelectorAll(".container>div");
grid.forEach(item => {
    item.addEventListener("mousedown", function () {
        mousePressed = true;
        item.style.backgroundColor = "black";
    })
});

grid.forEach(item => {
    item.addEventListener("mouseover", function() {
        if (mousePressed) {
            item.style.backgroundColor = "black";
        }
    })
});

grid.forEach(item => {
    item.addEventListener("mouseup", function() {
        mousePressed = false;
    })
});

console.log(grid);

}

const btn = document.querySelector(".grid-size");
btn.addEventListener("click", gridSize)

createGrid(n);
sketch();