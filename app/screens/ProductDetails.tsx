import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View, FlatList, TextInput, Alert, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { useProducts } from '../context/ProductContext';

type Product = {
  id: string;
  nombre: string;
  precio: number;
  currentStock: number;
  minStock: number;
  // Agrega otros campos que necesites aquí
};

export type Params = {
  product: Product;
};

export type Props = {
  route: RouteProp<RootStackParamList, 'ProductDetails'>;
  navigation: StackNavigationProp<RootStackParamList, 'ProductDetails'>;
};

function ProductDetails({ route, navigation }: Props): React.JSX.Element {
  const { products, setProducts, fetchProducts } = useProducts();
  const [stockToAdd, setStockToAdd] = useState<{ [key: string]: number }>({});
  const [stockToRemove, setStockToRemove] = useState<{ [key: string]: number }>({});

  const handleAddStock = async (productId: string) => {
    const amountToAdd = stockToAdd[productId];
    if (amountToAdd && amountToAdd > 0) {
      try {
        const response = await fetch(`https://empathyshop-proyectofinal-dmh-back.onrender.com/api/products/${productId}/addStock`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: amountToAdd }),
        });

        if (response.ok) {
          const updatedProducts = products.map(product => {
            if (product.id === productId) {
              return { ...product, currentStock: product.currentStock + amountToAdd };
            }
            return product;
          });
          setProducts(updatedProducts);
          fetchProducts(); // Refresca la lista de productos
          Alert.alert('Éxito', 'Stock agregado correctamente');
        } else {
          Alert.alert('Error', 'Hubo un problema al agregar el stock');
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Hubo un problema con el servidor');
      }
    } else {
      Alert.alert('Error', 'Ingresa una cantidad válida');
    }
  };

  const handleRemoveStock = async (productId: string) => {
    const amountToRemove = stockToRemove[productId];
    if (amountToRemove && amountToRemove > 0) {
      const product = products.find(p => p.id === productId);
      if (product) {
        if (amountToRemove > product.currentStock) {
          Alert.alert('Error', 'No se puede eliminar más stock del existente');
          return;
        }
        try {
          const response = await fetch(`https://empathyshop-proyectofinal-dmh-back.onrender.com/api/products/${productId}/removeStock`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: amountToRemove }),
          });

          if (response.ok) {
            const updatedProducts = products.map(product => {
              if (product.id === productId) {
                const newStock = product.currentStock - amountToRemove;
                if (newStock < product.minStock) {
                  Alert.alert('Advertencia', 'El stock actual es menor al mínimo permitido después de esta operación');
                }
                return { ...product, currentStock: newStock };
              }
              return product;
            });
            setProducts(updatedProducts);
            fetchProducts(); // Refresca la lista de productos
            Alert.alert('Éxito', 'Stock eliminado correctamente');
          } else {
            Alert.alert('Error', 'Hubo un problema al eliminar el stock');
          }
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'Hubo un problema con el servidor');
        }
      }
    } else {
      Alert.alert('Error', 'Ingresa una cantidad válida');
    }
  };

  const productItem = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
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
      <View style={styles.stockControls}>
        <TextInput
          style={styles.stockInput}
          keyboardType="numeric"
          placeholder="Cantidad"
          value={stockToAdd[item.id]?.toString() || ''}
          onChangeText={text => setStockToAdd({ ...stockToAdd, [item.id]: Number(text) })}
        />
        <Button title="Agregar Stock" onPress={() => handleAddStock(item.id)} />
        <TextInput
          style={styles.stockInput}
          keyboardType="numeric"
          placeholder="Cantidad"
          value={stockToRemove[item.id]?.toString() || ''}
          onChangeText={text => setStockToRemove({ ...stockToRemove, [item.id]: Number(text) })}
        />
        <Button title="Eliminar Stock" onPress={() => handleRemoveStock(item.id)} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={productItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7fade',
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
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
  stockControls: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  stockInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
    marginRight: 10,
    width: 80,
  },
});

export default ProductDetails;
