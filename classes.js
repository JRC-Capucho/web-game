class Sprite {
  constructor({ position, image, frames = { max: 1 } }) {
    this.position = position;
    this.image = image;
    this.frames = frames;
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
  }

  draw() {
    c.drawImage(
      this.image,
      0, // Inicio do sprite
      0, // Altura do sprite
      this.image.width / this.frames.max, // Recorde do sprite vertical
      this.image.height, // Recorde do sprite na horizontal
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    );
  }
}

class Boundary {
  static width = 128; // tamanho do mapa vezes o zoom 32 largura com 4 por causa do zoom de 400
  static height = 128; // "" 32 de altura ""
  constructor({ position }) {
    this.position = position;
    this.width = 128;
    this.height = 128;
  }
  draw() {
    // c.fillStyle = "rba(255,0,0,0.0)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
