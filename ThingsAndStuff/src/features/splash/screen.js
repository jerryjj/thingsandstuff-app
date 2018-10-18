import React, {Component} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';

import {
  Container,
  Content,
  Text,
} from 'native-base';

import {SCREEN_NAME as THINGS_SCREEN_NAME} from '../things/constants';

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
        .then((snap) => {
          this.props.navigation.navigate(THINGS_SCREEN_NAME, {
            user: snap.data()
          });
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
