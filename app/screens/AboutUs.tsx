import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

export default function AboutUs(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigateTo = (screen: keyof RootStackParamList) => {
    setMenuVisible(false);
    navigation.navigate(screen as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.menuContainer}>
          <Text style={styles.menuButton} onPress={toggleMenu}>Menú</Text>
        </View>
      </View>
      <Modal
        transparent={true}
        visible={menuVisible}
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.menuItem} onPress={() => navigateTo('Home')}>Inicio</Text>
            <Text style={styles.menuItem} onPress={() => navigateTo('ProductAdd')}>Agregar Producto</Text>
            <Text style={styles.menuItem} onPress={() => navigateTo('ProductDetails')}>Detalles del Producto</Text>
            <Text style={styles.menuItem} onPress={() => navigateTo('AboutUs')}>¿Quiénes somos?</Text>
            <Text style={styles.menuItem} onPress={() => navigation.goBack()}>Volver</Text>
          </View>
        </TouchableOpacity>
      </Modal>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.headerText}>EmpathyShop</Text>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>¿Quiénes somos?</Text>
        <Image source={require('../assets/quienes.png')} style={styles.image} />
        <Text style={styles.text}>
          Bienvenidos a EmpathyShop. Somos una empresa dedicada a ofrecer productos de alta calidad para mejorar tu vida diaria, ya sean productos tantos ayuda de movilidad, auditiva, entre otras. Nos comprometemos a brindar el mejor servicio a nuestros clientes.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fade',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
    paddingTop: 80, // Ajuste para mostrar el menú desplegable desde la parte superior
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    elevation: 5,
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 8,
    color: '#005DFF',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#005DFF',
    marginTop: 80, // Ajuste para que no quede detrás del header
  },
  logo: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
  },
});
