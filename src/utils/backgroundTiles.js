export const addBckTiles = (scale, imgKey, context) => {
  context.add
    .tileSprite(
      0,
      0,
      context.cameras.main.width / scale,
      context.cameras.main.height / scale,
      imgKey
    )
    .setOrigin(0)
    .setScale(scale);
};
