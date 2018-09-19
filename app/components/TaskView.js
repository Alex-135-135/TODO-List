import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Picker, CheckBox, Button} from 'react-native';

export default class TaskView extends Component{
  render() {
    return (
      <View>
        <Text>Jane's profile</Text>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
