import { getImageSize, scaleImgToGameH } from "../utils/helpers";

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

export const addBottomTiles = (scale, imgKey, context) => {
  const imgHeight = getImageSize(imgKey, context).height;
  const scaleToGameSize = scaleImgToGameH(scale, imgKey, context);

  context.add
    .tileSprite(
      0,
      context.cameras.main.height,
      context.cameras.main.width / scaleToGameSize,
      imgHeight,
      imgKey
    )
    .setOrigin(0, 1)
    .setScale(scaleToGameSize)
    .setDepth(1);
};
