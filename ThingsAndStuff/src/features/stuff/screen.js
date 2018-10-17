import React, {Component} from 'react';
import {StyleSheet, Image, Linking, View} from 'react-native';

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
  Card,
  CardItem,
  Text,
  Fab,
} from 'native-base';

import {ADD_SCREEN_NAME} from './constants';

export default class Stuff extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addIsActive: false
    };
  }

  getStuffTypeIcon(type) {
    switch (type) {
      case 'text':
        return 'file-text-o';
      case 'link':
        return 'link';
      case 'image':
        return 'image';
    }
  }

  renderStuff(data) {
    let body = null;

    if (data.text) {
      body = (
        <Body>
          <Text>{data.text}</Text>
        </Body>
      );
    } else if (data.link) {
      body = (
        <Body>
          <Text style={{color: 'blue'}}
            onPress={() => Linking.openURL(data.link)}>{data.link}</Text>
        </Body>
      );
    } else if (data.imageUri) {
      body = (
        <Image source={{uri: data.image}} style={{height: 200, width: null, flex: 1}}/>
      );
    }

    return (
      <Card key={data.id}>
        <CardItem header>
          <Left>
            <Icon type="FontAwesome" name={this.getStuffTypeIcon(data.type)} />
            <Body>
              <Text>{data.title}</Text>
              <Text note>{data.creatorName}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          {body}
        </CardItem>
        <CardItem footer>
          <Left>
            <Button transparent>
              <Icon active name="thumbs-up" />
              <Text>{data.likes} Likes</Text>
            </Button>
          </Left>
          <Body>
          </Body>
          <Right>
            <Text>{data.publishedAt}</Text>
          </Right>
        </CardItem>
      </Card>
    );
  }

  addStuff(type) {
    const thingId = this.props.navigation.getParam('thingId', '');

    this.props.navigation.navigate(ADD_SCREEN_NAME, {
      thingId: thingId,
      type: type
    });
  }

  render() {
    const thingId = this.props.navigation.getParam('thingId', '');
    const thingTitle = this.props.navigation.getParam('thingTitle', '');

    let stuffs = [
      {
        id: '1',
        title: 'PWA is a Things',
        type: 'image',
        creatorName: 'PWARockzzz',
        image: 'https://cdn-images-1.medium.com/max/1200/1*B_G1gC-kjuNpRUt-nepHUA.png',
        likes: 24,
        publishedAt: '11 days ago'
      },
      {
        id: '2',
        title: 'My Opinion',
        type: 'text',
        creatorName: 'TardisLover77',
        text: 'I feel like this is the next biggest thing',
        likes: 24,
        publishedAt: '11 days ago'
      },
      {
        id: '3',
        title: 'PWARocks',
        type: 'link',
        creatorName: 'MeanTeam',
        link: 'https://pwa.rocks/',
        likes: 24,
        publishedAt: '11 days ago'
      },
    ];

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{thingTitle}</Title>
          </Body>
          <Right />
        </Header>
        <View style={{ flex: 1 }}>
          <Content padder>
            {stuffs.map((stuff) => {
              return this.renderStuff(stuff);
            })}
          </Content>
          <Fab
            active={this.state.addIsActive}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ addIsActive: !this.state.addIsActive })}>
            <Icon type="Feather" name="plus" />
            <Button style={{ backgroundColor: '#34A34F' }}
              onPress={() => this.addStuff('text')}>
              <Icon type="FontAwesome" name={this.getStuffTypeIcon('text')} />
            </Button>
            <Button style={{ backgroundColor: '#34A34F' }}
              onPress={() => this.addStuff('link')}>
              <Icon type="FontAwesome" name={this.getStuffTypeIcon('link')} />
            </Button>
            <Button style={{ backgroundColor: '#34A34F' }}
              onPress={() => this.addStuff('image')}>
              <Icon type="FontAwesome" name={this.getStuffTypeIcon('image')} />
            </Button>
          </Fab>
        </View>
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
});
