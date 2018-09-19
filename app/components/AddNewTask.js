import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Picker, CheckBox, Button, StackNavigator, AsyncStorage} from 'react-native';
import DatePicker from 'react-native-datepicker'
import { Navigation } from 'react-native-navigation';

export default class AddNewTask extends Component{

  state={
    task: '',
    priority: 'LOW',
    checked: false,
    date: new Date()
  }

  handleCreate = async () => {
    if(this.state.task == ''){
      alert('Заповніть поле Task')
    }else{
      alert('Task додано')
      let tasks = await AsyncStorage.getItem('task')
      tasks = JSON.parse(tasks)
      let data = tasks ? tasks : [];
      console.log(data)
      data.push(this.state);
      AsyncStorage.setItem('task', JSON.stringify(data))
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <View>
            <TextInput 
              style={{width: 300}} 
              placeholder={'Task'} 
              multiline={true} 
              onChangeText={(text) => this.state.task = text}
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
          </View>
          <View style={{width: 200, top: 25}}>
             <Button
                title="Add New Task"
                onPress={this.handleCreate}
              />
          </View>
          <View style={{width: 200, top: 40}}>
            <Button
              title="Go to AddNewTask"
              onPress={() => this.props.navigation.navigate('TaskList')}
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
