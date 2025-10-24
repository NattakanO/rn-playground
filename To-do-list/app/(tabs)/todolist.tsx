import { Image } from 'expo-image';
import {StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Crypto from 'expo-crypto';
import { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol} from '@/components/ui/icon-symbol';
import type { IconSymbolName } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { FlatList } from 'react-native-gesture-handler';
import Checkbox from 'expo-checkbox';
import { TouchableOpacity } from 'react-native';

type Task = {
  id: string;
  name: string;
  isDone: boolean;
  deadline?: string;        
  priority?: 'low' | 'medium' | 'high';
  icon?: string;        
};
const genId = () => Crypto.randomUUID();
export default function TodoList() {
const [taskName, setTaskName] = useState('');
const [tasks, setTasks] = useState<Task[]>([
  {
    id: genId(),
    name: 'Finish React Native project',
    isDone: false,
    deadline: '2025-10-25',
    priority: 'high',
    icon: 'text.book.closed.fill',
  },
  {
    id: genId(),
    name: 'Cooking',
    isDone: false,
    deadline: '2025-10-25',
    priority: 'low',
    icon: 'frying.pan.fill',
  },
  {
    id: genId(),
    name: 'Cleaning a bedroom',
    isDone: false,
    deadline: '2025-10-25',
    priority: 'high',
    icon: 'xmark.bin.fill',
  },
  {
    id: genId(),
    name: 'Finish SIT789 assignment',
    isDone: true,
    deadline: '2025-10-25',
    priority: 'high',
    icon: 'briefcase.fill',
  },
]);
// function addTask() {
//   if (taskName.trim() === '') return; // ignore empty input

//   const newTask = {
//     id: Crypto.randomUUID(),
//     name: taskName,
//     isDone: false,
//     priority: 'low',
//     icon: 'list.bullet',
//   };

//   setTasks((prev) => [...prev, newTask]);
//   setTaskName(''); // clear input
// }
function addTask() {
  setTasks(prev => [
    ...prev,
    {
      id: Crypto.randomUUID(),        
      name: taskName,
      isDone: false,
      priority: 'low',
      icon: 'list.bullet',
    },
  ]);
  setTaskName('');
  alert(taskName)
}

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Tasks
        </ThemedText>
      </ThemedView>
      <FlatList data={tasks} keyExtractor={(item)=> item.id.toString()} renderItem={({item})=> (
          <ThemedView style={styles.todoContainer}>
            <ThemedView style={styles.todoInfoContainer}>
              <IconSymbol size={28} name={(item.icon as IconSymbolName)} color={'black'}/>
              <ThemedText>{item.name}</ThemedText>
            </ThemedView>
             <Checkbox value={item.isDone}/>
            
          </ThemedView>
        )}
      />
      <ThemedView style={styles.addContainer}>
        <TextInput style={styles.addText} placeholder='Add a new task...' value={taskName} onChangeText={setTaskName}/>
        <TouchableOpacity onPress={addTask}>
          <IconSymbol size={28} name={'plus.app.fill'} color={'#1a9585ff'}/>
        </TouchableOpacity>
      </ThemedView>
    </SafeAreaView>)
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor:'#fff',
    flex: 1
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  todoInfoContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  addContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addText:{
    fontSize: 16,
    lineHeight: 24,
    width: '100%',
    color: '#ddd',
    alignItems: 'center'
  }
});

