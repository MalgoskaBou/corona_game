import React, { useMemo } from "react";
import { IonPhaser } from "@ion-phaser/react";
import { config } from "./game/config";
import { useSelector } from "react-redux";
import { getPoints } from "./redux/reducers/pointReducer";

const style = {
  display: "flex",
  height: "100vh",
};
const App = () => {
  const state = {
    initialize: true,
    game: config,
  };
  const points = useSelector(getPoints);
  const { initialize, game } = state;
  const pGame = useMemo(
    () => <IonPhaser game={game} initialize={initialize} />,
    [initialize, game]
  );

  return (
    <div style={style}>
      {pGame}
      <div>points {points || 0}</div>
    </div>
  );
};

export default App;
