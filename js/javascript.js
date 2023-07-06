let n = 16;
let mousePressed = false;
let rgbRed = 0;
let rgbGreen = 0;
let rgbBlue = 0;
const colorValues = {
    rgbRedToggled: 0,
    rgbGreenToggled: 0,
    rgbBlueToggled: 0
}
let isRandomColor = false;

const container = document.querySelector(".container");
const btnResizeGrid = document.querySelector(".grid-size");
const btnClearGrid = document.querySelector(".clear-grid");
const btnRandomizeColor = document.querySelector(".randomize-color");
const colorSelections = document.querySelectorAll(".color-selection>div");
const currentlySelectedColor = document.querySelector(".currently-selected-color");

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
        userInput = +prompt("Enter the number of squares per side (1-100)");
    }
    n = userInput;
    userInput = 0
    createGrid(n);
}

function getColor(element) {
    const computedStyle = window.getComputedStyle(element);
    const color = computedStyle.backgroundColor;
    const rgbValues = color.match(/\d+/g);
    rgbRedToggled = parseInt(rgbValues[0]);
    rgbGreenToggled = parseInt(rgbValues[1]);
    rgbBlueToggled = parseInt(rgbValues[2]);
    return {
        red: rgbRedToggled,
        green: rgbGreenToggled,
        blue: rgbBlueToggled
    };
}

function setColor(rgbRedValue, rgbGreenValue, rgbBlueValue) {
    rgbRed = rgbRedValue;
    rgbGreen = rgbGreenValue;
    rgbBlue = rgbBlueValue;
}

function updateColorUI(selection) {
    if (selection.classList.contains("highlighted-color")) {
        selection.classList.remove("highlighted-color");
        defaultColor();
    } else {
        colorSelections.forEach(selection => {
            selection.classList.remove("highlighted-color");
        });
        selection.classList.add("highlighted-color");
        currentlySelectedColor.style.backgroundColor = `rgb(${rgbRed}, ${rgbGreen}, ${rgbBlue})`;
    }
}

function defaultColor() {
    for (let i = 0; i < colorSelections.length; i++) {
        if (colorSelections[i].classList.contains("highlighted-color")) {
            rgbRed = rgbRedToggled;
            rgbGreen = rgbGreenToggled;
            rgbBlue = rgbBlueToggled;
            currentlySelectedColor.style.backgroundColor = `rgb(${rgbRed}, ${rgbGreen}, ${rgbBlue})`;
            break;
        } else {
            rgbRed = 0;
            rgbGreen = 0;
            rgbBlue = 0;
            currentlySelectedColor.style.backgroundColor = `rgb(${rgbRed}, ${rgbGreen}, ${rgbBlue})`;
        }
    }
}

function clearGrid() {
    const grid = document.querySelectorAll(".container>div")
    grid.forEach(item => {
        item.style.backgroundColor = "white";
    })
}

function randomizeColor() {
    rgbRed = Math.floor(Math.random() * 256);
    rgbGreen = Math.floor(Math.random() * 256);
    rgbBlue = Math.floor(Math.random() * 256);
}

function sketch() {
    const grid = document.querySelectorAll(".container>div");

    grid.forEach(item => {
        item.addEventListener("mousedown", function () {
            mousePressed = true;
            if (isRandomColor === true) {
                randomizeColor();
            }
            item.style.backgroundColor = `rgb(${rgbRed}, ${rgbGreen}, ${rgbBlue})`;
        });
    });
    
    grid.forEach(item => {
        item.addEventListener("mouseenter", function() {
            if (mousePressed === true) {
                if (isRandomColor === true) {
                    randomizeColor();
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
colorSelections.forEach(selection => {
    selection.addEventListener("click", function() {
        const colorValues = getColor(this);
        setColor(colorValues.red, colorValues.green, colorValues.blue);
        updateColorUI(selection);
    });
});

btnClearGrid.addEventListener("click", clearGrid);
btnRandomizeColor.addEventListener("click", () => {
    if (isRandomColor === true) {
        isRandomColor = false;
        currentlySelectedColor.style.background = ``;
        defaultColor();
        btnRandomizeColor.classList.remove("selected");
    } else {
        isRandomColor = true;
        currentlySelectedColor.style.background = `linear-gradient(to right, red, orange, yellow, green, aqua, blue, darkblue, purple)`;
        btnRandomizeColor.classList.add("selected");
    }
});

container.addEventListener("mouseenter", () => {
    sketchTrue = true;
    sketch();
});

container.addEventListener("mouseleave", () => {
    mousePressed = false;
});

createGrid(n);