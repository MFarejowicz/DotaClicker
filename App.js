/** Dota Clicker, 2018, Matt Farejowicz */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { GameLoop } from 'react-native-game-engine';
import Modal from 'react-native-modal';
import StatsBar from './components/StatsBar.js';
import MenuBar from './components/MenuBar.js';
import Barracks from './components/Barracks.js';
import Enemy from './components/Enemy.js';
import Usables from './components/Usables.js';
import Character from './components/Character.js';
var Sound = require('react-native-sound');

function makeSound(name) {
  var sound = new Sound(name, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    console.log('duration in seconds: ' + sound.getDuration() +
                'number of channels: ' + sound.getNumberOfChannels());
  });
  return sound;
}
var coins = makeSound('coins.mp3');

function getRandomInt(min, max) {
  // Generates a random integer between min and max, inclusive.
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function round(value) {
  // Rounds a number to 2 decimal points.
  return parseFloat(value.toFixed(2));
}

//NOTE: Anywhere there is textAlign: 'center', you can achieve the same effect
//by wrapping it in a view and setting alignItems: 'center' for that view.
//I don't know which is better, so I'm using textAlign for now.

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gold: 600,
      damage: 47,
      cs: 0,
      enemyType: "Dire Creep",
      enemyMaxHealth: 550,
      enemyHealth: 550,
      level: 1,
      maxEXP: 400,
      currEXP: 0,
      maxHP: 650,
      currHP: 650,
      hpRegen: 2.3,
      maxMana: 280,
      currMana: 280,
      manaRegen: 0.9,
      isShopVisible: false,
      isSkilltreeVisible: false,
      isBarracksVisible: false,
      troops: {}
    }
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 20);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick = () => {
    // A tick happens every 1/50th of a second, so any per second stats need
    // to be divided by 50 to be accurate.
    let newHP = this.state.currHP + (this.state.hpRegen/50);
    if (newHP > this.state.maxHP) {
      newHP = this.state.maxHP;
    }
    let newMana = this.state.currMana + (this.state.manaRegen/50);
    if (newMana > this.state.maxMana) {
      newMana = this.state.maxMana;
    }
    let newEnemyHealth = this.state.enemyHealth - (this.state.cs/50);
    this.handleEnemyHealth(newEnemyHealth);

    this.setState({
      currHP: newHP,
      currMana: newMana
    });
  }

  toggleShop = () => {
    this.setState({ isShopVisible: !this.state.isShopVisible });
  }

  toggleSkilltree = () => {
    this.setState({ isSkilltreeVisible: !this.state.isSkilltreeVisible });
  }

  toggleBarracks = () => {
    this.setState({ isBarracksVisible: !this.state.isBarracksVisible });
  }

  handleRecruit = (code, cs, cost) => {
    let newTroops = Object.assign({}, this.state.troops);
    if (newTroops[code]) {
      newTroops[code] += 1;
    } else {
      newTroops[code] = 1;
    }
    this.setState({
      gold: this.state.gold - cost,
      cs: this.state.cs + cs,
      troops: newTroops
    });
  }

  handleEnemyPress = () => {
    var newEnemyHealth = this.state.enemyHealth - this.state.damage;
    this.handleEnemyHealth(newEnemyHealth);
  }

  handleEnemyHealth = (newEnemyHealth) => {
    if (newEnemyHealth > 0) { // Enemy still alive after tap
      this.setState({enemyHealth: newEnemyHealth});
    } else { // Enemy dead after tap
      var newEXP = this.state.currEXP + 10; //Calculate XP gain first

      if (newEXP < this.state.maxEXP) { // Non level-up case
        this.setState((prevState) => {
          return {
            gold: prevState.gold + getRandomInt(35, 41),
            currEXP: newEXP,
            enemyHealth: 550
          }
        });
      } else { // Level-up case
        this.setState((prevState) => {
          return {
            gold: prevState.gold + getRandomInt(35, 41),
            level: prevState.level + 1,
            currEXP: newEXP - prevState.maxEXP,
            maxEXP: round(prevState.maxEXP * 1.2),
            enemyHealth: 550
          }
        })
      }

      coins.stop(() => {
        coins.play();
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Dota Clicker
        </Text>
        <StatsBar
          gold={this.state.gold}
          damage={this.state.damage}
          cs={this.state.cs}
        />
      <MenuBar
        openShop={this.toggleShop}
        openSkilltree={this.toggleSkilltree}
        openBarracks={this.toggleBarracks}/>
        <Modal isVisible={this.state.isBarracksVisible}
          backdropColor="#d3d3d3" backdropOpacity={1}>
          <Barracks handleClose={this.toggleBarracks}
            gold={this.state.gold} cs={this.state.cs}
            troops={this.state.troops} handleRecruit={this.handleRecruit}/>
        </Modal>
        <Enemy
          type={this.state.enemyType}
          maxHealth={this.state.enemyMaxHealth}
          health={this.state.enemyHealth}
          handlePress={this.handleEnemyPress}
        />
        <Usables />
        <Character level={this.state.level}
          maxEXP={this.state.maxEXP} currEXP={this.state.currEXP}
          maxHP={this.state.maxHP} currHP={this.state.currHP}
          maxMana={this.state.maxMana} currMana={this.state.currMana}
          hpRegen={this.state.hpRegen} manaRegen={this.state.manaRegen}
        />
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5a5a5a',
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    marginBottom: 5,
    fontFamily: 'Asimov',
    fontSize: 32,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
  }
});

export default App;
