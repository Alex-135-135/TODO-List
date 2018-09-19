import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Picker, CheckBox, Button} from 'react-native';
import { StackNavigator } from 'react-navigation';

import AddNewTask from './components/AddNewTask.js'
import TaskList from './components/TaskList.js'
import TaskView from './components/TaskView.js'

const RootStack = StackNavigator(
  {
    AddNewTask: {
      screen: AddNewTask,
    },
    TaskList: {
      screen: TaskList,
    },
    TaskView: {
      screen: TaskView,
    },
  },{
    headerMode: 'none'
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

