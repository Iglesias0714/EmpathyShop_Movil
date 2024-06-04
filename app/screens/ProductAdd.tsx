import React, { useState } from 'react';
import { Button, SafeAreaView, Text, TextInput, StyleSheet, View, ScrollView } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

export default function ProductAdd(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [nombre, setNombre] = useState<string>('');
  const [precio, setPrecio] = useState<string>('0');
  const [minStock, setMinStock] = useState<string>('0');
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigateTo = (screen: keyof RootStackParamList) => {
    setMenuVisible(false);
    navigation.navigate(screen as any);
  };

  const btnGuardarOnPress = async () => {
    try {
      const response = await fetch('https://empathyshop-proyectofinal-dmh-back.onrender.com/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, precio: parseFloat(precio), minStock: parseInt(minStock, 10) }),
      });

      if (response.ok) {
        navigation.goBack();
      } else {
        console.error('Error al agregar el producto');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.menuContainer}>
          <Text style={styles.menuButton} onPress={toggleMenu}>Menú</Text>
          {menuVisible && (
            <View style={styles.menu}>
              <Text style={styles.menuItem} onPress={() => navigateTo('Home')}>Inicio</Text>
              <Text style={styles.menuItem} onPress={() => navigateTo('ProductAdd')}>Agregar Producto</Text>
              <Text style={styles.menuItem} onPress={() => navigateTo('AboutUs')}>¿Quiénes somos?</Text>
            </View>
          )}
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            onChangeText={t => setNombre(t)}
            value={nombre}
            placeholder="Ingrese el nombre del producto"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Precio</Text>
          <TextInput
            style={styles.input}
            onChangeText={t => setPrecio(t)}
            value={precio}
            placeholder="Ingrese el precio del producto"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Min. Stock</Text>
          <TextInput
            style={styles.input}
            onChangeText={t => setMinStock(t)}
            value={minStock}
            placeholder="Ingrese el stock mínimo"
            keyboardType="numeric"
          />
        </View>
        <Button title="Guardar" onPress={btnGuardarOnPress} color="#005DFF" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fade',
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 70, // Ajusta la posición del contenido para que no quede oculto detrás del header
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  menuContainer: {
    alignItems: 'flex-start',
  },
  menuButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#005DFF',
  },
  menu: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 8,
    color: '#005DFF',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
});

