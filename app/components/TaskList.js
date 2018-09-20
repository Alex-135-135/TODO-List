import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Picker, CheckBox, Button, AsyncStorage, ScrollView} from 'react-native';
import AddNewTask from './AddNewTask.js'
export default class TaskList extends Component{
  state={
    tasks: []
  }

  gettask = async () =>{
    let tasks = await AsyncStorage.getItem('task')
    const i = await this.props.navigation.getParam('Task');
      tasks = JSON.parse(tasks)
      this.setState({tasks})
      console.log(tasks)
  }
 componentWillMount(){
    this.gettask()
  }


  render() {
    return (
      <View>
      <ScrollView style={{width: '100%'}}>
        <View>
        <Button
              title="Go to AddNewTask"
              onPress={() => this.props.navigation.navigate('AddNewTask')}
            />
          {this.state.tasks.map((a, b) =>
            <View key={b} style={{width: '90%',  backgroundColor: 'red', left: '5%', borderBottomWidth: 2}}>
              <View>
                <Text>Task: {a.task}</Text>
              </View>
              <View>
              <Text >{a.date}</Text>
              </View>
              <Button
              title="Go to TaskView"
              onPress={() => this.props.navigation.navigate('TaskView', {
              key: b,
            })}
            />
            </View>
        )}
        </View>
            </ScrollView>
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
