import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

class Spell extends Component {

  constructor(props) {
    super(props)
    this.borderStyle = null;
    if (this.props.order == 1) {
      this.borderStyle = {
        borderLeftWidth: 4,
        borderTopWidth: 4,
      }
    } else if (this.props.order == 2) {
      this.borderStyle = {
        borderLeftWidth: 2,
        borderTopWidth: 4,
        borderRightWidth: 4,
      }
    } else if (this.props.order == 3) {
      this.borderStyle = {
        borderLeftWidth: 4,
        borderTopWidth: 2,
        borderBottomWidth: 4
      }
    } else if (this.props.order == 4) {
      this.borderStyle = {
        borderLeftWidth: 2,
        borderRightWidth: 4,
        borderTopWidth: 2,
        borderBottomWidth: 4
      }
    }
  }

  onPress = () => {
    console.log(this.props.title)
  }

  render() {
    return (
      <View style={[{borderColor: '#565d61'}, this.borderStyle]}>
        <TouchableOpacity
          onPress={this.onPress}
          activeOpacity={0.5}
          style={{backgroundColor: '#3d4042', width: 51, height: 42}}>
          <Text style={styles.spell}>
            {this.props.order}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class SpellContainer extends Component {
  render() {
    return (
      <View style={styles.spellContainer}>
        <View>
          <Text style={styles.spellsTitle}>Spells</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Spell order={1} />
          <Spell order={2} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Spell order={3} />
          <Spell order={4} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  spellContainer: {
    flex: 9,
    marginRight: 3
  },
  spellsTitle: {
    fontFamily: 'Asimov',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textDecorationLine: 'underline',
    fontSize: 22,
    textAlign: 'center'
  },
  spell: {
    fontFamily: 'Asimov',
    color: 'white'
  }
});

export default SpellContainer;
