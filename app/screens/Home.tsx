import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, BackHandler, Alert, Modal, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../App';

type HomeScreenProps = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRoute = RouteProp<RootStackParamList, 'Home'>;

type HomeProps = {
  navigation: HomeScreenProps;
  route: HomeScreenRoute;
};

function Home({ navigation }: HomeProps): React.JSX.Element {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigateTo = (screen: keyof RootStackParamList) => {
    setMenuVisible(false);
    navigation.navigate(screen as any);
  };

  const exitApp = () => {
    Alert.alert(
      "Salir",
      "¿Estás seguro de que quieres salir?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Salir",
          onPress: () => BackHandler.exitApp()
        }
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
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
            <Text style={styles.menuItem} onPress={exitApp}>Salir</Text>
          </View>
        </TouchableOpacity>
      </Modal>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Bienvenido</Text>
        <Text style={styles.welcomeText}>A</Text>
        <Text style={styles.appName}>EmpathyShop</Text>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2024 EmpathyShop. Todos los derechos reservados.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f7fade',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#005DFF',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  footer: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f7fade',
  },
  footerText: {
    fontSize: 12,
    color: '#333',
  },
});

export default Home;
