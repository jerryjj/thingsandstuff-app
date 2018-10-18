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

import {SCREEN_NAME as THINGS_SCREEN_NAME} from '../things/constants';

import firebase from 'react-native-firebase';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      message: '',
      codeInput: '',
      nicknameInput: '',
      phoneNumber: '+358',
      confirmResult: null,
      user: null,
      signingIn: false
    };
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.analytics().setUserId(user.uid);
        this.setState({ user: user.toJSON() });
      } else {
        this.setState({
          message: '',
          codeInput: '',
          phoneNumber: '+358',
          confirmResult: null,
        });
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  signIn = () => {
    const { phoneNumber } = this.state;
    this.setState({ message: 'Sending code ...', signingIn: true });

    firebase.analytics().logEvent('login_phonenumber', {});

    firebase.auth().signInWithPhoneNumber(phoneNumber)
      .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
      .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
  };

  confirmCode = () => {
    const { codeInput, confirmResult } = this.state;

    if (confirmResult && codeInput.length) {
      firebase.analytics().logEvent('login_confirmcode', {});

      confirmResult.confirm(codeInput)
        .then((user) => {
          this.setState({ message: 'Code Confirmed!' });
        })
        .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
    }
  };

  setNickname = () => {
    const user = this.state.user;

    firebase.analytics().logEvent('register_nickname', {});

    const ref = firebase.firestore().collection('users').doc(user.uid);
    ref.set({
      id: user.uid,
      nickname: this.state.nicknameInput,
      totalThings: 0,
    }).then((snap) => {
      this.props.navigation.navigate(THINGS_SCREEN_NAME, {
        user: snap.data()
      });
    }).catch((err) => {
      console.log(err)
      this.setState({ message: `Error saving nick ${err}` });
    });
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
        <Button onPress={() => this.signIn()} disabled={this.state.signingIn}>
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
    const { user, confirmResult } = this.state;
    let content = this.renderPhoneNumberInput();

    if (user) {
      content = this.renderRegisterNickname();
      firebase.analytics().setCurrentScreen('register', 'Register');
    } else if (confirmResult) {
      content = this.renderVerificationCodeInput();
      firebase.analytics().setCurrentScreen('login-verification', 'LoginVerifyCode');
    } else {
      firebase.analytics().setCurrentScreen('login-phonenumber', 'LoginPhoneNumber');
    }

    return (
      <Container>
        {content}
        {this.renderMessage()}
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
