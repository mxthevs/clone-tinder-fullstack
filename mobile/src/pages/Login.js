import React, { useState, useEffect } from 'react';
import { 
    Platform, 
    KeyboardAvoidingView, 
    Text, 
    Image, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet 
  } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import logo from '../assets/logo.png';

export default function Login({ navigation }) {
  const [user, setUser] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if(user) {
        navigation.navigate('Main', { user });
      }
    });
  }, []);

  async function handleLogin() {
    const response = await api.post('/devs', {
      username: user,
    });

    const { _id } = response.data;

    await AsyncStorage.setItem('user', _id);

    navigation.navigate('Main', { user: _id });
  }

  return (
    <KeyboardAvoidingView 
      behavior="padding"
      enabled={Platform.OS === 'ios'}
      style={styles.container}
    >
      <Image source={logo} />
      <TextInput 
        placeholder="Digite seu usuário do Github" 
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
        value={user}
        onChangeText={setUser}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
    paddingHorizontal: 15,
    marginTop: 15,
  },
  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#DF4723',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
