let n = 16;
let mousePressed = false;
let rgbRed = 0;
let rgbGreen = 0;
let rgbBlue = 0;
let rgbRedToggled = 0;
let rgbGreenToggled = 0;
let rgbBlueToggled = 0;
let rgbRedSquare = 0;
let rgbGreenSquare = 0;
let rgbBlueSquare = 0;
let isRandomColor = false;
let isColorToggled = false;
let isEraserToggled = false;
let isDarkenToggled = false;

const container = document.querySelector(".container");
const btnResizeGrid = document.querySelector(".grid-size");
const btnClearGrid = document.querySelector(".clear-grid");
const btnRandomizeColor = document.querySelector(".randomize-color");
const colorSelections = document.querySelectorAll(".color-selection>div");
const displaySelectedColor = document.querySelector(".currently-selected-color");
const btnEraser = document.querySelector(".eraser");
const btnDarkeningEffect = document.querySelector(".darkening");

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
    if (isDarkenToggled === true ) {
        const computedStyle = window.getComputedStyle(element);
        const squareColor = computedStyle.backgroundColor;
        const squareRgbValues = squareColor.match(/\d+/g);
        rgbRedSquare = parseInt(squareRgbValues[0]) - 25;
        rgbGreenSquare = parseInt(squareRgbValues[1]) - 25;
        rgbBlueSquare = parseInt(squareRgbValues[2]) - 25;
        if (rgbRedSquare < 0) {
            rgbRedSquare = 0;
        }
        if (rgbGreenSquare < 0) {
            rgbGreenSquare = 0;
        }
        if (rgbBlueSquare < 0) {
            rgbBlueSquare = 0;
        }
    } else {
        const computedStyle = window.getComputedStyle(element);
        const color = computedStyle.backgroundColor;
        const rgbValues = color.match(/\d+/g);
        rgbRedToggled = parseInt(rgbValues[0]);
        rgbGreenToggled = parseInt(rgbValues[1]);
        rgbBlueToggled = parseInt(rgbValues[2]);
    }
    
}

function setColor() {
    if (isRandomColor === true) {
        randomizeColor();
    } else if (isEraserToggled === true) {
        rgbRed = 255;
        rgbGreen = 255;
        rgbBlue = 255;
    } else if (isColorToggled === true) {
        rgbRed = rgbRedToggled;
        rgbGreen = rgbGreenToggled;
        rgbBlue = rgbBlueToggled;
    } else {
        rgbRed = 0;
        rgbGreen = 0;
        rgbBlue = 0;
    }
}

function updateColorUI(selection) {
    if (isRandomColor === true) {
        displaySelectedColor.style.background = `linear-gradient(to right, red, orange, yellow, green, aqua, blue, darkblue, purple)`;
    } else if (isEraserToggled === true) {
        displaySelectedColor.style.background = ``;
        displaySelectedColor.style.backgroundColor = `rgb(${rgbRed}, ${rgbGreen}, ${rgbBlue})`;
    }
    else {
        displaySelectedColor.style.background = ``;
        displaySelectedColor.style.backgroundColor = `rgb(${rgbRed}, ${rgbGreen}, ${rgbBlue})`;
    }
    if (selection) {
        if (selection.classList.contains("highlighted-color")) {
            selection.classList.remove("highlighted-color");
            isColorToggled = false;
            displaySelectedColor.style.backgroundColor = `rgb(${rgbRed}, ${rgbGreen}, ${rgbBlue})`;
        } else if (isColorToggled === true) {
            colorSelections.forEach(selection => {
                selection.classList.remove("highlighted-color");
            });
            selection.classList.add("highlighted-color");
            displaySelectedColor.style.backgroundColor = `rgb(${rgbRed}, ${rgbGreen}, ${rgbBlue})`;
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
            setColor();
            if (isDarkenToggled === true) {
                getColor(this);
                item.style.backgroundColor = `rgb(${rgbRedSquare}, ${rgbGreenSquare}, ${rgbBlueSquare})`;
            }
            else {
                item.style.backgroundColor = `rgb(${rgbRed}, ${rgbGreen}, ${rgbBlue})`;
            }
        });
    });
    
    grid.forEach(item => {
        item.addEventListener("mouseenter", function() {
            event.stopPropagation();
            if (mousePressed === true) {
                setColor();
                if (isDarkenToggled === true) {
                    getColor(this);
                    item.style.backgroundColor = `rgb(${rgbRedSquare}, ${rgbGreenSquare}, ${rgbBlueSquare})`;
                }
                else {
                    item.style.backgroundColor = `rgb(${rgbRed}, ${rgbGreen}, ${rgbBlue})`;
                }
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
        if (isRandomColor === true || isEraserToggled === true) {
            isRandomColor = false;
            isEraserToggled = false;
            btnRandomizeColor.classList.remove("selected");
            btnEraser.classList.remove("selected");
        }
        if (isColorToggled === false) {
            isColorToggled = true;
        } else {
            if (selection.classList.contains("highlighted-color")) {
                selection.classList.remove("highlighted-color");
                isColorToggled = false;
            }
        }
        getColor(this);
        setColor();
        updateColorUI(selection);
    });
});

btnClearGrid.addEventListener("click", clearGrid);

btnRandomizeColor.addEventListener("click", () => {
    if (isRandomColor === true) {
        isRandomColor = false;
        setColor();
        updateColorUI();
        btnRandomizeColor.classList.remove("selected");
    } else {
        if (isEraserToggled === true) {
            isEraserToggled = false;
            btnEraser.classList.remove("selected");
        }
        isRandomColor = true;
        setColor();
        updateColorUI();
        btnRandomizeColor.classList.add("selected");
    }
});

btnEraser.addEventListener("click", () => {
    if (isEraserToggled === true) {
        isEraserToggled = false;
        setColor();
        updateColorUI();
        btnEraser.classList.remove("selected");
    } else {
        if (isRandomColor === true) {
            isRandomColor = false;
        }
        isEraserToggled = true;
        btnRandomizeColor.classList.remove("selected");
        setColor();
        updateColorUI();
        btnEraser.classList.add("selected");
    }
});

btnDarkeningEffect.addEventListener("click", () => {
    if (isDarkenToggled === true) {
        isDarkenToggled = false;
        btnDarkeningEffect.classList.remove("selected");
    } else {
        isDarkenToggled = true;
        btnDarkeningEffect.classList.add("selected");
    }
})

container.addEventListener("mouseenter", () => {
    sketch();
});

container.addEventListener("mouseleave", () => {
    mousePressed = false;
});

createGrid(n);