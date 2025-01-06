const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const kockaSzelesseg = canvasWidth / 40; // 40 kocka egy sorban
const kockaMagassag = kockaSzelesseg; // 1:1 arányú, tehát magasság = szélesség

const kezdoY = canvasHeight * 0.1; // 10%-tól kezdődik
const vegeY = canvasHeight * 0.5; // 50%-ig tartanak a kockák
const maxSor = Math.floor((vegeY - kezdoY) / kockaMagassag); // Sorok száma

// Véletlenszerű szín generálása
function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
}

// Kockák kirajzolása
for (let i = 0; i < 40; i++) {
  // 40 kocka egy sorban
  for (let j = 0; j < maxSor; j++) {
    // 40 kocka függőlegesen, de csak a képernyő feléig
    const x = i * kockaSzelesseg;
    const y = kezdoY + j * kockaMagassag;

    ctx.fillStyle = randomColor(); // Véletlenszerű szín
    ctx.fillRect(x, y, kockaSzelesseg, kockaMagassag); // Kocka kirajzolása
  }
}

