import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class Stuff extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    //const { params } = navigation.state;

    return {
      title: 'Stuff',
      // headerStyle: {
      //   backgroundColor: navigationOptions.headerTintColor,
      // },
      // headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  componentDidMount() {
    setTimeout(() => {
      //this.props.navigation.navigate('Stuff')
    }, 1500)
  }

  render() {
    const stuffId = this.props.navigation.getParam('stuffId', '');

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Stuff ID: {stuffId}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginBottom: 0,
  },
});
