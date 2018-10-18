import React, {Component} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';

import {
  Container,
  Content,
  Text,
} from 'native-base';

export default class Splash extends Component {
  componentDidMount() {
    setTimeout(() => {
      //this.props.navigation.navigate('LoginStack')
      this.props.navigation.navigate('MainStack')
    }, 400)
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
