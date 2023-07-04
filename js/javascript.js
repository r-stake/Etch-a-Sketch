// Create a 16x16 grid of square divs
const container = document.querySelector(".container");
for (let i = 0; i < 256; i++) {
    const divSquare = document.createElement("div");
    container.appendChild(divSquare);
}

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
})

console.log(grid);