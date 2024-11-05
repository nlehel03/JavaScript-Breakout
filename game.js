function randomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

document.addEventListener("DOMContentLoaded", () => {
  const bricksContainer = document.querySelector(".bricks");
  const rows = 10;
  const cols = 40;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const b = document.createElement("div");
      if (i < 2) {
        b.style.backgroundColor = "red";
      } else if (i < 4) {
        b.style.backgroundColor = "orange";
      } else if (i < 6) {
        b.style.backgroundColor = "yellow";
      } else if (i < 8) {
        b.style.backgroundColor = "#33FF33";
      } else if (i < 10) {
        b.style.backgroundColor = "#0080FF";
      }
      b.classList.add("brick");
      bricksContainer.appendChild(b);
    }
  }
});
