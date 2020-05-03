export const getImageSize = (imgKey, scene) => ({
  width: scene.textures.get(imgKey).getSourceImage().width,
  height: scene.textures.get(imgKey).getSourceImage().height,
});

export const countSizeToGameH = (scale, context) =>
  context.cameras.main.height / scale;

export const scaleImgToGameH = (scalePercent, imgKey, context) => {
  const scene = (context.cameras.main.height * scalePercent) / 100;
  const img = (scene * 100) / getImageSize(imgKey, context).height;
  return img / 100;
};

export const loadAnimation = (spriteKey, animKey, context) => {
  const config = {
    key: animKey,
    frames: context.anims.generateFrameNumbers(spriteKey),
    frameRate: 14,
    repeat: 0,
  };

  context.anims.create(config);
};

export const animComplete = (animation, frame, target, context) => {
  context.tweens.add({
    targets: target,
    duration: 3000,
    alpha: 0,
    onComplete: () => target.destroy(),
  });
};
