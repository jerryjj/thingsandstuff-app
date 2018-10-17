import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {
  Container,
  Content,
  Text,
  Button,
  H1,
  Form,
  Item,
  Input
} from 'native-base';

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

  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      message: '',
      codeInput: '',
      nicknameInput: '',
      phoneNumber: '+358',
      confirmResult: null,
    };
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.props.navigation.navigate('MainStack')
    // }, 1000)
  }

  signIn() {
    this.props.navigation.navigate('MainStack');
  }

  renderPhoneNumberInput() {
    const { phoneNumber } = this.state;
 
    return (
      <Content padder>
        <H1>Login with your phonenumber</H1>
        <Form>
          <Item last>
            <Input
              placeholder="Mobile number"
              autoFocus
              value={phoneNumber}
              onChangeText={value => this.setState({ phoneNumber: value })}
            />
          </Item>
        </Form>
        <Button onPress={() => this.signIn()}>
          <Text>Login</Text>
        </Button>
      </Content>
    );
  }

  renderMessage() {
    const { message } = this.state;

    if (!message.length) return null;

    return (
      <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
    );
  }

  renderVerificationCodeInput() {
    const { codeInput } = this.state;

    return (
      <Content padder>
        <H1>Enter verification code below:</H1>
        <Form>
          <Item last>
            <Input
              placeholder="Code"
              value={codeInput}
              onChangeText={value => this.setState({ codeInput: value })}
            />
          </Item>
        </Form>
        <Button onPress={this.confirmCode}>
          <Text>Confirm code</Text>
        </Button>
      </Content>
    );
  }

  renderRegisterNickname() {
    const { nicknameInput } = this.state;

    return (
      <Content padder>
        <H1>Select Nickname:</H1>
        <Form>
          <Item last>
            <Input
              placeholder="Nickname. eg. TacoMan"
              value={nicknameInput}
              onChangeText={value => this.setState({ nicknameInput: value })}
            />
          </Item>
        </Form>
        <Button onPress={this.setNickname}>
          <Text>Set Nickname</Text>
        </Button>
      </Content>
    );
  }

  render() {
    const content = this.renderPhoneNumberInput();

    return (
      <Container>
        {content}
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
