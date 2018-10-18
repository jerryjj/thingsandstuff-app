import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import firebase from 'react-native-firebase';

import { Image } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon
} from "native-base";

import {SCREEN_NAME as SPLASH_SCREEN_NAME} from '../splash/constants';
import {SCREEN_NAME as THINGS_SCREEN_NAME} from '../things/constants';
import {ADD_SCREEN_NAME as THINGS_ADD_SCREEN_NAME} from '../things/constants';

const routes = [
  {target: THINGS_SCREEN_NAME, label: 'Things'},
  {target: THINGS_ADD_SCREEN_NAME, label: 'Introduce Thing'},
];

export default class Drawer extends Component {
  constructor(props) {
    super(props);
    
    this.unsubscribe = null;
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.toJSON() });
      } else {
        this.state = {
          user: null
        };
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  signOut = () => {
    firebase.auth().signOut();
    this.props.navigation.navigate(SPLASH_SCREEN_NAME);
  }

  render() {
    const { user } = this.state;

    return (
      <Container>
        <Content>
          <Image
            source={require('./img/logo.png')}
            style={{
              height: 120,
              width: "100%",
              alignSelf: "stretch",
              resizeMode: "contain",
              position: "absolute"
            }}
          />
          <List
            dataArray={routes}
            contentContainerStyle={{ marginTop: 120 }}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data.target)}
                >
                  <Text>{data.label}</Text>
                </ListItem>
              );
            }}
          />
          {user && (
            <Button style={styles.logoutButton} onPress={this.signOut}>
              <Text>Sign Out</Text>
            </Button>
          )}
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
  logoutButton: {
    marginTop: 10,
    marginLeft: 10
  }
});
