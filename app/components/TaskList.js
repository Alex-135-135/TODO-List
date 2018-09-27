import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Picker, CheckBox, Button, AsyncStorage, ScrollView, TouchableOpacity} from 'react-native';
import AddNewTask from './AddNewTask.js'
export default class TaskList extends Component{
  state={
    tasks: [],
  }

  gettask = async () =>{
    let tasks = await AsyncStorage.getItem('task')
    //const i = await this.props.navigation.getParam('Task');
      tasks = JSON.parse(tasks)
      this.setState({tasks})
      console.log(tasks)
  }
checked = (a, b) => {
console.log(a, b)
let tasks = this.state.tasks
let l = tasks.length
for (let i=0; i<l; i++){
  console.log(tasks[i].date, a)
  if(tasks[i].date == a){
    tasks[i].checked = !tasks[i].checked
  }
}
  this.setState({tasks})
  AsyncStorage.setItem('task', JSON.stringify(this.state.tasks))
}
componentDidMount(){
  this.gettask()
}
componentWillReceiveProps(){
  console.log('fsfs')
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
          {this.state.tasks.filter(function(item){return item.checked == false;})
          .sort((a2,b2) => {return a2.date > b2.date ? -1 : a2.date < b2.date ? 1 : 0})
          .sort((a1,b1) => {return a1.priority.length - b1.priority.length})
          .map((a, b) => 
            <View key={b} style={{width: '90%', height: 60, left: '4%', borderBottomWidth: 2, flexDirection: 'row',}}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('TaskView', { Task: a.date, })} style={{width: '73%',justifyContent: 'center'}}>
                <View key={b}>
                  <View>
                    <Text>Task: {a.task}</Text>
                  </View>
                  <View>
                  <Text >{a.date}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Button
                  title="Complite"
                  onPress={() => this.checked(a.date)}
                />
              </View>
            </View>
        )}
        </View>
        <View style={{width: '100%', height: 50}}></View>
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
