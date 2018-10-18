import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

import {SCREEN_NAME as STUFF_SCREEN_NAME} from '../stuff/constants';
import {ADD_SCREEN_NAME} from './constants';

import {
  Container,
  Content,
  Body,
  Header,
  Right,
  Title,
  Left,
  Button,
  Icon,
  H1,
  Card,
  CardItem,
  Fab,
  Text,
} from 'native-base';

import firebase from 'react-native-firebase';

import Moment from 'react-moment';
import 'moment-timezone';

export default class Things extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('things');
    this.unsubscribe = null;

    this.state = {
      loading: true,
      things: [],
      user: props.navigation.getParam('user', null),
    };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.orderBy('publishedAt', 'desc').onSnapshot(this.onCollectionUpdate);

    firebase.analytics().setCurrentScreen('things', 'Things');
    firebase.analytics().logEvent('list_things', {});
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const things = [];
    querySnapshot.forEach((doc) => {
      const { title, description, publishedAt, creator, likes } = doc.data();
      things.push({
        id: doc.id,
        title,
        description,
        publishedAt,
        likes: likes.total,
        creatorName: creator.name
      });
    });

    this.setState({ 
      things,
      loading: false,
    });
  }

  gotoStuff(data) {
    this.props.navigation.navigate(STUFF_SCREEN_NAME, {
      thingId: data.id,
      thingTitle: data.title,
      thingDoc: data.doc,
      user: this.state.user
    });
  }

  renderThing(data) {
    return (
      <Card key={data.id}>
        <CardItem button onPress={() => this.gotoStuff(data)}>
          <Body>
            <Text>{data.title}</Text>
            <Text note>{data.creatorName}</Text>
          </Body>
        </CardItem>
        <CardItem button onPress={() => this.gotoStuff(data)}>
          <Body>
            <Text>{data.description}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent>
              <Icon active name="thumbs-up" />
              <Text>{data.likes} Likes</Text>
            </Button>
          </Left>
          <Body>
          </Body>
          <Right>
            <Moment fromNow ago element={Text} date={data.publishedAt}></Moment>
          </Right>
        </CardItem>
      </Card>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <ActivityIndicator />
      );
    }

    const things = this.state.things;
    // [
    //   {
    //     id: '1',
    //     title: 'PWA is a Things',
    //     creatorName: 'PWARockzzz',
    //     description: 'I luv PWAs',
    //     likes: 24,
    //     publishedAt: '11 days ago'
    //   },
    //   {
    //     id: '2',
    //     title: 'Whittaker Who?',
    //     creatorName: 'TardisLover77',
    //     description: 'Latest Docter is a Woman!',
    //     likes: 24,
    //     publishedAt: '11 days ago'
    //   },
    //   {
    //     id: '3',
    //     title: 'Firebase & React, Is this Love?',
    //     creatorName: 'FireTeam12',
    //     description: 'Is this the best thing yet?',
    //     likes: 24,
    //     publishedAt: '11 days ago'
    //   },
    // ];

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.toggleDrawer()}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Things</Title>
          </Body>
          <Right />
        </Header>
        <View style={{ flex: 1 }}>
          <Content padder>
            <H1>Latest Things</H1>
            {things.map((thing) => {
              return this.renderThing(thing);
            })}
          </Content>
          <Fab
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.props.navigation.navigate(ADD_SCREEN_NAME, {
              user: this.state.user
            })}>
            <Icon type="Feather" name="plus" />
          </Fab>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
