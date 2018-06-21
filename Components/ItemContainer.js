import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';

class Item extends Component {

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
      }
    } else if (this.props.order == 3) {
      this.borderStyle = {
        borderLeftWidth: 2,
        borderTopWidth: 4,
        borderRightWidth: 4
      }
    } else if (this.props.order == 4) {
      this.borderStyle = {
        borderLeftWidth: 4,
        borderTopWidth: 2,
        borderBottomWidth: 4
      }
    } else if (this.props.order == 5) {
      this.borderStyle = {
        borderLeftWidth: 2,
        borderTopWidth: 2,
        borderBottomWidth: 4
      }
    } else if (this.props.order == 6) {
      this.borderStyle = {
        borderLeftWidth: 2,
        borderTopWidth: 2,
        borderRightWidth: 4,
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
          <Text style={styles.item}>
            {this.props.order}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

class ItemContainer extends Component {
  render() {
    return (
      <View style={styles.itemContainer}>
        <View>
          <Text style={styles.itemsTitle}>Items</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Item order={1} />
          <Item order={2} />
          <Item order={3} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Item order={4} />
          <Item order={5} />
          <Item order={6} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 11,
    marginLeft: 3
  },
  itemsTitle: {
    fontFamily: 'Asimov',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textDecorationLine: 'underline',
    fontSize: 22,
    textAlign: 'center'
  },
  item: {
    fontFamily: 'Asimov',
    color: 'white'
  }
});

export default ItemContainer;
