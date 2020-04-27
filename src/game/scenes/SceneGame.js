import Phaser from "phaser";
import {
  BULLET,
  TOILET_PAPER,
  VIRUS,
  CELL,
  MOVE_SPEED,
  CELL_BCK,
  SHOOT_AUDIO,
  VIRUS_AUDIO,
  CELL_AUDIO,
  CELL_HOME_AUDIO,
} from "../utils/const";
import BulletsGroup from "../gameElements/Bullets";
import { addPointsText, updatePoints } from "../gameElements/points";
import {
  addRandomCharacter,
  addToiletPaper,
  loadToiletAnimation,
} from "../gameElements/characters";
import { addBckTiles } from "../gameElements/backgroundTiles";
import { hitCharacter, fireBullet } from "../gameElements/shooting";
export default class SceneGame extends Phaser.Scene {
  preload() {
    this.load.image(BULLET, "img/laserBlue02.png");
    this.load.image(VIRUS, "img/virus.png");
    this.load.image(CELL, "img/cell.png");
    this.load.image(CELL_BCK, "img/cellBck.jpg");
    this.load.spritesheet(TOILET_PAPER, "img/toilet_paper.png", {
      frameWidth: 300,
      frameHeight: 300,
    });

    this.load.audio(SHOOT_AUDIO, "sounds/shot2.mp3");
    this.load.audio(VIRUS_AUDIO, "sounds/virus2.mp3");
    this.load.audio(CELL_AUDIO, "sounds/cell.mp3");
    this.load.audio(CELL_HOME_AUDIO, "sounds/cell_home.mp3");

    this.cursor = this.input.keyboard.createCursorKeys();
  }

  create() {
    addBckTiles(0.3, CELL_BCK, this);

    this.bulletGroup = new BulletsGroup(this);
    this.charactersGroup = this.physics.add.group();

    addRandomCharacter(this);
    addPointsText(this);
    this.addEvents();

    loadToiletAnimation(this);
    addToiletPaper(this);

    this.shoot_audio = this.sound.add(SHOOT_AUDIO);
    this.virus_audio = this.sound.add(VIRUS_AUDIO);
    this.cell_audio = this.sound.add(CELL_AUDIO);
    this.cell_home_audio = this.sound.add(CELL_HOME_AUDIO);

    this.physics.add.collider(
      this.charactersGroup,
      this.bulletGroup,
      (character, bullet) => hitCharacter(character, bullet, this),
      null,
      this
    );
  }

  update() {
    this.inputKeys.forEach((key) => {
      if (Phaser.Input.Keyboard.JustDown(key)) {
        fireBullet(this);
      }
    });

    this.charactersGroup.children.iterate((child) => {
      if (child?.y > this.cameras.main.height) {
        child.destroy();
        if (!child.isVirus) {
          updatePoints(this);
          this.cell_home_audio.play();
        }
      }
    });

    if (
      this.cursor.left.isDown &&
      this.toiletPaper.x > this.toiletPaper.displayWidth / 2
    ) {
      this.toiletPaper.x -= MOVE_SPEED;
    }
    if (
      this.cursor.right.isDown &&
      this.toiletPaper.x <
        this.cameras.main.width - this.toiletPaper.displayWidth / 2
    ) {
      this.toiletPaper.x += MOVE_SPEED;
    }
  }

  addEvents() {
    this.inputKeys = [
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
    ];

    this.timer = this.time.addEvent({
      delay: 3000,
      callback: () => addRandomCharacter(this),
      callbackScope: this,
      loop: true,
    });
  }
}
