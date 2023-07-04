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
    }
}

function gridSize() {
   n = prompt("Enter grid size");
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