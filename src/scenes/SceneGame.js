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
import {
  getImageSize,
  scaleTextToGameH,
  scaleImgToGameH,
} from "../utils/helpers";

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

    this.cursor = this.input.keyboard.createCursorKeys();
  }

  create() {
    this.points = 0;

    this.addBckTiles();
    this.bulletGroup = new BulletsGroup(this);
    this.charactersGroup = this.physics.add.group();

    this.addRandomCharacter();
    this.addPointsText();
    this.addEvents();

    this.loadToiletAnimation();
    this.addToiletPaper();

    this.physics.add.collider(
      this.charactersGroup,
      this.bulletGroup,
      this.hitCharacter,
      null,
      this
    );
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
        if (!child.isVirus) {
          this.updatePoints();
        }
      }
    });

    if (this.cursor.left.isDown) {
      this.toiletPaper.x -= MOVE_SPEED;
    }
    if (this.cursor.right.isDown) {
      this.toiletPaper.x += MOVE_SPEED;
    }
  }

  addBckTiles() {
    const scale = 0.3;
    this.add
      .tileSprite(
        0,
        0,
        this.cameras.main.width / scale,
        this.cameras.main.height / scale,
        CELL_BCK
      )
      .setOrigin(0)
      .setScale(scale);
  }

  addPointsText() {
    this.pointsText = this.add.text(10, 10, "POINTS: 0", {
      color: "#000000",
      fontSize: scaleTextToGameH(30, this),
    });
  }

  updatePoints() {
    this.points++;
    this.pointsText.setText(`POINTS: ${this.points}`);
  }

  addToiletPaper() {
    const centerX = this.cameras.main.width / 2;
    const bottom = this.cameras.main.height;
    this.toiletPaper = this.add
      .sprite(centerX, bottom - 90, TOILET_PAPER)
      .setScale(scaleImgToGameH(15, TOILET_PAPER, this));
  }

  loadToiletAnimation() {
    const config = {
      key: "fire",
      frames: this.anims.generateFrameNumbers(TOILET_PAPER),
      frameRate: 14,
      repeat: 0,
    };

    this.anims.create(config);
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

  addCharacter(characterName) {
    const characterScale =
      characterName === VIRUS
        ? scaleImgToGameH(12, VIRUS, this)
        : scaleImgToGameH(10, CELL, this);

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
    this.charactersGroup.add(character);
    character.setVelocityY(50).setScale(characterScale);
  }

  addRandomCharacter() {
    const rand = Phaser.Math.Between(0, 100);
    rand > 50 ? this.addCharacter(VIRUS) : this.addCharacter(CELL);
  }

  fireBullet() {
    this.bulletGroup.fireBullet(this.toiletPaper.x, this.toiletPaper.y - 20);
    this.toiletPaper.play("fire");
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
}
