import React, { useMemo } from "react";
import { IonPhaser } from "@ion-phaser/react";
import { config } from "./game/config";
import { useSelector } from "react-redux";
import { getPoints } from "./redux/reducers/pointReducer";
import { isMobileDevice } from "./game/utils/isMobile";

const reactDiv = {
  display: "flex",
  height: "100vh",
};
const infoDiv = {
  padding: "20px",
};

const img = {
  height: "35px",
  width: "35px",
  position: "relative",
  top: "14px",
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
    <div style={reactDiv}>
      {pGame}
      {isMobileDevice() ? null : (
        <div style={infoDiv}>
          <p>points {points || 0}</p>
          <p>
            Morduj wirusa -> <img src="img/virus.png" style={img} />
          </p>
          <p>
            Nie morduj komórki -> <img src="img/cell.png" style={img} />
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
