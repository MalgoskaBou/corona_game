import { ARROW_BTN, FIRE_BTN } from "../utils/const";
import { fireBullet } from "../gameElements/shooting";

export const addButtons = (isMoving, context) => {
  const fire = context.add
    .image(
      context.cameras.main.width / 2,
      context.cameras.main.height,
      FIRE_BTN
    )
    .setOrigin(0.5, 1)
    .setDepth(1);

  const arrowR = context.add
    .image(
      context.cameras.main.width / 2 + fire.displayWidth,
      context.cameras.main.height,
      ARROW_BTN
    )
    .setOrigin(0, 1)
    .setDepth(1);

  const arrowL = context.add
    .image(
      context.cameras.main.width / 2 - fire.displayWidth,
      context.cameras.main.height,
      ARROW_BTN
    )
    .setOrigin(1, 1)
    .setDepth(1)
    .setFlipX(true);

  arrowR.setInteractive().on("pointerdown", () => (isMoving.right = true));
  arrowL.setInteractive().on("pointerdown", () => (isMoving.left = true));

  arrowR.setInteractive().on("pointerup", () => (isMoving.right = false));
  arrowL.setInteractive().on("pointerup", () => (isMoving.left = false));

  fire.setInteractive().on("pointerdown", () => fireBullet(context));
};
