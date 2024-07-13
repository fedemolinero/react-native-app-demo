
import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, Alert, StyleSheet, Button } from 'react-native';
import { Product } from '@/types';
import axios from 'axios';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import ParallaxScrollView from './ParallaxScrollView';
import LogoTitle from './LogoTitle';
import MenuIcon from './MenuIcon';
import { Image, View } from 'react-native';


const ProductListingScreen = ({ navigation }: any) => {

  // Initialize as empty array of Product type
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      title: 'Wellcome',
      // headerLeft: () => (),
      headerTitle: () => <MenuIcon />,
      headerRight: () => <LogoTitle />
    });
    fetchProducts();
  }, [navigation, setCount]);


  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch products');
    }
  };

  const navigateToProductDetails = (product: Product) => {
    navigation.navigate('ProductDetails', { product });
  };

  const renderProductItem = ({ item }: { item: Product }) => (

    <TouchableOpacity style={styles.productItem} onPress={() => navigateToProductDetails(item)}>
      <ThemedText style={styles.container}>{item.brand}</ThemedText>
      <Image
        style={styles.image}
        source={{ uri: `./assets${item.image}` }} // Construye la URL completa de la imagen
      />
      <ThemedText>{item.abv}</ThemedText>
    </TouchableOpacity >
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    >
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle">Hi Mr. Michael,</ThemedText>
        <ThemedText type="title">Welcome back !</ThemedText>
        <ThemedText type="default">Our Products</ThemedText>

        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.flatlistContent}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    color: '#1D3D47',
    backgroundColor: '#ffffff',

  },
  productItem: {
    flex: 1,
    margin: 5, // Espacio entre elementos
    alignItems: 'center', // Alinea elementos al centro horizontalmente
    backgroundColor: '#ffffff',
    width: '50%', // Cada elemento ocupa el 50% del ancho de su contenedor
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  flatlistContent: {
    alignItems: 'center', // Alinea los elementos al centro horizontalmente
  },
});

export default ProductListingScreen;
