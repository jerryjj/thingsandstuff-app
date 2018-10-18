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

export default class AddStuff extends Component {
  constructor(props) {
    super(props);

    const thingId = props.navigation.getParam('thingId', '')
    this.ref = firebase.firestore().collection(`things/${thingId}/stuff`);

    this.state = {
      title: '',
      description: '',
      titleError: false,
      typeError: false,
      thingId: thingId,
      type: type = props.navigation.getParam('type', 'text'),
      user: props.navigation.getParam('user', null),
    };
  }

  componentDidMount() {
    firebase.analytics().setCurrentScreen('add-stuff', 'AddStuff');
  }

  saveThing() {
    const data = {
      title: this.state.title,
      type: this.state.type,
      creator: {
        id: this.state.user.id,
        name: this.state.user.nickname
      },
      likes: {
        total: 0
      },
      publishedAt: new Date()
    };

    data[this.state.type] = this.state.typeValue;

    if (!data[this.state.type]) {
      return;
    }

    console.log('saveStuff', data);
    firebase.analytics().logEvent('new_stuff', {
      thing: this.state.thingId,
      type: this.state.type,
    });

    this.ref.add(data)
    .then((snap) => {
      this.props.navigation.goBack();
    }).catch((err) => {
      console.log('Error saving stuff', err);
    });
  }

  setValue(field, value) {
    this.setState({[`${field}Error`]: false, [field]: value});

    if (!value) {
      this.setState({[`${field}Error`]: true});
    }
  }

  setTypeValue(type, value) {
    this.setState({typeError: false, typeValue: value, type});

    if (!value) {
      this.setState({typeError: true});
    }
  }

  render() {
    let typeItem = null;

    switch (this.state.type) {
      case 'text':
        typeItem = (
          <Item floatingLabel last error={this.state.typeError}>
            <Label>Body Text</Label>
            <Input
              value={this.state.typeValue}
              onChangeText={(value) => this.setTypeValue(type, value)}
              />
          </Item>
        );
      break;
      case 'link':
        typeItem = (
          <Item floatingLabel last error={this.state.typeError}>
            <Label>Web URL</Label>
            <Input
              value={this.state.typeValue}
              onChangeText={(value) => this.setTypeValue(type, value)}
              />
          </Item>
        );
      break;
      case 'image':
        typeItem = (
          <Item>
            <Label>IMAGE SUPPORT COMING</Label>
          </Item>
        );
      break;
    }

    return (
      <Container>
        <Header />
        <Content padder>
          <H1>Publish Stuff</H1>
          <Form>
            <Item floatingLabel error={this.state.titleError}>
              <Label>Title</Label>
              <Input
                value={this.state.title}
                onChangeText={(value) => this.setValue('title', value)}
                />
            </Item>
            {typeItem}
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
