import { updatePoints } from "./points";

export const hitCharacter = (character, bullet, context) => {
  if (character.isVirus) {
    updatePoints(context);
  }
  character.destroy();
  bullet.setActive(false);
  bullet.setVisible(false);
  bullet.body.reset(0, 0);
};

export const fireBullet = (context) => {
  context.bulletGroup.fireBullet(
    context.toiletPaper.x,
    context.toiletPaper.y - 20
  );
  context.toiletPaper.play("fire");
};
