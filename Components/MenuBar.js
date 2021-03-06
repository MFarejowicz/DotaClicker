import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

class MenuItem extends Component {

  render() {
    return (
      <TouchableOpacity
        onPress={this.props.handlePress}
        activeOpacity={0.5}
        style={styles.menuItem}>
        <Text
          style={styles.menuItemText}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    )
  }
}

class MenuBar extends Component {
  render() {
    return (
      <View style={styles.menuBar}>
        <MenuItem title={"Shop"} handlePress={this.props.openShop} />
        <MenuItem title={"Skilltree"} handlePress={this.props.openSkilltree}/>
        <MenuItem title={"Barracks"} handlePress={this.props.openBarracks}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  menuBar: {
    marginBottom: 5,
    marginHorizontal: 25,
    flexDirection: 'row',
  },
  menuItem: {
    flex:1,
    backgroundColor: '#629632',
    marginHorizontal: 2,
    borderWidth: 2,
    borderLeftColor: '#488214',
    borderTopColor: '#488214',
    borderRightColor: '#476453',
    borderBottomColor: '#476453'
  },
  menuItemText: {
    fontFamily: 'Asimov',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    padding: 10,
    fontSize: 18,
    textAlign: 'center'
  }
});

export default MenuBar;
