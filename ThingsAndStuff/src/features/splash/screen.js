import React, {Component} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';

import {
  Container,
  Content,
  Text,
} from 'native-base';

import firebase from 'react-native-firebase';

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.firestore().collection('users').doc(user.uid).get()
        .then((data) => {
          this.props.navigation.navigate('MainStack')
        }).catch((err) => {
          this.props.navigation.navigate('LoginStack');
        });
      } else {
        this.props.navigation.navigate('LoginStack');
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content padder>
          <Text style={styles.title}>Things And Stuff</Text>
          <Text style={styles.subtitle}>Today!</Text>
          <ActivityIndicator />
        </Content>
      </Container>
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
