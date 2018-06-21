import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import Slider from './Slider.js';
import * as Animatable from 'react-native-animatable';
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

function getRandomInt(min, max) {
  // Generates a random integer between min and max, inclusive.
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
          style={{alignSelf: 'stretch', alignItems: 'center'}}>
            <Animatable.Image
              animation={"wobble"}
              easing={"linear"}
              duration={3000}
              iterationCount={"infinite"}
              source={require('../assets/img/creep.png')}
              style={{width: 225, height: 240}}
              resizeMode={'stretch'}
            />
        </TouchableOpacity>
        <View style={styles.enemyDescriptor}>
          <Text style={styles.enemyHPTag}>
            Enemy HP:
          </Text>
          <Slider trackStyle={{height: 30, borderWidth: 1, borderColor: 'black'}}
            style={{flex: 3}} disabled={true}
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

const styles = StyleSheet.create({
  enemy: {
    alignSelf: 'stretch',
  },
  enemyType: {
    textAlign: 'center',
    fontFamily: 'Asimov',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    fontSize: 14,
    marginBottom: 2
  },
  enemyDescriptor: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30
  },
  enemyHPTag: {
    fontFamily: 'Asimov',
    fontSize: 14,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    marginRight: 5,
    flex: 1
  },
  enemyHPNum: {
    fontFamily: 'Asimov',
    fontSize: 12,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    position: 'absolute',
    right: 85
  }
});

export default Enemy;
