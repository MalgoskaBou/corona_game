import React, { Component } from "react";
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
  return (
    <div style={style}>
      <IonPhaser game={game} initialize={initialize} />
      <div>points {points}</div>
    </div>
  );
};

export default App;
