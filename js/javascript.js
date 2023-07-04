// Create a 16x16 grid of square divs
for (let i = 0; i < 256; i++) {
    const container = document.querySelector(".container");
    const divSquare = document.createElement("div");
    container.appendChild(divSquare);
}