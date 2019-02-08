import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
var images = {
  rmc: require('../assets/img/rmc.png'),
  rrc: require('../assets/img/rrc.png')
};

class Purchaseable extends Component {

  handlePress = (code, cs, cost) => {
    this.props.handleRecruit(code, cs, cost);
  }

  render() {
    return (
      <View style={styles.purchaseable}>
        <View style={styles.pImg}>
          <Image
            source={images[this.props.img]}
            style={{width: 60, height: 60}}
            resizeMode={'stretch'}
          />
        </View>
        <View style={styles.pInfo}>
          <Text style={[styles.pInfoText,{fontWeight: 'bold'}]}>{this.props.name}</Text>
          <Text style={styles.pInfoText}>C/S Provided: {this.props.cs}</Text>
          <Text style={styles.pInfoText}>Cost: {this.props.cost}</Text>
          <Text style={styles.pInfoText}>Amount Owned: {this.props.amtOwned}</Text>
        </View>
        <View style={styles.pPurchase}>
          <TouchableOpacity style={styles.pPurchaseButton}
            onPress={() => this.handlePress(this.props.code, this.props.cs, this.props.cost)}>
            <Text style={styles.pPurchaseText}>Recruit!</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

class Barracks extends Component {
  getAmt(type) {
    return (this.props.troops[type] ? this.props.troops[type] : 0)
  }

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
          <Text style={styles.text}>Current Gold: {this.props.gold}</Text>
          <Text style={styles.text}>Current C/S: {this.props.cs}</Text>
        </View>
        <View>
          <Text style={styles.headerText}>Recruitment options</Text>
        </View>
        <Purchaseable name='Radiant Melee Creep' code='rmc' img='rmc'
          cs={10} cost={50 + (5*this.getAmt('rmc'))}
          amtOwned={this.getAmt('rmc')}
          handleRecruit={this.props.handleRecruit}/>
        <Purchaseable name='Radiant Ranged Creep' code='rrc' img='rrc'
          cs={20} cost={90 + (10*this.getAmt('rrc'))}
          amtOwned={this.getAmt('rrc')}
          handleRecruit={this.props.handleRecruit}/>
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
  },
  text: {
    fontSize: 16,
    color: 'black'
  },
  headerText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center'
  },
  purchaseable: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a1a1a1',
    borderWidth: 2,
    marginBottom: 5
  },
  pImg: {
    flex: 1,
    alignItems: 'center'
  },
  pInfo: {
    flex: 2
  },
  pInfoText: {
    fontSize: 14,
    color: 'black'
  },
  pPurchase: {
    flex: 1,
    alignItems: 'center'
  },
  pPurchaseButton: {
    backgroundColor: '#FF7D40',
    borderWidth: 2,
    borderLeftColor: '#ff9766',
    borderTopColor: '#ff9766',
    borderRightColor: '#cc6433',
    borderBottomColor: '#cc6433'
  },
  pPurchaseText: {
    fontSize: 16,
    color: 'black',
    padding: 8
  }
});

export default Barracks;
