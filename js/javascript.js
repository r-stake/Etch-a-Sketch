let n = 16;
let mousePressed = false;
let rgbRed = 0;
let rgbGreen = 0;
let rgbBlue = 0;
let isRandomColor = false;

const container = document.querySelector(".container");
const btnResizeGrid = document.querySelector(".grid-size");
const btnClearGrid = document.querySelector(".clear-grid");
const btnRandomizeColor = document.querySelector(".randomize-color");

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

function resizeGrid() {
    let userInput = 0;
    while (!userInput || userInput > 100) {
        userInput = +prompt("Enter grid size");
    }
    n = userInput;
    userInput = 0
    createGrid(n);
}

function clearGrid() {
    const grid = document.querySelectorAll(".container>div")
    grid.forEach(item => {
        item.style.backgroundColor = "white";
    })
}

function sketch() {
    const grid = document.querySelectorAll(".container>div");

    grid.forEach(item => {
        item.addEventListener("mousedown", function () {
            mousePressed = true;
            if (isRandomColor) {
                rgbRed = Math.floor(Math.random() * 256);
                rgbGreen = Math.floor(Math.random() * 256);
                rgbBlue = Math.floor(Math.random() * 256);
            }
            item.style.backgroundColor = `rgb(${rgbRed}${rgbGreen}${rgbBlue})`;
        });
    });
    
    grid.forEach(item => {
        item.addEventListener("mouseenter", function() {
            if (mousePressed) {
                if (isRandomColor) {
                    rgbRed = Math.floor(Math.random() * 256);
                    rgbGreen = Math.floor(Math.random() * 256);
                    rgbBlue = Math.floor(Math.random() * 256);
                }
                item.style.backgroundColor = `rgb(${rgbRed}, ${rgbGreen}, ${rgbBlue})`;
            }
        });
    });
    
    grid.forEach(item => {
        item.addEventListener("mouseup", function() {
            mousePressed = false;
        });
    });
}

btnResizeGrid.addEventListener("click", resizeGrid);
btnClearGrid.addEventListener("click", clearGrid);
btnRandomizeColor.addEventListener("click", () => {
    if (isRandomColor) {
        isRandomColor = false;
    } else {
        isRandomColor = true;
    }
})

container.addEventListener("mouseenter", () => {
    sketchTrue = true;
    sketch();
});

container.addEventListener("mouseleave", () => {
    mousePressed = false;
});

createGrid(n);