import { updatePoints } from "./points";

export const hitCharacter = (character, bullet, context) => {
  if (character.isVirus) {
    updatePoints(context);
    context.virus_audio.play();
  } else {
    context.cell_audio.play();
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
  context.shoot_audio.play();
};
