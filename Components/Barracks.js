import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

class Barracks extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.topRow}>
          <Text style={styles.title}>Barracks</Text>
          <TouchableOpacity onPress={this.props.handleClose} style={styles.exit}>
            <Text style={styles.exitText}>Return</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{fontSize: 16, color: 'black'}}>Current Gold: {this.props.gold}</Text>
          <Text style={{fontSize: 16, color: 'black'}}>Current C/S: {this.props.cs}</Text>
        </View>
        <View>
          <Text style={{fontSize: 20, color: 'black', textAlign: 'center'}}>Recruitment options</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#a1a1a1', borderWidth: 2}}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{width: 40, height: 40, backgroundColor: 'black'}}></View>
          </View>
          <View style={{flex: 3}}>
            <Text>Radiant Creep</Text>
            <Text>C/S Provided: 10</Text>
            <Text>Cost: 50</Text>
            <Text>Amount Owned: 0</Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <TouchableOpacity style={{backgroundColor: 'blue'}}>
              <Text>Recruit!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Asimov',
    fontSize: 32,
    color: 'black',
    textDecorationLine: 'underline'
  },
  exit: {
    backgroundColor: '#CD5555',
    borderWidth: 2,
    borderLeftColor: '#d77677',
    borderTopColor: '#d77677',
    borderRightColor: '#a44444',
    borderBottomColor: '#a44444'
  },
  exitText: {
    fontFamily: 'Asimov',
    fontSize: 15,
    color: 'white',
    padding: 8
  }
});

export default Barracks;
