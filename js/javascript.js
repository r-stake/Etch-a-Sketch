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
const colorSelections = document.querySelectorAll(".color-selection>div");

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
    console.log(rgbValues);
    const rgbRedValue = parseInt(rgbValues[0]);
    const rgbGreenValue = parseInt(rgbValues[1]);
    const rgbBlueValue = parseInt(rgbValues[2]);
    console.log(rgbRedValue);
    console.log(rgbGreenValue);
    console.log(rgbBlueValue);
    return {
        red: rgbRedValue,
        green: rgbGreenValue,
        blue: rgbBlueValue
    };
}

function setColor(rgbRedValue, rgbGreenValue, rgbBlueValue) {
    rgbRed = rgbRedValue;
    rgbGreen = rgbGreenValue;
    rgbBlue = rgbBlueValue;
}

// function updateColorUI() {
//     const currentlySelectedColor = document.querySelector(`.${selector}`);
//     currentlySelectedColor = selector.classList.add("highlighted-color");
// }

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
    });
});
btnClearGrid.addEventListener("click", clearGrid);
btnRandomizeColor.addEventListener("click", () => {
    if (isRandomColor === true) {
        isRandomColor = false;
        rgbRed = 0;
        rgbGreen = 0;
        rgbBlue = 0;
        btnRandomizeColor.classList.remove("selected");
    } else {
        isRandomColor = true;
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