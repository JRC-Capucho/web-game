const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 1000;

const collisionsMap = [];

for (let i = 0; i < collisions.length; i += 32) {
  collisionsMap.push(collisions.slice(i, 32 + i));
}

const boundaries = [];

const offset = {
  x: -1300,
  y: -1700,
};

collisionsMap.forEach((row, i) => {
  row.forEach((Symbol, j) => {
    if (Symbol === 290)
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
image.src = "./img/mapa_teste.png"; // fonte image

const foregroundImage = new Image();
foregroundImage.src = "./img/foreground_mapa.png";

const playerImageRight = new Image();
playerImageRight.src = "./img/troia.png"; // fonte da imagem

const playerImageLeft = new Image();
playerImageLeft.src = "./img/troia-left.png"; // fonte da imagem

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
  e: {
    pressed: false,
  },
};

// Interação do teclado com o jogo
let lastKey = "";
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
    case "e":
      keys.e.pressed = true;
      lastKey = "e";
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

const player = new Sprite({
  position: {
    //                    128 dimensao da imagem do personagem
    x: canvas.width / 2 - 672 / 4 / 2, // coordenada X,
    y: canvas.height / 2 - 96 / 2, // coordenada Y
  },
  image: playerImageRight, // fonte da imagem
  frames: {
    max: 7, // quantidade de sprites na imagem
  },
  sprites: {
    right: playerImageRight,
    left: playerImageLeft,
  },
});

const referencePoint = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
});

// colisao
function rectagularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

const movables = [referencePoint, ...boundaries, foreground];

// Animação
function animation() {
  window.requestAnimationFrame(animation);
  referencePoint.draw();

  boundaries.forEach((boundary) => {
    boundary.draw();
  });

  player.draw();
  foreground.draw();

  let moving = true;
  player.moving = false;
  if (keys.w.pressed) {
    player.moving = true;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectagularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3,
            },
          },
        })
      ) {
        // myAlert("Colisao");
        moving = false;
        break;
      } else moving = true;
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3;
      });
  }
  if (keys.s.pressed) {
    player.moving = true;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectagularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      } else moving = true;
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3;
      });
  }
  if (keys.a.pressed) {
    player.moving = true;
    player.image = player.sprites.left; // mudar de sprite
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectagularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      } else moving = true;
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3;
      });
  }
  if (keys.d.pressed) {
    player.moving = true;
    player.image = player.sprites.right; // mudar de sprite
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectagularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      } else moving = true;
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= 3;
      });
  }
}

animation();
