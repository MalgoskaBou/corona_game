import { ARROW_BTN, FIRE_BTN } from "../utils/const";
import { fireBullet } from "../gameElements/shooting";

export const addButtons = (isPressed, context) => {
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

  arrowR.setInteractive().on("pointerdown", () => (isPressed.right = true));
  arrowL.setInteractive().on("pointerdown", () => (isPressed.left = true));

  arrowR.setInteractive().on("pointerup", () => (isPressed.right = false));
  arrowL.setInteractive().on("pointerup", () => (isPressed.left = false));

  fire.setInteractive().on("pointerdown", () => fireBullet(context));
};
