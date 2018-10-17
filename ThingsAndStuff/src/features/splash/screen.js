import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('LoginStack')
    }, 800)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Things And Stuff</Text>
        <Text style={styles.subtitle}>Today!</Text>
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
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333333',
  },
});
