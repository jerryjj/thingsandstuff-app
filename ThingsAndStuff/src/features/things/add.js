import React, { Component } from 'react';
import {StyleSheet, View} from 'react-native';

import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Label,
  Input,
  H1,
  Button,
  Text,
} from 'native-base';

import firebase from 'react-native-firebase';

export default class AddThing extends Component {
  constructor(props) {
    super(props);

    this.ref = firebase.firestore().collection('things');

    this.state = {
      title: '',
      description: '',
      titleError: false,
      descriptionError: false,
      user: props.navigation.getParam('user', null),
    };
  }

  componentDidMount() {
    firebase.analytics().setCurrentScreen('add-thing', 'AddThings');
  }

  saveThing() {
    const data = {
      title: this.state.title,
      description: this.state.description,
      creator: {
        id: this.state.user.id,
        name: this.state.user.nickname
      },
      likes: {
        total: 0
      },
      publishedAt: new Date()
    };

    if (!data.title || !data.description) {
      if (!data.title) {
        this.setState({[`titleError`]: true});
      }
      if (!data.description) {
        this.setState({[`descriptionError`]: true});
      }
      return;
    }

    console.log('saveThing', data);
    firebase.analytics().logEvent('new_thing', {});

    this.ref.add(data)
    .then((snap) => {
      this.props.navigation.goBack();
    }).catch((err) => {
      console.log('Error saving thing', err);
    });
  }

  setValue(field, value) {
    this.setState({[`${field}Error`]: false, [field]: value});

    if (!value) {
      this.setState({[`${field}Error`]: true});
    }
  }

  render() {
    return (
      <Container>
        <Header />
        <Content padder>
          <H1>Create a Thing</H1>
          <Form>
            <Item floatingLabel error={this.state.titleError}>
              <Label>Title</Label>
              <Input
                value={this.state.title}
                onChangeText={(value) => this.setValue('title', value)}
                />
            </Item>
            <Item floatingLabel last error={this.state.descriptionError}>
              <Label>Description</Label>
              <Input
                value={this.state.description}
                onChangeText={(value) => this.setValue('description', value)}
               />
            </Item>
            <View style={styles.buttonHolder}>
              <Button onPress={() => this.saveThing()}>
                <Text>Create</Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  buttonHolder: {
    marginTop: 10,
    alignItems: 'center',
  },
});
