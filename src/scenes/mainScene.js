import Phaser from "phaser";

export default class SceneMain extends Phaser.Scene {
  constructor() {
    super("SceneMain");
  }

  fontStyle = {
    font: "40px Arial",
    fill: "#ffffff",
  };

  moveSpeed = 5;

  preload() {
    this.cursor = this.input.keyboard.createCursorKeys();
  }
  init() {
    this.cameras.main.setBackgroundColor("#24252A");
  }
  create() {
    this.helloWorld = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      "Hello World",
      this.fontStyle
    );

    this.add.text(10, 10, "Press the arrow buttons", this.fontStyle);
    this.helloWorld.setOrigin(0.5);
  }
  update() {
    this.helloWorld.angle += 1;
    if (this.cursor.left.isDown) {
      this.helloWorld.x -= this.moveSpeed;
    }
    if (this.cursor.right.isDown) {
      this.helloWorld.x += this.moveSpeed;
    }
    if (this.cursor.up.isDown) {
      this.helloWorld.y -= this.moveSpeed;
    }
    if (this.cursor.down.isDown) {
      this.helloWorld.y += this.moveSpeed;
    }
  }
}
