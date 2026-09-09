import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Captions, Save } from 'lucide-react-native';
import TodoCard from './src/components/TodoCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);

  const saveTodo = async () => {
    console.log('save todo', { title, description });
    if (title.length > 0 && description.length > 0) {
      console.log('saved called');

      const todo = {
        id: Date.now(),
        title: title,
        description: description,
        date: Date(),
        isCompleted: false,
      };
      const temp = [...todos];
      temp.push(todo);
      await AsyncStorage.setItem('todos', JSON.stringify(temp));
      setTodos(temp);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const stringTodos = await AsyncStorage.getItem('todos');
      const localTodos = JSON.parse(stringTodos) || [];
      setTodos(localTodos);
    };
    fetchTodos();
  }, []);
  return (
    <View>
      <Text
        style={{
          fontSize: 25,
          fontWeight: '600',
          textAlign: 'center',
          paddingVertical: 10,
          borderBottomWidth: 0.6,
          borderColor: 'grey',
        }}
      >
        MyTodo App
      </Text>
      <View style={{ margin: 20, gap: 10 }}>
        {/* Title input */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            paddingVertical: 3,
            paddingHorizontal: 6,
            borderWidth: 0.5,
            borderColor: 'grey',
            borderRadius: 10,
          }}
        >
          <Captions size={25} />
          <TextInput
            onChangeText={text => setTitle(text)}
            placeholder="Enter Title"
          />
        </View>
        {/* Description input */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            paddingVertical: 3,
            paddingHorizontal: 6,
            borderWidth: 0.5,
            borderColor: 'grey',
            borderRadius: 10,
          }}
        >
          <Captions size={25} />
          <TextInput
            onChangeText={text => setDescription(text)}
            placeholder="Enter Description"
          />
        </View>
        {/* Save Button */}
        <TouchableOpacity
          onPress={saveTodo}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 5,
            alignItems: 'center',
            padding: 10,
            backgroundColor: '#42f563',
            elevation: 10,
            borderRadius: 10,
          }}
        >
          <Save size={22} />
          <Text style={{ fontWeight: 'bold' }}>Save</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ gap: 10, paddingBottom: 400 }}>
        {todos.map(todo => {
          return (
            <TodoCard
              key={todo.id}
              todo={todo}
              onComplete={async value => {
                console.log('onComplete-> ', value);
                const tempTodos = [...todos];
                const index = tempTodos.findIndex(tempTodo => {
                  return value.id == tempTodo.id;
                });
                tempTodos[index].isCompleted = !tempTodos[index].isCompleted;
                await AsyncStorage.setItem('todos', JSON.stringify(tempTodos));
                setTodos(tempTodos);
              }}
              onDelete={value => {
                console.log('delete called', value);
                Alert.alert(
                  'Do you want to delete',
                  value.title,
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'OK',
                      onPress: async () => {
                        const tempTodos = [...todos];
                        const index = tempTodos.findIndex(tempTodo => {
                          return value.id == tempTodo.id;
                        });
                        tempTodos.splice(index, 1);
                        await AsyncStorage.setItem(
                          'todos',
                          JSON.stringify(tempTodos),
                        );
                        setTodos(tempTodos);
                      },
                    },
                  ],
                  { cancelable: false },
                );
              }}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});