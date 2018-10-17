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

export default class AddStuff extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      titleError: false,
      typeError: false,
      type: type = props.navigation.getParam('type', 'text')
    };
  }

  saveThing() {
    const data = {
      title: this.state.title,
      type: this.state.type
    };

    data[this.state.type] = this.state.typeValue;

    if (!data[this.state.type]) {
      return;
    }

    console.log('saveStuff', data);
    this.props.navigation.goBack();
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
    const thingId = this.props.navigation.getParam('thingId', '');
    //const type = this.props.navigation.getParam('type', '');

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
