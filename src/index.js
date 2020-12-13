import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';


import api from './services/api';
export default function App() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            console.log(response.data);
            setProjects(response.data);
        });
    }, []);

   async function handleAddProject() {
        const response = await api.post('projects', {
            title: `Novo Projeto ${Date.now()}`,
            owner: 'Guilherme Souza'
        });
        const project = response.data;

        setProjects([...projects, project]);
    }
  return (
      <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
      <FlatList 
      data={projects}
      keyExtractor={project => project.id}
      renderItem={({ item: project }) => (
        <Text style={styles.projects} >{project.title}</Text>
      )}
      />
      <TouchableOpacity 
      activeOpacity={0.6} 
      style={styles.button} 
      onPress={handleAddProject}
      >
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
      </TouchableOpacity>
      </SafeAreaView>
      </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },
  projects: {
    color: "#FFFFFF",
    fontSize: 30,
  },
  button: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
      fontWeight: 'bold',
      fontSize: 16,
  },
});
