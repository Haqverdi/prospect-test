import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { AsyncStorage } from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
} from 'native-base';
import moment from 'moment';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Navigation } from 'react-native-navigation';

export default class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      date: moment()
        .locale('az')
        .format('DD MMMM'),
    };
    this._handleInput = this._handleInput.bind(this);
    Navigation.events().bindComponent(this);
    this._setTaskToStorage = this._setTaskToStorage.bind(this);
  }

  _handleInput = (field, text) => {
    this.setState({
      [field]: text,
    });
    console.log(this.state);
  };

  _setTaskToStorage = async () => {
    try {
      const { title, text, date } = this.state;
      const new_task = {
        title,
        text,
        date,
      };
      const new_tasks = [new_task, ...this.props.tasks];
      await AsyncStorage.setItem('TASKS', JSON.stringify(new_tasks));
      alert('added');
      Navigation.popToRoot(this.props.componentId);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <Content padder>
          <Form>
            <Item stackedLabel>
              <Label>Başlıq</Label>
              <Input
                style={styles.input}
                onChangeText={text => {
                  this._handleInput('title', text);
                }}
                returnKeyType="next"
                onSubmitEditing={() => this.refs.textDetail._root.focus()}
              />
            </Item>
            <Item stackedLabel regular>
              <Label>Ətraflı</Label>
              <Input
                ref={'textDetail'}
                returnKeyType="go"
                style={styles.input}
                placeholder={'Tapşırıqa aid ətraflı məlumat'}
                onChangeText={text => {
                  this._handleInput('text', text);
                }}
              />
            </Item>
          </Form>
          <Button onPress={this._setTaskToStorage}>
            <Text>Əlavə et</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
  },
  addBtn: {
    backgroundColor: '#55ab80',
  },
});
