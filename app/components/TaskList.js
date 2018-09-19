import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Picker, CheckBox, Button, AsyncStorage, ScrollView} from 'react-native';
import AddNewTask from './AddNewTask.js'
export default class TaskList extends Component{
  state={
    tasks: []
  }

  gettask = async () =>{
    let tasks = await AsyncStorage.getItem('task')
      tasks = JSON.parse(tasks)
      this.setState({tasks})
      console.log(tasks)
  }

  componentDidMount(){
    console.log('mount')
     this.gettask()
  }

  render() {
    return (
      <View>
      <ScrollView style={{width: '100%'}}>
        <View>
          {this.state.tasks.map((a, b) =>
            <View key={b}>
              <View  style={{width: 300,  backgroundColor: '#e8f1fa',}}>
                <Text>{a.task}</Text>
              </View>
              <View>
              <Picker
                  selectedValue={a.priority}
                  style={{ height: 50, width: 200,}}
                  onValueChange={p => a.priority=p}>
                  <Picker.Item label="LOW" value="LOW" />
                  <Picker.Item label="MEDIUM" value="MEDIUM" />
                  <Picker.Item label="CRITICAL" value="CRITICAL" />
              </Picker>
              <Text >{a.date}</Text>
              </View>
            </View>
        )}
          
            <Button
              title="Go to AddNewTask"
              onPress={() => this.props.navigation.navigate('AddNewTask', {
              Task: this.state,
            })}
            />
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
