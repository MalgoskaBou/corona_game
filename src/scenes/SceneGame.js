import Phaser from "phaser";
import {
  BULLET,
  TOILET_PAPER,
  VIRUS,
  CELL,
  MOVE_SPEED,
  CELL_BCK,
} from "../utils/const";
import BulletsGroup from "../utils/Bullets";
import { getImageSize } from "../utils/helpers";

export default class SceneGame extends Phaser.Scene {
  preload() {
    this.load.image(BULLET, "img/laserBlue02.png");
    this.load.image(TOILET_PAPER, "img/playerShip1_red.png");
    this.load.image(VIRUS, "img/coin.png");
    this.load.image(CELL, "img/flower.png");
    this.load.image(CELL_BCK, "img/cellBck.jpg");

    this.cursor = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.points = 0;

    this.cameras.main.setBackgroundColor(0x1d1923);
    this.addBckTiles();
    this.bulletGroup = new BulletsGroup(this);
    this.charactersGroup = this.physics.add.group();

    this.addToiletPaper();
    this.addRandomCharacter();
    this.pointsText = this.add.text(10, 10, "POINTS: 0", {
      color: "#000000",
      fontSize: this.cameras.main.width / 40,
    });
    this.addEvents();

    this.physics.add.collider(
      this.charactersGroup,
      this.bulletGroup,
      this.hitCharacter,
      null,
      this
    );
  }

  updatePoints() {
    this.points++;
    this.pointsText.setText(`POINTS: ${this.points}`);
  }

  hitCharacter(character, bullet) {
    if (character.isVirus) {
      this.updatePoints();
    }
    character.destroy();
    bullet.setActive(false);
    bullet.setVisible(false);
    bullet.body.reset(0, 0);
  }

  addBckTiles() {
    this.add
      .tileSprite(
        0,
        0,
        this.cameras.main.width,
        this.cameras.main.height,
        CELL_BCK
      )
      .setOrigin(0);
  }

  addToiletPaper() {
    const centerX = this.cameras.main.width / 2;
    const bottom = this.cameras.main.height;
    this.toiletPaper = this.add.image(centerX, bottom - 90, TOILET_PAPER);
  }

  addCharacter(characterName) {
    const characterScale = characterName === VIRUS ? 0.05 : 0.02;

    const characterWidth =
      getImageSize(characterName, this).width * characterScale;

    const randomXPos = Phaser.Math.Between(
      0,
      this.cameras.main.width - characterWidth
    );

    const character = this.physics.add
      .image(randomXPos, 0, characterName)
      .setOrigin(0);

    characterName === VIRUS
      ? (character.isVirus = true)
      : (character.isVirus = false);
    character.scale = characterScale;
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

  addEvents() {
    this.inputKeys = [
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
    ];

    this.timer = this.time.addEvent({
      delay: 3000,
      callback: this.addRandomCharacter,
      callbackScope: this,
      loop: true,
    });
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
        console.log(child.isVirus);
      }
    });

    if (this.cursor.left.isDown) {
      this.toiletPaper.x -= MOVE_SPEED;
    }
    if (this.cursor.right.isDown) {
      this.toiletPaper.x += MOVE_SPEED;
    }
  }
}
