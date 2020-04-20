import React, { Component } from "react";
import { IonPhaser } from "@ion-phaser/react";
import { config } from "./config";

class App extends Component {
  state = {
    initialize: true,
    game: config,
  };

  render() {
    const { initialize, game } = this.state;
    return <IonPhaser game={game} initialize={initialize} />;
  }
}

export default App;
