import { scaleTextToGameH } from "./helpers";

export const addPointsText = (context) => {
  context.pointsText = context.add.text(10, 10, "POINTS: 0", {
    color: "#000000",
    fontSize: scaleTextToGameH(30, context),
  });
};

export const updatePoints = (context) => {
  context.points++;
  context.pointsText.setText(`POINTS: ${context.points}`);
};
