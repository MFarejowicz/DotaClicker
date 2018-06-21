import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import ProgressCircle from './ProgressCircle.js';
import Slider from './Slider.js';

class Character extends Component {
  render() {
    return (
      <View style={styles.characterContainer}>
        <View style={styles.levelContainer}>
          <ProgressCircle radius={35} borderWidth={5}
            percent={this.props.currEXP/this.props.maxEXP*100}
            bgcolor={"#3d3d3d"} color={"#dfc488"} innerColor={"#282B31"}>
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
            <Slider trackStyle={{height: 30, borderWidth: 1, borderColor: 'black'}}
              style={{flex: 2}} disabled={true}
              maximumValue={this.props.maxHP} value={this.props.currHP}
              minimumTrackTintColor={'#64ae48'} thumbStyle={{width:0, height: 0}}
            />
          <Text style={styles.charBarNum}>
            {Math.round(this.props.currHP)}/{this.props.maxHP}
          </Text>
          <Text style={styles.charBarRegen}>
            {this.props.hpRegen >= 0 ? '+' : '-'}{this.props.hpRegen}
          </Text>
          </View>
          <View style={styles.charBar}>
            <Text style={styles.charBarTag}>
              Mana:
            </Text>
            <Slider trackStyle={{height: 30, borderWidth: 1, borderColor: 'black'}}
              style={{flex: 2}} disabled={true}
              maximumValue={this.props.maxMana} value={this.props.currMana}
              minimumTrackTintColor={'#508adc'} thumbStyle={{width:0, height: 0}}
            />
            <Text style={styles.charBarNum}>
              {this.props.currMana}/{this.props.maxMana}
            </Text>
            <Text style={styles.charBarRegen}>
              {this.props.hpRegen >= 0 ? '+' : '-'}{this.props.manaRegen}
            </Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
    fontSize: 32,
    color: '#dfc488',
    textShadowColor: '#c8b07a',
    textShadowOffset: {width: -1, height: 0},
    textShadowRadius: 30
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
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textAlign: 'right',
    marginRight: 5
  },
  charBarNum: {
    fontFamily: 'Asimov',
    fontSize: 18,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    position: 'absolute',
    right: 56
  },
  charBarRegen: {
    fontFamily: 'Asimov',
    fontSize: 10,
    color: '#323232',
    position: 'absolute',
    right: 4
  }
});

export default Character;
