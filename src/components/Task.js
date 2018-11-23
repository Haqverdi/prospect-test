import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { Card, CardItem, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class Task extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const showAlert = title => {
      Alert.alert(
        title,
        'Task info',
        [
          {
            text: 'Sil',
            onPress: () => this.props.onDelete(),
            style: 'default',
          },
          { text: 'Edit', onPress: () => console.log('edit Pressed') },
          {
            text: 'Imtina',
            onPress: () => console.log('Imtina Pressed'),
            style: 'cancel',
          },
        ],
        {
          cancelable: false,
        }
      );
    };

    const { data } = this.props;
    return (
      <Card style={style.card}>
        <CardItem>
          <Grid style={style.body}>
            <TouchableWithoutFeedback onPress={showAlert}>
              <Col size={1}>
                <Image source={require('../../assets/Oval.png')} />
              </Col>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.props.onTaskView}>
              <Col size={5}>
                <Row>
                  <Text style={style.taskdate}>{data.date}</Text>
                </Row>
                <Row>
                  <Text style={style.taskTitle}>{data.title}</Text>
                </Row>
              </Col>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => showAlert(data.title)}>
              <Col size={1} style={{ alignItems: 'flex-end' }}>
                <Image source={require('../../assets/settings.png')} />
              </Col>
            </TouchableWithoutFeedback>
          </Grid>
        </CardItem>
      </Card>
    );
  }
}

const style = StyleSheet.create({
  card: {
    minHeight: 70,
  },
  body: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  taskdate: {
    fontSize: 14,
    color: '#9d9d9d',
    marginBottom: 2,
  },
  taskTitle: {
    fontSize: 15,
  },
});
