import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class Things extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    //const { params } = navigation.state;

    return {
      title: 'Things',
      // headerStyle: {
      //   backgroundColor: navigationOptions.headerTintColor,
      // },
      // headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Stuff', {
        stuffId: 1
      })
    }, 1500)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Things</Text>
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
