import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class Login extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    //const { params } = navigation.state;

    return {
      title: 'Login',
      // headerStyle: {
      //   backgroundColor: navigationOptions.headerTintColor,
      // },
      // headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('MainStack')
    }, 1500)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Phonenumber</Text>
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
