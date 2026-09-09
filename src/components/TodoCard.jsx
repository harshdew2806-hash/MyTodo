// components/ToDoCard.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Trash2 } from 'lucide-react-native';

const TodoCard = ({ todo, onDelete, onComplete }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  console.log('this is todo ', todo);
  return (
    <View style={[styles.card, todo.isCompleted && styles.completedCard]}>
      <View style={styles.header}>
        <Text style={[styles.title, todo.isCompleted && styles.completedText]}>
          {todo.title}
        </Text>
        <TouchableOpacity
          onPress={() => {
            onDelete(todo);
          }}
        >
          <Trash2 color="#ff4444" size={20} />
        </TouchableOpacity>
      </View>

      <Text
        style={[styles.description, todo.isCompleted && styles.completedText]}
      >
        {todo.description}
      </Text>

      <View style={styles.switchContainer}>
        <View>
          <Text style={styles.switchLabel}>Complete</Text>
          <Text style={{ fontSize: 10, fontWeight: 200, color: 'grey' }}>
            {todo.date.substring(0, 15)}
          </Text>
        </View>
        <Switch
          value={todo.isCompleted}
          onValueChange={() => {
            onComplete(todo);
          }}
          thumbColor={todo.isCompleted ? '#4CAF50' : '#f4f3f4'}
          trackColor={{ false: '#ccc', true: '#81C784' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    margin: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  completedCard: {
    backgroundColor: '#e8f5e9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    width: '90%',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  description: {
    marginTop: 8,
    fontSize: 14,
    color: '#555',
  },
  switchContainer: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchLabel: {
    fontSize: 14,
  },
});

export default TodoCard;