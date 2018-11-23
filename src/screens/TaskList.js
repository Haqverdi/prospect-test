import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { View, Text } from 'react-native';
import { Container, Content, Fab, Icon } from 'native-base';
import { Navigation } from 'react-native-navigation';

import Task from '../components/Task';

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isLoading: true,
    };
    this.pushViewTask = this.pushViewTask.bind(this);
    Navigation.events().bindComponent(this);
    this.pushViewTaskScreen = this.pushViewTaskScreen.bind(this);
    this._getTasksFromAsyncStorage = this._getTasksFromAsyncStorage.bind(this);
    this._deleteTaskFromStorage = this._deleteTaskFromStorage.bind(this);
  }

  async componentDidMount() {
    try {
      const tasks = await this._getTasksFromAsyncStorage();
      this.setState({
        tasks: tasks,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
      return;
    }
  }

  _getTasksFromAsyncStorage = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const tasks = await AsyncStorage.getItem('TASKS');
        if (tasks !== null) {
          const tasksArr = JSON.parse(tasks);
          resolve(tasksArr);
        }
      } catch (error) {
        console.log(error);
        reject([]);
      }
    });
  };

  _deleteTaskFromStorage = async index => {
    const tasks = this.state.tasks;
    const result = [...tasks.slice(0, index), ...tasks.slice(index + 1)];
    await AsyncStorage.setItem('TASKS', JSON.stringify(result));
    this.setState({
      tasks: result,
    });
  };

  pushViewTaskScreen() {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'AddTask',
        passProps: {
          tasks: this.state.tasks,
        },
        options: {
          topBar: {
            title: {
              text: 'Yeni tapşırıq',
            },
          },
        },
      },
    });
  }

  pushViewTask(task) {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'ViewTask',
        passProps: {
          task: task,
        },
        options: {
          topBar: {
            title: {
              text: 'Task View',
            },
          },
        },
      },
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <Text>Loading ...</Text>
        </View>
      );
    }
    return (
      <Container>
        <Content padder>
          {this.state.tasks.map((task, index) => {
            return (
              <Task
                data={task}
                key={index}
                onTaskView={() => this.pushViewTask(task)}
                onDelete={() => this._deleteTaskFromStorage(index)}
              />
            );
          })}
        </Content>
        <Fab
          containerStyle={{ flex: 1 }}
          style={{ backgroundColor: '#ffa700' }}
          position="bottomRight"
          onPress={this.pushViewTaskScreen}>
          <Icon name="plus" type="FontAwesome" />
        </Fab>
      </Container>
    );
  }
}

export default TaskList;
