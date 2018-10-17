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

export default class AddThing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      titleError: false,
      descriptionError: false
    };
  }

  saveThing() {
    const data = {
      title: this.state.title,
      description: this.state.description,
    };

    if (!data.title) {
      this.setState({[`titleError`]: true});
    }
    if (!data.description) {
      this.setState({[`descriptionError`]: true});
    }

    console.log('saveThing', data);
    this.props.navigation.goBack();
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
