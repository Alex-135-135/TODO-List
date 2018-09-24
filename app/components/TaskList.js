import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Picker, CheckBox, Button, AsyncStorage, ScrollView} from 'react-native';
import AddNewTask from './AddNewTask.js'
export default class TaskList extends Component{
  state={
    tasks: [],
    flag: true,
  }

  gettask = async () =>{
    let tasks = await AsyncStorage.getItem('task')
    const i = await this.props.navigation.getParam('Task');
      tasks = JSON.parse(tasks)
      this.setState({tasks})
      console.log( tasks.filter(function(item){
   return item.checked == false;
}))
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
          {this.state.tasks.filter(function(item){return item.checked == false;}).map((a, b) =>
            <View key={b} style={{width: '90%',  backgroundColor: 'red', left: '5%', borderBottomWidth: 2}}>
              <View>
                <Text>Task: {a.task}</Text>
              </View>
              <View>
              <Text >{a.date}</Text>
              </View>
              <CheckBox
              title='Click Here'
              value={a.checked}
              onChange={() => this.setState({checked: !a.checked})}
              />
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
