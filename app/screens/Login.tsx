import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: '#f7fade',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff80',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  textInput: {
    borderBottomWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: '80%',
    margin: 10,
    borderColor: '#ccc',
  },
  button: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#005DFF',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  QuienesSomos: undefined; 
};
type LoginProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

function Login({ navigation }: LoginProps): React.JSX.Element {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const btnIngresarOnPress = async function () {
    if (usuario && contrasena) {
      try {
        const response = await fetch('https://empathyshop-proyectofinal-dmh-back.onrender.com/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: usuario, password: contrasena }),
        });

        if (response.ok) {
          const data = await response.json();
          // Puedes guardar el token o cualquier dato necesario aquí
          navigation.navigate('Home');
        } else {
          const errorData = await response.json();
          Alert.alert('Fallido', errorData.message);
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Hubo un problema con el servidor');
      }
    } else {
      Alert.alert('Fallido', 'Datos incorrectos');
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>EmpathyShop</Text>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <TextInput
          style={styles.textInput}
          placeholder="Usuario"
          placeholderTextColor="#828894"
          onChangeText={u => setUsuario(u)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Contraseña"
          placeholderTextColor="#828894"
          secureTextEntry={true}
          onChangeText={p => setContrasena(p)}
        />
        <TouchableOpacity style={styles.button} onPress={btnIngresarOnPress}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Login;
