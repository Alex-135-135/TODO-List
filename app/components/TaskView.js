import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Picker, CheckBox, Button, AsyncStorage} from 'react-native';

export default class TaskView extends Component{
  state = {
    task: '',
    priority: 'LOW',
    checked: false,
    date: '',
    tasks: [{}],
    i: 0,
  }

  handleCreate = async () => {
    if(this.state.task == ''){
      alert('Заповніть поле Task')
    }else{
      alert('Task збережено')
      this.setState({tasks: this.state.tasks[this.state.i].task = this.state.task})
      this.setState({tasks: this.state.tasks[this.state.i].priority = this.state.priority})
      this.setState({tasks: this.state.tasks[this.state.i].checked = this.state.checked})
      this.setState({tasks: this.state.tasks[this.state.i].date = this.state.date})
      console.log(this.state.tasks[this.state.i])
      AsyncStorage.setItem('task', JSON.stringify(this.state.tasks))
    }
  }
  handleDelete = async () => {
    this.state.tasks.splice(this.state.i, 1);
    //this.setState({tasks:this.state.tasks.splice(this.state.i, 1) })
    AsyncStorage.setItem('task', JSON.stringify(this.state.tasks))
    this.props.navigation.navigate('TaskList', {lllll: this.state.tasks})
    alert('Task видалено')
  }

  gettask = async () =>{
    let tasks = await AsyncStorage.getItem('task')
    const i = await this.props.navigation.getParam('Task');
      tasks = JSON.parse(tasks)
      //tasks[1]
      this.setState(tasks[i])
      this.setState({i})
      this.setState({tasks})
      console.log(this.state)
  }

  componentDidMount(){
    this.gettask()
  }

  render() {
    return (
       <View style={styles.container}>
          <View>
            <TextInput 
              style={{width: 300}} 
              multiline={true} 
              value = {this.state.task}
              onChangeText={(text) =>this.setState({task: text})}
            />
            <View style={{flexDirection: 'row',}}>
              <Text style={{top: 15}}>Priority:</Text>
              <Picker
                selectedValue={this.state.priority}
                style={{ height: 50, width: 200,}}
                onValueChange={(itemValue, itemIndex) => this.setState({priority: itemValue})}>
                <Picker.Item label="LOW" value="LOW" />
                <Picker.Item label="MEDIUM" value="MEDIUM" />
                <Picker.Item label="CRITICAL" value="CRITICAL" />
              </Picker>
            </View>
             <View style={{flexDirection: 'row',}}>
              <Text style={{top: 5}}>Complite: </Text>
              <CheckBox
              title='Click Here'
              value={this.state.checked}
              onChange={() => this.setState({checked: !this.state.checked})}
              />
            </View>
          </View>
          <View style={{width: 200, top: 25, flexDirection: 'row',}}>
             <Button
                title="Save"
                onPress={this.handleCreate}
              />
              <Button
                title="Delete"
                onPress={this.handleDelete}
              />
          </View>
           <View style={{width: 200, top: 40}}>
            <Button
              title="Go to AddNewTask"
              onPress={() => this.props.navigation.navigate('TaskList', {lllll: this.state.tasks})}
            />
          </View>
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
