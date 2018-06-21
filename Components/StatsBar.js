import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

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

const styles = StyleSheet.create({
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
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    fontSize: 16,
    padding: 6,
    textAlign: 'center'
  }
});

export default StatsBar;
