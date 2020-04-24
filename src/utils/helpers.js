export const getImageSize = (imgKey, scene) => ({
  width: scene.textures.get(imgKey).getSourceImage().width,
  height: scene.textures.get(imgKey).getSourceImage().height,
});
