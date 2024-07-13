
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
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: `./assets${item.image}` }} // Construye la URL completa de la imagen
        />
      </View>
      <ThemedText>{item.brand}</ThemedText>
      <ThemedText>{item.abv}</ThemedText>
    </TouchableOpacity >
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    >
      <ThemedView style={styles.container}>
        <ThemedText style={styles.container} type="subtitle">Hi Mr. Michael,</ThemedText>
        <ThemedText style={styles.container} type="title">Welcome back !</ThemedText>
        <ThemedText style={styles.container} type="default">Our Products</ThemedText>

        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </ThemedView>
    </ParallaxScrollView>


  );
};

const styles = StyleSheet.create({
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  container: {
    padding: 10
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default ProductListingScreen;
