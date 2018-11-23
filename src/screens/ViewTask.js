import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, View, Button, Icon, Fab, Text } from 'native-base';

class ViewTask extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { task } = this.props;
    return (
      <Container>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 20 }}>{task.title}</Text>
          <Text>{task.text}</Text>
          <Text>{task.date}</Text>
        </View>
      </Container>
    );
  }
}

export default ViewTask;
