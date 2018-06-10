/**
 * Dota Clicker
 * 2018
 * Matt Farejowicz
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import ProgressCircle from './Components/ProgressCircle.js';
import Slider from './Components/Slider.js';
var Sound = require('react-native-sound');

function makeSound(name) {
  var sound = new Sound(name, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    console.log('duration in seconds: ' + hit1.getDuration() +
                'number of channels: ' + hit1.getNumberOfChannels());
  });
  return sound;
}
var hit1 = makeSound('hit1.mp3');
var hit2 = makeSound('hit2.mp3');
var hit3 = makeSound('hit3.mp3');
var coins = makeSound('coins.mp3');

function getRandomInt(min, max) {
  // Generates a random integer between min and max, inclusive.
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function round(value) {
  // Rounds a number to 2 decimal points.
  return parseFloat(value.toFixed(2));
}

class StatsBar extends Component {
  render() {
    return (
      <View style={styles.statsBar}>
        <Text style={styles.stat}>Gold:{"\n"}{this.props.gold}</Text>
        <Text style={styles.stat}>Damage:{"\n"}{this.props.damage}</Text>
        <Text style={styles.stat}>C/S:{"\n"}{this.props.cs}</Text>
      </View>
    )
  }
}

class MenuItem extends Component {
  onPress = () => {
    console.log(this.props.title);
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.onPress}
        underlayColor='#64a664'
        style={styles.menuItem}>
        <Text style={styles.menuItemText}>
          {this.props.title}
        </Text>
      </TouchableHighlight>
    )
  }
}
// ^ For inner view? borderWidth: 2, borderColor: 'green'

//NOTE: Anywhere there is textAlign: 'center', you can achieve the same effect
//by wrapping it in a view and setting alignItems: 'center' for that view.
//I don't know which is better, so I'm using textAlign for now.

class MenuBar extends Component {
  render() {
    return (
      <View style={styles.menuBar}>
        <MenuItem title={"Barracks"}/>
        <MenuItem title={"Shop"}/>
        <MenuItem title={"Skilltree"}/>
      </View>
    )
  }
}

class Enemy extends Component {

  handlePress = () => {
    var num = getRandomInt(1, 3);

    if (num == 1) {
      hit1.stop(() => {
        // Note: If you want to play a sound after stopping and rewinding it,
        // it is important to call play() in a callback.
        hit1.play();
        hit1.setVolume(0.2);
      });
    } else if (num == 2) {
      hit2.stop(() => {
        hit2.play();
        hit2.setVolume(0.2);
      });
    } else if (num == 3) {
      hit3.stop(() => {
        hit3.play();
        hit3.setVolume(0.2);
      });
    }

    this.props.handlePress();
  }

  render() {
    return (
      <View style={styles.enemy}>
        <Text style={styles.enemyType}>Current enemy: {this.props.type}</Text>
        <TouchableOpacity
          onPress={this.handlePress}
          activeOpacity={0.5}
          style={{alignSelf: 'center'}}>
            <Image
              source={require('./assets/img/creep.png')}
              style={{width: 225, height: 240}}
              resizeMode={'stretch'}
            />
        </TouchableOpacity>
        <View style={styles.enemyDescriptor}>
          <Text style={styles.enemyHPTag}>
            Enemy HP:
          </Text>
          <Slider trackStyle={{height: 30}} style={{flex: 3}} disabled={true}
            maximumValue={this.props.maxHealth} value={this.props.health}
            minimumTrackTintColor={'#72130c'} thumbStyle={{width:0, height: 0}}
          />
          <Text style={styles.enemyHPNum}>
            {this.props.health}/{this.props.maxHealth}
          </Text>
        </View>
      </View>
    )
  }
}


class Spell extends Component {
  onPress = () => {
    console.log(this.props.title)
  }

  render() {
    return (
      <View style={{flex:1}}>
        <TouchableHighlight
          onPress={this.onPress}
          underlayColor='#b63bbf'>
          <Text style={styles.spell}>
            {this.props.title}
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

class Item extends Component {
  onPress = () => {
    console.log(this.props.title)
  }

  render() {
    return (
      <View style={{flex:1}}>
        <TouchableHighlight
          onPress={this.onPress}
          underlayColor='#b63bbf'>
          <Text style={styles.item}>
            {this.props.title}
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

class Usables extends Component {
  render() {
    return (
      <View style={styles.usables}>
        <View style={styles.spellContainer}>
          <View style={{marginBottom: 14}}>
            <Text style={styles.spellsTitle}>Spells</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Spell title={"A"} />
            <Spell title={"B"} />
            <Spell title={"C"} />
            <Spell title={"D"} />
          </View>
        </View>
        <View style={styles.itemContainer}>
          <View>
            <Text style={styles.itemsTitle}>Items</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Item title={"1"} />
            <Item title={"2"} />
            <Item title={"3"} />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Item title={"4"} />
            <Item title={"5"} />
            <Item title={"6"} />
          </View>
        </View>
      </View>
    )
  }
}

class Character extends Component {
  render() {
    return (
      <View style={styles.characterContainer}>
        <View style={styles.levelContainer}>
          <ProgressCircle radius={35}
            percent={this.props.currEXP/this.props.maxEXP*100}
            borderWidth={5} color={"#dfc488"}>
            <Text style={styles.levelText}>
             {this.props.level}
            </Text>
          </ProgressCircle>
        </View>
        <View style={styles.hmContainer}>
          <View style={styles.charBar}>
            <Text style={styles.charBarTag}>
              HP:
            </Text>
            <Slider trackStyle={{height: 30}} style={{flex: 2}} disabled={true}
              maximumValue={this.props.maxHP} value={this.props.currHP}
              minimumTrackTintColor={'#64ae48'} thumbStyle={{width:0, height: 0}}
            />
          <Text style={styles.charBarNum}>
            {this.props.currHP}/{this.props.maxHP}
          </Text>
          </View>
          <View style={styles.charBar}>
            <Text style={styles.charBarTag}>
              Mana:
            </Text>
            <Slider trackStyle={{height: 30}} style={{flex: 2}} disabled={true}
              maximumValue={this.props.maxMana} value={this.props.currMana}
              minimumTrackTintColor={'#508adc'} thumbStyle={{width:0, height: 0}}
            />
          <Text style={styles.charBarNum}>
              {this.props.currMana}/{this.props.maxMana}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gold: 650,
      damage: 47,
      cs: 0,
      enemyType: "Dire Creep",
      enemyMaxHealth: 550,
      enemyHealth: 550,
      level: 1,
      maxEXP: 400,
      currEXP: 0,
      maxHP: 100,
      currHP: 56,
      maxMana: 100,
      currMana: 90
    }
  }

  handleEnemyPress() {
    var newEnemyHealth = this.state.enemyHealth - this.state.damage;

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
        <MenuBar />
        <Enemy
          type={this.state.enemyType}
          maxHealth={this.state.enemyMaxHealth}
          health={this.state.enemyHealth}
          handlePress={this.handleEnemyPress.bind(this)}
        />
        <Usables />
        <Character level={this.state.level}
          maxEXP={this.state.maxEXP} currEXP={this.state.currEXP}
          maxHP={this.state.maxHP} currHP={this.state.currHP}
          maxMana={this.state.maxMana} currMana={this.state.currMana}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7d7d7d',
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    marginBottom: 5,
    fontFamily: 'Asimov',
    fontSize: 32,
    color: '#ffffff',
  },
  statsBar: {
    marginBottom: 5,
    marginHorizontal: 15,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignSelf: 'stretch',
    backgroundColor: '#a1a1a1',
    borderWidth: 2
  },
  stat: {
    fontFamily: "Asimov",
    color: '#ffffff',
    fontSize: 16,
    padding: 6,
    textAlign: 'center'
  },
  menuBar: {
    marginBottom: 5,
    marginHorizontal: 25,
    flexDirection: 'row',
  },
  menuItem: {
    flex:1,
    backgroundColor: 'green',
    marginHorizontal: 2
  },
  menuItemText: {
    fontFamily: 'Asimov',
    color: 'white',
    padding: 10,
    fontSize: 18,
    textAlign: 'center'
  },
  enemy: {
    alignSelf: 'stretch',
    marginBottom: 5
  },
  enemyType: {
    textAlign: 'center',
    fontFamily: 'Asimov',
    color: 'white',
    fontSize: 14,
    marginBottom: 2
  },
  enemyDescriptor: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20
  },
  enemyHPTag: {
    fontFamily: 'Asimov',
    fontSize: 12,
    marginRight: 5,
    flex: 1
  },
  enemyHPNum: {
    fontFamily: 'Asimov',
    fontSize: 12,
    textAlign: 'center',
    flex: 1
  },
  usables: {
    marginBottom: 10,
    marginHorizontal: 15,
    flexDirection: 'row'
  },
  spellContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#6c1977',
    marginRight: 3
  },
  spellsTitle: {
    fontFamily: 'Asimov',
    color: 'white',
    fontSize: 22,
    textAlign: 'center'
  },
  spell: {
    fontFamily: 'Asimov',
    fontSize: 30,
    color: 'white',
    textAlign: 'center'
  },
  itemContainer: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#6c1977',
    marginLeft: 3
  },
  itemsTitle: {
    fontFamily: 'Asimov',
    color: 'white',
    fontSize: 22,
    textAlign: 'center'
  },
  item: {
    fontFamily: 'Asimov',
    fontSize: 28,
    color: 'white',
    textAlign: 'center'
  },
  characterContainer: {
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 15
  },
  levelContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  levelText: {
    fontFamily: 'Asimov',
    fontSize: 32
  },
  hmContainer: {
    flex: 6,
    justifyContent: 'center'
  },
  charBar: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  charBarTag: {
    flex: 1,
    fontFamily: 'Asimov',
    fontSize: 22,
    textAlign: 'right',
    marginRight: 5
  },
  charBarNum: {
    fontFamily: 'Asimov',
    color: 'white',
    position: 'absolute',
    right: 5
  },
});
