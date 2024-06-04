import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity, Image, BackHandler, Alert } from 'react-native';
import { Product } from '../model/Product';
import { RootStackParamList } from '../../App';
import LocalDB from '../persistance/localdb';
import WebServiceParams from '../WebServiceParams';

type HomeScreenProps = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRoute = RouteProp<RootStackParamList, 'Home'>;

type HomeProps = {
  navigation: HomeScreenProps;
  route: HomeScreenRoute;
};

function Home({ navigation }: HomeProps): React.JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
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

  const productItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.push('ProductDetails', { product: item })}
    >
      <View style={styles.productInfo}>
        <Text style={styles.itemTitle}>{item.nombre}</Text>
        <Text style={styles.itemDetails}>Precio: $ {item.precio.toFixed(2)}</Text>
        <Text style={[
          styles.itemBadge,
          item.currentStock < item.minStock ? styles.itemBadgeError : null,
        ]}>
          {item.currentStock} en stock
        </Text>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    LocalDB.init();
    navigation.addListener('focus', async () => {
      try {
        const response = await fetch(
          `http://${WebServiceParams.host}:${WebServiceParams.port}/productos`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'text/plain',
            },
          }
        );
        setProducts(await response.json());
      } catch (error) {
        console.error(error);
      }
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.menuContainer}>
          <Text style={styles.menuButton} onPress={toggleMenu}>Menú</Text>
          {menuVisible && (
            <View style={styles.menu}>
              <Text style={styles.menuItem} onPress={() => navigateTo('Home')}>Inicio</Text>
              <Text style={styles.menuItem} onPress={() => navigateTo('ProductAdd')}>Agregar Producto</Text>
              <Text style={styles.menuItem} onPress={() => navigateTo('AboutUs')}>¿Quiénes somos?</Text>
              <Text style={styles.menuItem} onPress={exitApp}>Salir</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Bienvenido</Text>
        <Text style={styles.welcomeText}>A</Text>
        <Text style={styles.appName}>EmpathyShop</Text>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <FlatList
        data={products}
        renderItem={productItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
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
  listContainer: {
    paddingHorizontal: 16,
  },
  productItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomColor: '#c0c0c0',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    marginVertical: 4,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  itemDetails: {
    fontSize: 16,
    opacity: 0.8,
  },
  itemBadge: {
    fontSize: 14,
    color: '#204080',
    fontWeight: 'bold',
    marginTop: 4,
  },
  itemBadgeError: {
    color: 'red',
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
