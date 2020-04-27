export const getImageSize = (imgKey, scene) => ({
  width: scene.textures.get(imgKey).getSourceImage().width,
  height: scene.textures.get(imgKey).getSourceImage().height,
});

export const scaleTextToGameH = (scale, context) =>
  context.cameras.main.height / scale;

export const scaleImgToGameH = (scalePercent, imgKey, context) => {
  const scene = (context.cameras.main.height * scalePercent) / 100;
  const img = (scene * 100) / getImageSize(imgKey, context).height;
  return img / 100;
};
