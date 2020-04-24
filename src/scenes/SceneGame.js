import Phaser from "phaser";
import { BULLET, TOILET_PAPER, VIRUS, CELL } from "../utils/const";
import BulletsGroup from "../utils/Bullets";

export default class SceneGame extends Phaser.Scene {
  preload() {
    this.load.image(BULLET, "img/laserBlue02.png");
    this.load.image(TOILET_PAPER, "img/playerShip1_red.png");
    this.load.image(VIRUS, "img/coin.png");
    this.load.image(CELL, "img/flower.png");
  }

  create() {
    this.cameras.main.setBackgroundColor(0x1d1923);

    this.bulletGroup = new BulletsGroup(this);
    this.charactersGroup = this.physics.add.group();

    this.addToiletPaper();
    this.addRandomCharacter();
    this.addEvents();

    this.physics.add.collider(
      this.charactersGroup,
      this.bulletGroup,
      this.hitVirus,
      null,
      this
    );
  }

  hitVirus(enemy, bullet) {
    enemy.destroy();
    bullet.setActive(false);
    bullet.setVisible(false);
    bullet.body.reset(0, 0);
  }

  addToiletPaper() {
    const centerX = this.cameras.main.width / 2;
    const bottom = this.cameras.main.height;
    this.toiletPaper = this.add.image(centerX, bottom - 90, TOILET_PAPER);
  }

  addEvents() {
    this.input.on("pointermove", (pointer) => {
      this.toiletPaper.x = pointer.x;
    });

    this.input.on("pointerdown", (pointer) => {
      this.fireBullet();
    });

    this.inputKeys = [
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
    ];

    this.time.addEvent({
      delay: 3000,
      callback: this.addRandomCharacter,
      callbackScope: this,
      loop: true,
    });
  }

  addCharacter(characterName) {
    const characterWidth =
      this.textures.get(characterName).getSourceImage().width * 0.1;
    const randomXPos = Phaser.Math.Between(
      0,
      this.cameras.main.width - characterWidth
    );

    const character = this.physics.add
      .image(randomXPos, 0, characterName)
      .setOrigin(0);
    character.scale = 0.1;
    this.charactersGroup.add(character);
    character.setVelocityY(50);
  }

  addRandomCharacter() {
    const rand = Phaser.Math.Between(0, 100);
    rand > 50 ? this.addCharacter(VIRUS) : this.addCharacter(CELL);
  }

  fireBullet() {
    this.bulletGroup.fireBullet(this.toiletPaper.x, this.toiletPaper.y - 20);
  }

  update() {
    this.inputKeys.forEach((key) => {
      if (Phaser.Input.Keyboard.JustDown(key)) {
        this.fireBullet();
      }
    });

    this.charactersGroup.children.iterate((child) => {
      if (child?.y > this.cameras.main.height) {
        child.destroy();
        console.log(this.charactersGroup.children);
      }
    });
  }
}
