const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 1000;

c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

const image = new Image();
image.src = "./Map-1.png";
console.log(image);

const playerImage = new Image();
playerImage.src = "./player.png";

image.onload = () => {
  c.drawImage(
    image, // image
    -1666, // coondenada X
    -2250 // coordenada Y
  );
  c.drawImage(
    playerImage,
    0, // Inicio do sprite
    0, // Altura do sprite
    playerImage.width / 4, // Recorde do sprite vertical
    playerImage.height, // Recorde do sprite na horizontal
    canvas.width / 2 - playerImage.width / 2, // coordenada X
    canvas.height / 2 - playerImage.height / 2, // coordenada Y
    playerImage.width / 4,
    playerImage.height
  );
};
