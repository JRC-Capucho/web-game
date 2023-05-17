const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 1000;

const collisionsMap = [];

for (let i = 0; i < collisions.length; i += 32) {
  collisionsMap.push(collisions.slice(i, 32 + i));
}

class Boundary {
  static width = 128 // tamanho do mapa vezes o zoom 32 largura com 4 por causa do zoom de 400 
  static height = 128 // "" 32 de altura ""
  constructor({ position }) {
    this.position = position;
    this.width = 128;
    this.height = 128;
  }
  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const boundaries = [];

const offset = {
    x: -1666,
    y: -2250,
}

collisionsMap.forEach((row, i) => {
  row.forEach((Symbol, j) => {
    if (Symbol === 1106)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
        },
      })
    );
  });
});


const image = new Image();
image.src = "./img/Map-1.png"; // fonte image

const playerImage = new Image();
playerImage.src = "./img/player.png"; // fonte da imagem

// Configuração de controle
const keys = {
  w: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

// Interação do teclado com o jogo
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = true;
      break;
    case "s":
      keys.s.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case "d":
      keys.d.pressed = true;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
  }
});

class Sprite {
  constructor({ position, image }) {
    this.position = position;
    this.image = image;
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}


const referencePoint = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

// Animação
function animation() {
  window.requestAnimationFrame(animation);
  referencePoint.draw();
  boundaries.forEach(boundary => {
    boundary.draw()
  })

  // Montar a imagem
  c.drawImage(
    playerImage,
    0, // Inicio do sprite
    0, // Altura do sprite
    playerImage.width / 4, // Recorde do sprite vertical
    playerImage.height, // Recorde do sprite na horizontal
    canvas.width / 2 - playerImage.width / 4 / 2, // coordenada X
    canvas.height / 2 - playerImage.height / 2, // coordenada Y
    playerImage.width / 4,
    playerImage.height
  );

  if (keys.w.pressed) referencePoint.position.y += 3;
  if (keys.s.pressed) referencePoint.position.y -= 3;
  if (keys.a.pressed) referencePoint.position.x += 3;
  if (keys.d.pressed) referencePoint.position.x -= 3;
}

animation();
