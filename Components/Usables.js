import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import SpellContainer from './SpellContainer.js';
import ItemContainer from './ItemContainer.js';

class Usables extends Component {
  render() {
    return (
      <View style={styles.usables}>
        <SpellContainer />
        <ItemContainer />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  usables: {
    marginTop: -5,
    marginBottom: 5,
    marginHorizontal: 15,
    flexDirection: 'row'
  }
})

export default Usables;
